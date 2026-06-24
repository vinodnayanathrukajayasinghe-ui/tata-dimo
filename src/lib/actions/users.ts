"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminAuthClient } from "@/lib/supabase/admin-auth";

const createAdminSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().optional(),
});

export async function createAdminUser(input: { email: string; password: string; fullName?: string }) {
  const parsed = createAdminSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const adminAuth = createAdminAuthClient();
  const { error } = await adminAuth.auth.admin.createUser({
    email: parsed.data.email,
    password: parsed.data.password,
    email_confirm: true,
    app_metadata: { role: "admin" },
    user_metadata: { full_name: parsed.data.fullName || null },
  });
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteAdminUser(id: string) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user.id === id) return { success: false, error: "You cannot remove your own account." };

  const adminAuth = createAdminAuthClient();

  // This Supabase project also hosts an unrelated app's users — refuse to
  // delete anyone not explicitly tagged as an LCM admin, even if this action
  // were ever invoked with an id outside the (already-filtered) Users page.
  const { data: target } = await adminAuth.auth.admin.getUserById(id);
  if (target.user?.app_metadata?.role !== "admin") {
    return { success: false, error: "This user is not managed by the LCM admin panel." };
  }

  const { error } = await adminAuth.auth.admin.deleteUser(id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/users");
  return { success: true };
}
