"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/database.types";

const TABLE_PATHS = {
  service_bookings: "/admin/service-bookings",
  test_drive_bookings: "/admin/test-drive-bookings",
  parts_enquiries: "/admin/parts-enquiries",
  general_enquiries: "/admin/enquiries",
} as const;

export type BookingTable = keyof typeof TABLE_PATHS;

export async function updateBookingStatus(table: BookingTable, id: string, status: BookingStatus) {
  const supabase = createClient();

  const { error } =
    table === "service_bookings"
      ? await supabase.from("service_bookings").update({ status }).eq("id", id)
      : table === "test_drive_bookings"
        ? await supabase.from("test_drive_bookings").update({ status }).eq("id", id)
        : table === "parts_enquiries"
          ? await supabase.from("parts_enquiries").update({ status }).eq("id", id)
          : await supabase.from("general_enquiries").update({ status }).eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath(TABLE_PATHS[table]);
  revalidatePath("/admin");
  return { success: true };
}
