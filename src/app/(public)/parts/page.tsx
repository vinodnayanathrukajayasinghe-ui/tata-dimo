import type { Metadata } from "next";
import { PartsEnquiryForm } from "@/components/forms/PartsEnquiryForm";
import { getVehicles } from "@/lib/data";

export const metadata: Metadata = { title: "Genuine Parts | Lanka Commercial Motors" };

export default async function PartsPage() {
  const vehicles = await getVehicles();

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Genuine Parts</h1>
      <p className="mt-2 text-charcoal/60">
        Enquire about genuine TATA spare parts for your vehicle. Our parts team will confirm availability and pricing.
      </p>

      <div className="mt-10">
        <PartsEnquiryForm vehicles={vehicles} />
      </div>
    </div>
  );
}
