import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/database.types";

export interface DashboardStats {
  todayServiceBookings: number;
  pendingServiceBookings: number;
  pendingTestDrives: number;
  pendingPartsEnquiries: number;
  pendingGeneralEnquiries: number;
  totalVehicles: number;
  totalBranches: number;
}

const OPEN_STATUSES: BookingStatus[] = ["new", "confirmed", "in_progress"];

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    todayServiceBookings,
    pendingServiceBookings,
    pendingTestDrives,
    pendingPartsEnquiries,
    pendingGeneralEnquiries,
    totalVehicles,
    totalBranches,
  ] = await Promise.all([
    supabase.from("service_bookings").select("id", { count: "exact", head: true }).gte("created_at", todayStart.toISOString()),
    supabase.from("service_bookings").select("id", { count: "exact", head: true }).in("status", OPEN_STATUSES),
    supabase.from("test_drive_bookings").select("id", { count: "exact", head: true }).in("status", OPEN_STATUSES),
    supabase.from("parts_enquiries").select("id", { count: "exact", head: true }).in("status", OPEN_STATUSES),
    supabase.from("general_enquiries").select("id", { count: "exact", head: true }).in("status", OPEN_STATUSES),
    supabase.from("vehicles").select("id", { count: "exact", head: true }),
    supabase.from("branches").select("id", { count: "exact", head: true }),
  ]);

  return {
    todayServiceBookings: todayServiceBookings.count ?? 0,
    pendingServiceBookings: pendingServiceBookings.count ?? 0,
    pendingTestDrives: pendingTestDrives.count ?? 0,
    pendingPartsEnquiries: pendingPartsEnquiries.count ?? 0,
    pendingGeneralEnquiries: pendingGeneralEnquiries.count ?? 0,
    totalVehicles: totalVehicles.count ?? 0,
    totalBranches: totalBranches.count ?? 0,
  };
}

export interface ActivityItem {
  id: string;
  type: "Service Booking" | "Test Drive" | "Parts Enquiry" | "General Enquiry";
  title: string;
  reference: string | null;
  status: BookingStatus;
  created_at: string;
  href: string;
}

export async function getRecentActivity(limit = 10): Promise<ActivityItem[]> {
  const supabase = createClient();

  const [service, testDrive, parts, general] = await Promise.all([
    supabase
      .from("service_bookings")
      .select("id, reference, first_name, last_name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("test_drive_bookings")
      .select("id, reference, first_name, last_name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("parts_enquiries")
      .select("id, reference, name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("general_enquiries")
      .select("id, name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const items: ActivityItem[] = [
    ...(service.data ?? []).map((r) => ({
      id: r.id,
      type: "Service Booking" as const,
      title: `${r.first_name} ${r.last_name}`,
      reference: r.reference,
      status: r.status,
      created_at: r.created_at,
      href: "/admin/service-bookings",
    })),
    ...(testDrive.data ?? []).map((r) => ({
      id: r.id,
      type: "Test Drive" as const,
      title: `${r.first_name} ${r.last_name}`,
      reference: r.reference,
      status: r.status,
      created_at: r.created_at,
      href: "/admin/test-drive-bookings",
    })),
    ...(parts.data ?? []).map((r) => ({
      id: r.id,
      type: "Parts Enquiry" as const,
      title: r.name,
      reference: r.reference,
      status: r.status,
      created_at: r.created_at,
      href: "/admin/parts-enquiries",
    })),
    ...(general.data ?? []).map((r) => ({
      id: r.id,
      type: "General Enquiry" as const,
      title: r.name,
      reference: null,
      status: r.status,
      created_at: r.created_at,
      href: "/admin/enquiries",
    })),
  ];

  return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit);
}

export async function getBookingsTrend(days = 14): Promise<{ date: string; serviceBookings: number; testDrives: number }[]> {
  const supabase = createClient();
  const since = new Date();
  since.setDate(since.getDate() - (days - 1));
  since.setHours(0, 0, 0, 0);

  const [service, testDrive] = await Promise.all([
    supabase.from("service_bookings").select("created_at").gte("created_at", since.toISOString()),
    supabase.from("test_drive_bookings").select("created_at").gte("created_at", since.toISOString()),
  ]);

  const buckets: Record<string, { serviceBookings: number; testDrives: number }> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    buckets[d.toISOString().split("T")[0]] = { serviceBookings: 0, testDrives: 0 };
  }

  (service.data ?? []).forEach((r) => {
    const key = r.created_at.split("T")[0];
    if (buckets[key]) buckets[key].serviceBookings += 1;
  });
  (testDrive.data ?? []).forEach((r) => {
    const key = r.created_at.split("T")[0];
    if (buckets[key]) buckets[key].testDrives += 1;
  });

  return Object.entries(buckets).map(([date, counts]) => ({ date, ...counts }));
}
