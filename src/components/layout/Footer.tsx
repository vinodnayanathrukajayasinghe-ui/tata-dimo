"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { FacebookIcon, YoutubeIcon, InstagramIcon } from "@/components/layout/SocialIcons";

const CATEGORY_SLUGS = ["trucks", "buses", "pickups", "light-commercial", "tippers", "prime-movers"];
const CATEGORY_LABELS: Record<string, string> = {
  trucks: "Trucks",
  buses: "Buses",
  pickups: "Pickups",
  "light-commercial": "Light Commercial",
  tippers: "Tippers",
  "prime-movers": "Prime Movers",
};

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.vehiclesHeading")}
          </h4>
          <ul className="space-y-2 text-sm">
            {CATEGORY_SLUGS.map((slug) => (
              <li key={slug}>
                <Link href={`/vehicles/${slug}`} className="hover:text-accent">
                  {CATEGORY_LABELS[slug]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.servicesHeading")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/service/book" className="hover:text-accent">{t("nav.bookService")}</Link></li>
            <li><Link href="/service/packages" className="hover:text-accent">{t("nav.servicePackages")}</Link></li>
            <li><Link href="/service/roadside-assistance" className="hover:text-accent">{t("nav.roadsideAssistance")}</Link></li>
            <li><Link href="/parts" className="hover:text-accent">{t("nav.parts")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.companyHeading")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">{t("nav.about")}</Link></li>
            <li><Link href="/locate-us" className="hover:text-accent">{t("nav.locateUs")}</Link></li>
            <li><Link href="/offers" className="hover:text-accent">{t("nav.offers")}</Link></li>
            <li><Link href="/contact" className="hover:text-accent">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.contactHeading")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" /> {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" /> {siteConfig.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {siteConfig.address}
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <a href={whatsappLink("Hi LCM, I'd like to get in touch.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-accent">
              <Phone className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-accent">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full bg-white/10 p-2 hover:bg-accent">
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-accent">
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
          <p>© {year} {siteConfig.name}. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white">{t("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-white">{t("footer.privacy")}</Link>
            <Link href="/cookie-policy" className="hover:text-white">{t("footer.cookiePolicy")}</Link>
            <span className="font-semibold text-accent">{t("footer.demoNotice")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
