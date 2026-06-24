import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin Login | Lanka Commercial Motors" };

export default function AdminLoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-offwhite px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <h1 className="font-heading text-xl font-bold text-charcoal">LCM Admin</h1>
        <p className="mt-1 text-sm text-charcoal/60">Sign in to manage bookings, vehicles and branches.</p>
        <div className="mt-6">
          <LoginForm next={searchParams.next ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
