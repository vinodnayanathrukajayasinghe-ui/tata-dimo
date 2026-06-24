import type { Metadata } from "next";
import { FilterBar } from "@/components/admin/FilterBar";
import { BookingStatusSelect } from "@/components/admin/BookingStatusSelect";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/database.types";

export const metadata: Metadata = { title: "Parts Enquiries | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function PartsEnquiriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined; q?: string; status?: string };
}) {
  const supabase = createClient();
  let query = supabase.from("parts_enquiries").select("*").order("created_at", { ascending: false });

  if (searchParams.status) query = query.eq("status", searchParams.status as BookingStatus);
  if (searchParams.q) {
    const q = searchParams.q.replace(/[,()%]/g, "");
    query = query.or(
      `name.ilike.%${q}%,reference.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%,part_name.ilike.%${q}%,part_number.ilike.%${q}%`
    );
  }

  const { data: enquiries } = await query;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Parts Enquiries</h1>
        <p className="text-sm text-charcoal/60">{enquiries?.length ?? 0} enquiry(s)</p>
      </div>

      <FilterBar searchParams={searchParams} />

      <Table>
        <THead>
          <TR>
            <TH>Reference</TH>
            <TH>Customer</TH>
            <TH>Company</TH>
            <TH>Vehicle Model</TH>
            <TH>Part</TH>
            <TH>Qty</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          {(enquiries ?? []).map((e) => (
            <TR key={e.id}>
              <TD className="font-semibold text-primary">{e.reference}</TD>
              <TD>{e.name}<br /><span className="text-xs text-charcoal/50">{e.phone}</span></TD>
              <TD>{e.company || "—"}</TD>
              <TD>{e.vehicle_model || "—"}</TD>
              <TD>{e.part_name || "—"} {e.part_number ? `(${e.part_number})` : ""}</TD>
              <TD>{e.quantity ?? "—"}</TD>
              <TD><BookingStatusSelect table="parts_enquiries" id={e.id} status={e.status} /></TD>
            </TR>
          ))}
          {(enquiries ?? []).length === 0 && (
            <TR><TD colSpan={7} className="py-8 text-center text-charcoal/50">No parts enquiries found.</TD></TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
