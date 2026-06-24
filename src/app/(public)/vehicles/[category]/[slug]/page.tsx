import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/vehicles/Gallery";
import { VehicleEnquiryForm } from "@/components/vehicles/VehicleEnquiryForm";
import { getCategoryBySlug, getVehicleBySlug, getVehicleVariants } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { whatsappLink } from "@/lib/site-config";

const SPEC_LABELS: Record<string, string> = {
  gvw: "GVW",
  engine: "Engine",
  power: "Power",
  torque: "Torque",
  payload: "Payload",
  fuel_type: "Fuel Type",
  transmission: "Transmission",
  wheelbase: "Wheelbase",
  fuel_tank: "Fuel Tank Capacity",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);
  return { title: vehicle ? `${vehicle.name} | Lanka Commercial Motors` : "Vehicle | Lanka Commercial Motors" };
}

export default async function VehicleDetailPage({ params }: { params: { category: string; slug: string } }) {
  const [category, vehicle] = await Promise.all([
    getCategoryBySlug(params.category),
    getVehicleBySlug(params.slug),
  ]);

  if (!category || !vehicle || vehicle.category_id !== category.id) notFound();

  const variants = await getVehicleVariants(vehicle.id);
  const images = [vehicle.hero_image, ...(vehicle.gallery || [])].filter(Boolean) as string[];
  const specs = Object.entries(vehicle.specs || {}).filter(([, value]) => value);

  return (
    <div className="container py-10">
      <Link href={`/vehicles/${category.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to {category.name_en}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Gallery images={images} alt={vehicle.name} />

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">{category.name_en}</span>
          <h1 className="mt-1 font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">{vehicle.name}</h1>
          {vehicle.tagline && <p className="mt-3 text-charcoal/70">{vehicle.tagline}</p>}
          <p className="mt-4 text-2xl font-bold text-primary">From {formatLKR(vehicle.price_from)}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Hi LCM, I'm interested in the ${vehicle.name}. Please share details.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="accent">WhatsApp Enquire</Button>
            </a>
            <Link href={`/test-drive?vehicle=${vehicle.slug}`}>
              <Button variant="primary">Book a Test Drive</Button>
            </Link>
            {vehicle.brochure_url ? (
              <a href={vehicle.brochure_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline"><FileDown className="h-4 w-4" /> Download Brochure</Button>
              </a>
            ) : (
              <Button variant="outline" disabled title="[PLACEHOLDER] Brochure to be supplied by client">
                <FileDown className="h-4 w-4" /> Brochure Coming Soon
              </Button>
            )}
          </div>

          {specs.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-charcoal">Specifications</h2>
              <dl className="mt-3 divide-y divide-charcoal/10 rounded-lg border border-charcoal/10">
                {specs.map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                    <dt className="text-charcoal/60">{SPEC_LABELS[key] ?? key}</dt>
                    <dd className="text-right font-medium text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-charcoal/50">
                Specifications are indicative and subject to change. Please confirm with our sales team.
              </p>
            </div>
          )}

          {variants.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-charcoal">Variants</h2>
              <div className="mt-3 space-y-2">
                {variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between rounded-lg border border-charcoal/10 px-4 py-3">
                    <span className="text-sm font-semibold text-charcoal">{variant.name}</span>
                    <span className="text-sm font-bold text-primary">{formatLKR(variant.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-xl">
        <h2 className="font-heading text-xl font-bold text-charcoal">Enquire about the {vehicle.name}</h2>
        <p className="mt-1 text-sm text-charcoal/60">Fill in your details and our sales team will get back to you.</p>
        <div className="mt-6">
          <VehicleEnquiryForm vehicleId={vehicle.id} vehicleName={vehicle.name} />
        </div>
      </div>
    </div>
  );
}
