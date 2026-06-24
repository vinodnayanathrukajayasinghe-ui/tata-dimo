import type { Metadata } from "next";
import { Phone, Clock, MapPin, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = { title: "Roadside Assistance | Lanka Commercial Motors" };

const FEATURES = [
  { icon: Clock, title: "24/7 Availability", body: "Our roadside assistance hotline is available around the clock, every day of the year." },
  { icon: MapPin, title: "Island-wide Coverage", body: "Support dispatched from our nearest branch to wherever your vehicle is." },
  { icon: LifeBuoy, title: "On-the-spot Repairs", body: "Minor repairs and battery jump-starts handled on-site where possible." },
];

export default function RoadsideAssistancePage() {
  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Roadside Assistance</h1>
      <p className="mt-2 max-w-2xl text-charcoal/60">
        Breakdown on the road? Our team is on standby to get your vehicle moving again.
      </p>

      <div className="mt-10 rounded-2xl bg-primary p-8 text-white">
        <p className="text-sm uppercase tracking-wide text-white/70">24-Hour Roadside Hotline</p>
        <p className="mt-1 font-heading text-3xl font-extrabold">{siteConfig.phone}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <Button variant="accent" size="lg"><Phone className="h-4 w-4" /> Call Now</Button>
          </a>
          <a href={whatsappLink("Hi LCM, I need roadside assistance. My location is...")} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <f.icon className="mb-3 h-8 w-8 text-accent" />
            <h2 className="font-heading text-base font-bold text-charcoal">{f.title}</h2>
            <p className="mt-2 text-sm text-charcoal/60">{f.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-charcoal/50">
        [PLACEHOLDER] Roadside assistance terms, coverage area and any applicable charges to be confirmed by the client.
      </p>
    </div>
  );
}
