import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatLKR } from "@/lib/utils";
import { SERVICE_PACKAGES } from "@/lib/service-packages";

export const metadata: Metadata = { title: "Service Packages | Lanka Commercial Motors" };

export default function ServicePackagesPage() {
  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Service Packages</h1>
      <p className="mt-2 max-w-2xl text-charcoal/60">
        Choose a maintenance package that fits your vehicle&apos;s needs. Prices shown are indicative starting
        prices and vary by model. [PLACEHOLDER — confirm pricing with client]
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {SERVICE_PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className={cn(
              "flex flex-col rounded-2xl border p-6 shadow-sm",
              pkg.highlight ? "border-primary bg-primary text-white" : "border-charcoal/10 bg-white"
            )}
          >
            <h2 className="font-heading text-xl font-bold">{pkg.name}</h2>
            <p className={cn("mt-2 text-2xl font-extrabold", pkg.highlight ? "text-white" : "text-primary")}>
              {formatLKR(pkg.price)}
            </p>
            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
              {pkg.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className={cn("mt-0.5 h-4 w-4 shrink-0", pkg.highlight ? "text-white" : "text-accent")} />
                  <span className={pkg.highlight ? "text-white/90" : "text-charcoal/70"}>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/service/book" className="mt-6">
              <Button variant={pkg.highlight ? "accent" : "primary"} className="w-full">
                Book This Package
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
