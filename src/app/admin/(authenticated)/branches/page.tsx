import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { deleteBranch } from "@/lib/actions/branches";

export const metadata: Metadata = { title: "Branches | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function AdminBranchesPage() {
  const supabase = createClient();
  const { data: branches } = await supabase.from("branches").select("*").order("name");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Branches</h1>
          <p className="text-sm text-charcoal/60">{branches?.length ?? 0} branch(es)</p>
        </div>
        <Link href="/admin/branches/new">
          <Button><Plus className="h-4 w-4" /> Add Branch</Button>
        </Link>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>District</TH>
            <TH>Phone</TH>
            <TH>Status</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          {(branches ?? []).map((b) => (
            <TR key={b.id}>
              <TD className="font-semibold text-charcoal">{b.name}</TD>
              <TD>{b.district || "—"}</TD>
              <TD>{b.phone || "—"}</TD>
              <TD>
                <Badge className={b.is_active ? "bg-green-100 text-green-700" : "bg-charcoal/10 text-charcoal/60"}>
                  {b.is_active ? "Active" : "Inactive"}
                </Badge>
              </TD>
              <TD>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/branches/${b.id}`} className="rounded-md p-1.5 text-primary hover:bg-primary/10">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteButton action={deleteBranch.bind(null, b.id)} confirmMessage={`Delete "${b.name}"? This cannot be undone.`} />
                </div>
              </TD>
            </TR>
          ))}
          {(branches ?? []).length === 0 && (
            <TR><TD colSpan={5} className="py-8 text-center text-charcoal/50">No branches yet.</TD></TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
