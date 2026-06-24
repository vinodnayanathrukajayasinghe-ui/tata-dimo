import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BranchForm } from "@/components/admin/BranchForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Branch | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function AdminBranchEditPage({ params }: { params: { id: string } }) {
  if (params.id === "new") {
    return (
      <div className="space-y-5">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Add Branch</h1>
        <BranchForm />
      </div>
    );
  }

  const supabase = createClient();
  const { data: branch } = await supabase.from("branches").select("*").eq("id", params.id).maybeSingle();
  if (!branch) notFound();

  return (
    <div className="space-y-5">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Edit Branch</h1>
      <BranchForm branch={branch} />
    </div>
  );
}
