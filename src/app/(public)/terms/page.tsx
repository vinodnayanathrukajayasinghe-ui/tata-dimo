import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions | Lanka Commercial Motors" };

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal">Terms & Conditions</h1>
      <p className="mt-2 text-sm font-semibold text-accent">
        [PLACEHOLDER] This is demo content. Replace with the client&apos;s legal terms before going live.
      </p>
      <div className="mt-6 space-y-4 text-sm text-charcoal/70">
        <p>
          These Terms & Conditions govern your use of the Lanka Commercial Motors (LCM) website, including vehicle
          enquiries, service bookings, test drive requests and parts enquiries submitted through this site.
        </p>
        <p>
          All vehicle specifications, pricing and offers shown on this site are indicative and subject to change
          without notice. Please confirm final pricing and specifications with our sales team before purchase.
        </p>
        <p>
          Service bookings are subject to availability at the selected branch. LCM reserves the right to reschedule
          bookings where necessary and will contact you to confirm any changes.
        </p>
      </div>
    </div>
  );
}
