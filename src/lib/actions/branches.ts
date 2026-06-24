"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { branchFormSchema, type BranchFormInput } from "@/lib/validation-admin";

export async function saveBranch(id: string | null, input: BranchFormInput) {
  const parsed = branchFormSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const v = parsed.data;

  const supabase = createClient();
  const lat = v.lat ? Number(v.lat) : null;
  const lng = v.lng ? Number(v.lng) : null;
  const payload = {
    name: v.name,
    address: v.address,
    district: v.district || null,
    phone: v.phone || null,
    email: v.email || null,
    lat: Number.isFinite(lat) ? lat : null,
    lng: Number.isFinite(lng) ? lng : null,
    hours: v.hours || null,
    is_active: v.isActive ?? true,
  };

  const { error } = id
    ? await supabase.from("branches").update(payload).eq("id", id)
    : await supabase.from("branches").insert(payload);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/branches");
  revalidatePath("/locate-us");
  redirect("/admin/branches");
}

export async function deleteBranch(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/branches");
  revalidatePath("/locate-us");
  return { success: true };
}
