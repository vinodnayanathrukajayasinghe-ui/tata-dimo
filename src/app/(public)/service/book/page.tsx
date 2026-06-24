import type { Metadata } from "next";
import { ServiceBookingForm } from "@/components/forms/ServiceBookingForm";
import { getBranches, getVehicles } from "@/lib/data";

export const metadata: Metadata = { title: "Book a Service | Lanka Commercial Motors" };

export default async function ServiceBookingPage() {
  const [vehicles, branches] = await Promise.all([getVehicles(), getBranches()]);

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Book a Service</h1>
      <p className="mt-2 text-charcoal/60">
        Schedule periodic maintenance, repairs or fleet servicing at any of our island-wide centres.
      </p>

      <div className="mt-10">
        <ServiceBookingForm vehicles={vehicles} branches={branches} />
      </div>
    </div>
  );
}
