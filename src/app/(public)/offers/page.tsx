import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Offers & Finance | Lanka Commercial Motors" };

const OFFERS = [
  {
    icon: Landmark,
    title: "0% Down Payment Leasing", // [PLACEHOLDER]
    body: "Special fleet finance packages available through our partner banks this quarter. Terms and conditions apply.",
  },
  {
    icon: ShieldCheck,
    title: "Free 1st Service",
    body: "All new TATA commercial vehicle purchases include a complimentary first scheduled service at any LCM branch.",
  },
  {
    icon: BadgePercent,
    title: "Extended Warranty",
    body: "Ask our sales team about extended warranty plans for heavy-duty trucks, tippers and buses.",
  },
];

const FINANCE_PARTNERS = [
  "Bank of Ceylon", // [PLACEHOLDER]
  "Commercial Bank",
  "Sampath Bank",
  "People's Leasing",
];

export default function OffersPage() {
  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Offers & Finance</h1>
      <p className="mt-2 max-w-2xl text-charcoal/60">
        Current promotions and flexible finance options to help you grow your fleet. [PLACEHOLDER — confirm with client]
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <div key={offer.title} className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <offer.icon className="mb-3 h-8 w-8 text-accent" />
            <h2 className="mb-2 font-heading text-base font-bold text-charcoal">{offer.title}</h2>
            <p className="text-sm text-charcoal/60">{offer.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-offwhite p-8">
        <h2 className="font-heading text-xl font-bold text-charcoal">Finance Partners</h2>
        <p className="mt-2 text-sm text-charcoal/60">
          We work with leading banks and leasing companies to structure finance plans suited to your business.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {FINANCE_PARTNERS.map((partner) => (
            <span key={partner} className="rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm font-semibold text-charcoal">
              {partner}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-primary p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold">Talk to our sales team about finance options.</h2>
          <p className="mt-1 text-white/80">We&apos;ll help you find a plan that fits your fleet&apos;s budget.</p>
        </div>
        <Link href="/contact">
          <Button variant="accent" size="lg">Contact Sales</Button>
        </Link>
      </div>
    </div>
  );
}
