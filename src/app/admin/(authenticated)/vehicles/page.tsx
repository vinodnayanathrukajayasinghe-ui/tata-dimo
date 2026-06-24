import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { deleteVehicle } from "@/lib/actions/vehicles";
import { formatLKR } from "@/lib/utils";

export const metadata: Metadata = { title: "Vehicles | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const supabase = createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*, vehicle_categories(name_en)")
    .order("sort_order");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Vehicles</h1>
          <p className="text-sm text-charcoal/60">{vehicles?.length ?? 0} vehicle(s)</p>
        </div>
        <Link href="/admin/vehicles/new">
          <Button><Plus className="h-4 w-4" /> Add Vehicle</Button>
        </Link>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Category</TH>
            <TH>Price From</TH>
            <TH>Status</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          {(vehicles ?? []).map((v) => (
            <TR key={v.id}>
              <TD className="font-semibold text-charcoal">{v.name}</TD>
              <TD>{(v as unknown as { vehicle_categories: { name_en: string } | null }).vehicle_categories?.name_en ?? "—"}</TD>
              <TD>{formatLKR(v.price_from)}</TD>
              <TD>
                <Badge className={v.is_active ? "bg-green-100 text-green-700" : "bg-charcoal/10 text-charcoal/60"}>
                  {v.is_active ? "Active" : "Inactive"}
                </Badge>
              </TD>
              <TD>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/vehicles/${v.id}`} className="rounded-md p-1.5 text-primary hover:bg-primary/10">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteButton action={deleteVehicle.bind(null, v.id)} confirmMessage={`Delete "${v.name}"? This cannot be undone.`} />
                </div>
              </TD>
            </TR>
          ))}
          {(vehicles ?? []).length === 0 && (
            <TR><TD colSpan={5} className="py-8 text-center text-charcoal/50">No vehicles yet.</TD></TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
