"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: "/vehicles", label: t("nav.vehicles") },
    { href: "/parts", label: t("nav.parts") },
    { href: "/test-drive", label: t("nav.testDrive") },
    { href: "/offers", label: t("nav.offers") },
    { href: "/locate-us", label: t("nav.locateUs") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const serviceLinks = [
    { href: "/service/book", label: t("nav.bookService") },
    { href: "/service/packages", label: t("nav.servicePackages") },
    { href: "/service/roadside-assistance", label: t("nav.roadsideAssistance") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-charcoal/5 bg-charcoal px-4 py-1.5 text-xs text-white/80 lg:px-8">
        <span className="hidden sm:inline">{siteConfig.tagline}</span>
        <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 font-medium text-white">
          <Phone className="h-3.5 w-3.5" /> {siteConfig.phone}
        </a>
      </div>

      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5 font-heading">
          <span className="text-2xl font-extrabold tracking-tight text-primary">LCM</span>
          <span className="hidden text-sm font-medium text-charcoal/70 sm:inline">| Lanka Commercial Motors</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-primary">
              {t("nav.bookService")} <ChevronDown className="h-3.5 w-3.5" />
            </summary>
            <div className="absolute left-0 top-full z-10 mt-2 w-56 rounded-md border border-charcoal/10 bg-white py-2 shadow-lg">
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-4 py-2 text-sm text-charcoal hover:bg-offwhite hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </details>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-charcoal hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link href="/service/book">
            <Button variant="accent">{t("common.bookService")}</Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-2 text-charcoal lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-charcoal/10 bg-white px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {[...serviceLinks, ...navLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-semibold text-charcoal hover:bg-offwhite hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LanguageSwitcher />
            <Link href="/service/book" onClick={() => setMobileOpen(false)}>
              <Button variant="accent">{t("common.bookService")}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
