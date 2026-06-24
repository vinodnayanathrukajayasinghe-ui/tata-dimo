"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { vehicleFormSchema, type VehicleFormInput } from "@/lib/validation-admin";

export async function saveVehicle(id: string | null, input: VehicleFormInput) {
  const parsed = vehicleFormSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const v = parsed.data;

  const supabase = createClient();
  const priceFrom = v.priceFrom ? Number(v.priceFrom) : null;
  const sortOrder = v.sortOrder ? Number(v.sortOrder) : 0;
  const payload = {
    category_id: v.categoryId,
    slug: v.slug,
    name: v.name,
    tagline: v.tagline || null,
    hero_image: v.heroImage || null,
    gallery: v.gallery ?? [],
    price_from: Number.isFinite(priceFrom) ? priceFrom : null,
    specs: v.specs ?? {},
    brochure_url: v.brochureUrl || null,
    is_active: v.isActive ?? true,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  };

  const { error } = id
    ? await supabase.from("vehicles").update(payload).eq("id", id)
    : await supabase.from("vehicles").insert(payload);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  redirect("/admin/vehicles");
}

export async function deleteVehicle(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  return { success: true };
}
