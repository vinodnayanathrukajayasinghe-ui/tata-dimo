import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact Us | Lanka Commercial Motors" };

export default function ContactPage() {
  return (
    <div className="container max-w-5xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Contact Us</h1>
      <p className="mt-2 text-charcoal/60">Get in touch with our sales, service or parts teams.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-charcoal/10 p-4">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-charcoal">Phone</p>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-sm text-charcoal/70 hover:text-primary">
                {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-charcoal/10 p-4">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-charcoal">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-charcoal/70 hover:text-primary">
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-charcoal/10 p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-charcoal">Head Office</p>
              <p className="text-sm text-charcoal/70">{siteConfig.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
