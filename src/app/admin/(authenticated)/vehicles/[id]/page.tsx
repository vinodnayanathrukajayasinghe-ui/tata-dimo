import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = { title: "Vehicle | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function AdminVehicleEditPage({ params }: { params: { id: string } }) {
  const categories = await getCategories();

  if (params.id === "new") {
    return (
      <div className="max-w-3xl space-y-5">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Add Vehicle</h1>
        <VehicleForm categories={categories} />
      </div>
    );
  }

  const supabase = createClient();
  const { data: vehicle } = await supabase.from("vehicles").select("*").eq("id", params.id).maybeSingle();
  if (!vehicle) notFound();

  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Edit Vehicle</h1>
      <VehicleForm vehicle={vehicle} categories={categories} />
    </div>
  );
}
