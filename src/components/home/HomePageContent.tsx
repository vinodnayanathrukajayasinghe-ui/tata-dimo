"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/vehicles/CategoryCard";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Vehicle, VehicleCategory } from "@/lib/database.types";

const HERO_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Tata_Prima_truck.jpg";

const OFFERS = [
  { title: "0% Down Payment Leasing", body: "Special fleet finance packages available through our partner banks this quarter." }, // [PLACEHOLDER]
  { title: "Free 1st Service", body: "All new TATA commercial vehicle purchases include a complimentary first service." },
  { title: "Extended Warranty", body: "Ask our sales team about extended warranty plans for heavy-duty trucks and buses." },
];

export function HomePageContent({
  categories,
  featuredVehicles,
  categoryById,
}: {
  categories: VehicleCategory[];
  featuredVehicles: Vehicle[];
  categoryById: Record<string, VehicleCategory>;
}) {
  const { t } = useLanguage();

  const whyItems = [
    { title: t("home.why1Title"), body: t("home.why1Body") },
    { title: t("home.why2Title"), body: t("home.why2Body") },
    { title: t("home.why3Title"), body: t("home.why3Body") },
    { title: t("home.why4Title"), body: t("home.why4Body") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-charcoal text-white">
        <Image
          src={HERO_IMAGE}
          alt="TATA commercial vehicles"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        <div className="container relative z-10 py-20">
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wide">
            Authorised TATA Dealer — Sri Lanka
          </span>
          <h1 className="max-w-2xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">{t("home.heroSubtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/vehicles">
              <Button variant="accent" size="lg">{t("home.exploreVehicles")}</Button>
            </Link>
            <Link href="/service/book">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                {t("common.bookService")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="mb-8 font-heading text-2xl font-bold text-charcoal sm:text-3xl">{t("home.categoriesTitle")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured vehicles */}
      <section className="bg-offwhite py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">{t("home.featuredTitle")}</h2>
            <Link href="/vehicles" className="text-sm font-semibold text-primary hover:underline">
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:thin] snap-x snap-mandatory">
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="w-72 shrink-0 snap-start sm:w-80">
                <VehicleCard vehicle={vehicle} category={categoryById[vehicle.category_id]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose LCM */}
      <section className="container py-16">
        <h2 className="mb-10 font-heading text-2xl font-bold text-charcoal sm:text-3xl">{t("home.whyTitle")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item) => (
            <div key={item.title} className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
              <CheckCircle2 className="mb-3 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-heading text-base font-bold text-charcoal">{item.title}</h3>
              <p className="text-sm text-charcoal/60">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service CTA band */}
      <section className="bg-primary py-14 text-white">
        <div className="container flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t("home.serviceCtaTitle")}</h2>
            <p className="mt-2 text-white/80">{t("home.serviceCtaSubtitle")}</p>
          </div>
          <Link href="/service/book">
            <Button variant="accent" size="lg">{t("common.bookService")}</Button>
          </Link>
        </div>
      </section>

      {/* Offers / News */}
      <section className="container py-16">
        <h2 className="mb-8 font-heading text-2xl font-bold text-charcoal sm:text-3xl">{t("home.newsTitle")}</h2>
        <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
          {OFFERS.map((offer) => (
            <div key={offer.title} className="w-72 shrink-0 snap-start rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm sm:w-80">
              <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase text-accent">
                Offer
              </span>
              <h3 className="mb-2 font-heading text-base font-bold text-charcoal">{offer.title}</h3>
              <p className="text-sm text-charcoal/60">{offer.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="bg-offwhite py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">{t("home.aboutTitle")}</h2>
          <p className="mt-4 text-charcoal/70">{t("home.aboutSnippet")}</p>
          <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">
            {t("common.learnMore")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
