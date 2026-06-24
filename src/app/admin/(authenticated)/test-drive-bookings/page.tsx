import type { Metadata } from "next";
import { FilterBar } from "@/components/admin/FilterBar";
import { BookingStatusSelect } from "@/components/admin/BookingStatusSelect";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { getBranches } from "@/lib/data";
import type { BookingStatus } from "@/lib/database.types";

export const metadata: Metadata = { title: "Test Drive Bookings | LCM Admin" };
export const dynamic = "force-dynamic";

interface SearchParams {
  [key: string]: string | undefined;
  q?: string;
  status?: string;
  branch?: string;
}

export default async function TestDriveBookingsPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createClient();
  const branches = await getBranches();

  let query = supabase
    .from("test_drive_bookings")
    .select("*, vehicles(name), branches(name)")
    .order("created_at", { ascending: false });

  if (searchParams.status) query = query.eq("status", searchParams.status as BookingStatus);
  if (searchParams.branch) query = query.eq("branch_id", searchParams.branch);
  if (searchParams.q) {
    const q = searchParams.q.replace(/[,()%]/g, "");
    query = query.or(
      `first_name.ilike.%${q}%,last_name.ilike.%${q}%,reference.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`
    );
  }

  const { data: bookings } = await query;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Test Drive Bookings</h1>
        <p className="text-sm text-charcoal/60">{bookings?.length ?? 0} booking(s)</p>
      </div>

      <FilterBar searchParams={searchParams} branches={branches} showBranch />

      <Table>
        <THead>
          <TR>
            <TH>Reference</TH>
            <TH>Customer</TH>
            <TH>Company</TH>
            <TH>Vehicle</TH>
            <TH>Preferred Date</TH>
            <TH>Branch</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          {(bookings ?? []).map((b) => (
            <TR key={b.id}>
              <TD className="font-semibold text-primary">{b.reference}</TD>
              <TD>{b.first_name} {b.last_name}<br /><span className="text-xs text-charcoal/50">{b.phone}</span></TD>
              <TD>{b.company || "—"}</TD>
              <TD>{(b as unknown as { vehicles: { name: string } | null }).vehicles?.name ?? "—"}</TD>
              <TD>{b.preferred_date || "—"}</TD>
              <TD>{(b as unknown as { branches: { name: string } | null }).branches?.name ?? "—"}</TD>
              <TD><BookingStatusSelect table="test_drive_bookings" id={b.id} status={b.status} /></TD>
            </TR>
          ))}
          {(bookings ?? []).length === 0 && (
            <TR><TD colSpan={7} className="py-8 text-center text-charcoal/50">No test drive bookings found.</TD></TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
