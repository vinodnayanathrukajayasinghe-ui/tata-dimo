import type { Metadata } from "next";
import { TestDriveForm } from "@/components/forms/TestDriveForm";
import { getBranches, getVehicleBySlug, getVehicles } from "@/lib/data";

export const metadata: Metadata = { title: "Book a Test Drive | Lanka Commercial Motors" };

export default async function TestDrivePage({ searchParams }: { searchParams: { vehicle?: string } }) {
  const [vehicles, branches, preselected] = await Promise.all([
    getVehicles(),
    getBranches(),
    searchParams.vehicle ? getVehicleBySlug(searchParams.vehicle) : Promise.resolve(null),
  ]);

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Book a Test Drive</h1>
      <p className="mt-2 text-charcoal/60">
        Experience a TATA commercial vehicle for yourself — at your nearest branch.
      </p>

      <div className="mt-10">
        <TestDriveForm vehicles={vehicles} branches={branches} defaultVehicleId={preselected?.id} />
      </div>
    </div>
  );
}
