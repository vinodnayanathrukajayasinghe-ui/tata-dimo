import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "About Us | Lanka Commercial Motors" };

const STATS = [
  { value: "15+", label: "Years in Service" }, // [PLACEHOLDER]
  { value: "4", label: "Branches Island-wide" },
  { value: "10,000+", label: "Vehicles on the Road" },
  { value: "24/7", label: "Roadside Assistance" },
];

const VALUES = [
  { title: "Reliability", body: "Genuine parts and certified technicians keep your fleet moving." },
  { title: "Partnership", body: "We work alongside fleet operators as a long-term business partner, not just a vendor." },
  { title: "Coverage", body: "Sales and service support across Colombo, Kandy, Kurunegala and Galle." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[360px] items-center overflow-hidden bg-charcoal text-white">
        <Image
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Tata_trucks.jpg"
          alt="LCM fleet"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="container relative z-10">
          <h1 className="font-heading text-3xl font-extrabold sm:text-4xl">About Lanka Commercial Motors</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Authorised dealer and service partner for TATA commercial vehicles in Sri Lanka.
          </p>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal">Our Story</h2>
            <p className="mt-4 text-charcoal/70">
              Lanka Commercial Motors (LCM) is a demo dealership built to showcase a modern digital experience for
              TATA commercial vehicle buyers and fleet operators in Sri Lanka.{" "}
              <span className="font-semibold">[PLACEHOLDER — replace with the client&apos;s real company history.]</span>
            </p>
            <p className="mt-4 text-charcoal/70">
              From single-vehicle owners to large logistics fleets, our sales, service and parts teams support
              customers island-wide with genuine TATA vehicles, finance options and reliable after-sales care.
            </p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button variant="primary">Get in Touch</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-charcoal/10 bg-offwhite p-6 text-center">
                <p className="font-heading text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-charcoal/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-14">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold text-charcoal">What We Stand For</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-heading text-base font-bold text-charcoal">{value.title}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
