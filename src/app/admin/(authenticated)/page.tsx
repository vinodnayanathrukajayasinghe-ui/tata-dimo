import Link from "next/link";
import type { Metadata } from "next";
import { Wrench, Car, Package, MessageSquare, ClipboardList, Building2 } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { BookingsTrendChart } from "@/components/admin/BookingsTrendChart";
import { StatusBadge } from "@/components/ui/badge";
import { getDashboardStats, getRecentActivity, getBookingsTrend } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Admin Dashboard | Lanka Commercial Motors" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, activity, trend] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(8),
    getBookingsTrend(14),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-sm text-charcoal/60">Overview of bookings, enquiries and inventory.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Today's Service Bookings" value={stats.todayServiceBookings} icon={Wrench} />
        <StatCard label="Pending Service Bookings" value={stats.pendingServiceBookings} icon={Wrench} accentClassName="text-accent" />
        <StatCard label="Pending Test Drives" value={stats.pendingTestDrives} icon={Car} accentClassName="text-accent" />
        <StatCard label="Pending Parts Enquiries" value={stats.pendingPartsEnquiries} icon={Package} accentClassName="text-accent" />
        <StatCard label="Pending General Enquiries" value={stats.pendingGeneralEnquiries} icon={MessageSquare} accentClassName="text-accent" />
        <StatCard label="Active Vehicles" value={stats.totalVehicles} icon={ClipboardList} />
        <StatCard label="Branches" value={stats.totalBranches} icon={Building2} />
      </div>

      <div className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm">
        <h2 className="font-heading text-base font-bold text-charcoal">Bookings — Last 14 Days</h2>
        <div className="mt-4">
          <BookingsTrendChart data={trend} />
        </div>
      </div>

      <div className="rounded-xl border border-charcoal/10 bg-white shadow-sm">
        <div className="border-b border-charcoal/10 p-5">
          <h2 className="font-heading text-base font-bold text-charcoal">Recent Activity</h2>
        </div>
        <div className="divide-y divide-charcoal/10">
          {activity.length === 0 && <p className="p-5 text-sm text-charcoal/60">No activity yet.</p>}
          {activity.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.href}
              className="flex items-center justify-between gap-4 p-4 hover:bg-offwhite/60"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-charcoal">
                  {item.title} <span className="font-normal text-charcoal/50">— {item.type}</span>
                </p>
                <p className="text-xs text-charcoal/50">
                  {item.reference ? `${item.reference} · ` : ""}
                  {new Date(item.created_at).toLocaleString("en-LK")}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
