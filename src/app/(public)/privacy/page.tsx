import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | Lanka Commercial Motors" };

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal">Privacy Policy</h1>
      <p className="mt-2 text-sm font-semibold text-accent">
        [PLACEHOLDER] This is demo content. Replace with the client&apos;s legal privacy policy before going live.
      </p>
      <div className="mt-6 space-y-4 text-sm text-charcoal/70">
        <p>
          Lanka Commercial Motors (LCM) collects the information you submit through our enquiry, service booking,
          test drive and parts request forms — such as your name, company, phone number and email address — in
          order to respond to your request and provide the service requested.
        </p>
        <p>
          We do not sell your personal information to third parties. Information may be shared with our finance
          partners only where you have requested finance-related assistance.
        </p>
        <p>
          For any questions about how your data is used, please contact us via the details on our{" "}
          <a href="/contact" className="text-primary underline">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
