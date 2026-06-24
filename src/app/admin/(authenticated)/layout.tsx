import Link from "next/link";
import { LogOut } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  // getSession() reads the already-validated session from cookies without hitting
  // the network. Middleware already called getUser() (which can rotate the refresh
  // token) for this request — calling getUser() again here raced with that rotation
  // and intermittently signed admins out.
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <div className="bg-offwhite">
      <div className="container flex items-center justify-between border-b border-charcoal/10 bg-white px-4 py-3">
        <Link href="/admin" className="font-heading text-lg font-extrabold text-primary">
          LCM <span className="font-medium text-charcoal/60">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-charcoal/60 sm:inline">{user?.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md border border-charcoal/15 px-3 py-1.5 text-sm font-medium text-charcoal hover:bg-charcoal/5"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </form>
        </div>
      </div>

      <div className="container flex flex-col gap-6 py-6 lg:flex-row">
        <aside className="shrink-0 overflow-x-auto lg:w-64">
          <AdminSidebar />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
