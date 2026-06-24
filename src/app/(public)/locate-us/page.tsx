import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { getBranches } from "@/lib/data";

export const metadata: Metadata = { title: "Locate Us | Lanka Commercial Motors" };

export default async function LocateUsPage() {
  const branches = await getBranches();

  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Dealer & Service Network</h1>
      <p className="mt-2 max-w-2xl text-charcoal/60">
        Find your nearest LCM sales and service centre.
      </p>

      <div className="mt-10 space-y-6">
        {branches.map((branch) => (
          <div key={branch.id} className="grid gap-0 overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm lg:grid-cols-2">
            <div className="p-6">
              <h2 className="font-heading text-lg font-bold text-charcoal">{branch.name}</h2>
              <div className="mt-4 space-y-2 text-sm text-charcoal/70">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {branch.address}
                  {branch.district ? `, ${branch.district}` : ""}
                </p>
                {branch.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-primary">{branch.phone}</a>
                  </p>
                )}
                {branch.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`mailto:${branch.email}`} className="hover:text-primary">{branch.email}</a>
                  </p>
                )}
                {branch.hours && (
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-accent" /> {branch.hours}
                  </p>
                )}
              </div>
            </div>
            <div className="min-h-[220px] bg-offwhite">
              {branch.lat && branch.lng ? (
                <iframe
                  title={`Map for ${branch.name}`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="h-full min-h-[220px] w-full border-0"
                  src={`https://www.google.com/maps?q=${branch.lat},${branch.lng}&output=embed`}
                />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-charcoal/40">
                  Map unavailable
                </div>
              )}
            </div>
          </div>
        ))}
        {branches.length === 0 && <p className="text-charcoal/60">No branches found.</p>}
      </div>
    </div>
  );
}
