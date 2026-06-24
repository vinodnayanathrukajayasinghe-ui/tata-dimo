import type { Metadata } from "next";
import { FilterBar } from "@/components/admin/FilterBar";
import { BookingStatusSelect } from "@/components/admin/BookingStatusSelect";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/database.types";

export const metadata: Metadata = { title: "General Enquiries | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function GeneralEnquiriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined; q?: string; status?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("general_enquiries")
    .select("*, vehicles(name)")
    .order("created_at", { ascending: false });

  if (searchParams.status) query = query.eq("status", searchParams.status as BookingStatus);
  if (searchParams.q) {
    const q = searchParams.q.replace(/[,()%]/g, "");
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%,source_page.ilike.%${q}%`);
  }

  const { data: enquiries } = await query;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">General Enquiries</h1>
        <p className="text-sm text-charcoal/60">{enquiries?.length ?? 0} enquiry(s)</p>
      </div>

      <FilterBar searchParams={searchParams} />

      <Table>
        <THead>
          <TR>
            <TH>Customer</TH>
            <TH>Company</TH>
            <TH>Source</TH>
            <TH>Vehicle</TH>
            <TH>Message</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          {(enquiries ?? []).map((e) => (
            <TR key={e.id}>
              <TD>{e.name}<br /><span className="text-xs text-charcoal/50">{e.email}{e.phone ? ` · ${e.phone}` : ""}</span></TD>
              <TD>{e.company || "—"}</TD>
              <TD>{e.source_page || "—"}</TD>
              <TD>{(e as unknown as { vehicles: { name: string } | null }).vehicles?.name ?? "—"}</TD>
              <TD className="max-w-xs truncate">{e.message || "—"}</TD>
              <TD><BookingStatusSelect table="general_enquiries" id={e.id} status={e.status} /></TD>
            </TR>
          ))}
          {(enquiries ?? []).length === 0 && (
            <TR><TD colSpan={6} className="py-8 text-center text-charcoal/50">No general enquiries found.</TD></TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
