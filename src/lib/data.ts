import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Branch, Vehicle, VehicleCategory, VehicleVariant } from "@/lib/database.types";

export async function getCategories(): Promise<VehicleCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("vehicle_categories").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<VehicleCategory | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("vehicle_categories").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const vehicles = await getVehicles();
  return vehicles.slice(0, limit);
}

export async function getVehiclesByCategorySlug(categorySlug: string): Promise<Vehicle[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("vehicles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getVehicleVariants(vehicleId: string): Promise<VehicleVariant[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("vehicle_variants").select("*").eq("vehicle_id", vehicleId);
  if (error) throw error;
  return data ?? [];
}

export async function getBranches(): Promise<Branch[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("branches").select("*").eq("is_active", true).order("name");
  if (error) throw error;
  return data ?? [];
}
