import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy | Lanka Commercial Motors" };

export default function CookiePolicyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal">Cookie Policy</h1>
      <p className="mt-2 text-sm font-semibold text-accent">
        [PLACEHOLDER] This is demo content. Replace with the client&apos;s cookie policy before going live.
      </p>
      <div className="mt-6 space-y-4 text-sm text-charcoal/70">
        <p>
          This site uses a small number of cookies to remember your selected language (English / Sinhala / Tamil)
          and to keep you signed in to the admin panel. We do not use cookies for advertising or third-party
          tracking.
        </p>
        <p>
          You can clear cookies at any time through your browser settings. Doing so will reset your language
          preference and sign you out of the admin panel if logged in.
        </p>
      </div>
    </div>
  );
}
