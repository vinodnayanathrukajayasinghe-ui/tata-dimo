"use server";

import { createClient } from "@/lib/supabase/server";
import { generateReference } from "@/lib/utils";
import {
  serviceBookingSchema,
  testDriveSchema,
  partsEnquirySchema,
  generalEnquirySchema,
  type ServiceBookingInput,
  type TestDriveInput,
  type PartsEnquiryInput,
  type GeneralEnquiryInput,
} from "@/lib/validation";

type ActionResult = { success: true; reference: string } | { success: false; error: string };

function toNumberOrNull(value: string | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function withReferenceRetry(
  prefix: string,
  insertFn: (reference: string) => PromiseLike<{ error: { code?: string; message: string } | null }>
): Promise<ActionResult> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const reference = generateReference(prefix);
    const { error } = await insertFn(reference);
    if (!error) return { success: true, reference };
    if (error.code !== "23505") return { success: false, error: error.message };
  }
  return { success: false, error: "Could not generate a unique reference. Please try again." };
}

export async function submitServiceBooking(input: ServiceBookingInput): Promise<ActionResult> {
  const parsed = serviceBookingSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const v = parsed.data;
  const supabase = createClient();

  return withReferenceRetry("LCM-SRV", (reference) =>
    supabase.from("service_bookings").insert({
      reference,
      vehicle_model: v.vehicleModel,
      registration_no: v.registrationNo,
      mileage: toNumberOrNull(v.mileage),
      reg_year: toNumberOrNull(v.regYear),
      service_type: v.serviceType,
      service_option: v.serviceOption,
      branch_id: v.branchId,
      booking_date: v.bookingDate,
      time_slot: v.timeSlot || null,
      title: v.title || null,
      first_name: v.firstName,
      last_name: v.lastName,
      company: v.company || null,
      fleet_size: v.fleetSize || null,
      email: v.email,
      phone: v.phone,
      message: v.message || null,
    })
  );
}

export async function submitTestDriveBooking(input: TestDriveInput): Promise<ActionResult> {
  const parsed = testDriveSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const v = parsed.data;
  const supabase = createClient();

  return withReferenceRetry("LCM-TD", (reference) =>
    supabase.from("test_drive_bookings").insert({
      reference,
      vehicle_id: v.vehicleId || null,
      first_name: v.firstName,
      last_name: v.lastName,
      company: v.company || null,
      email: v.email,
      phone: v.phone,
      preferred_date: v.preferredDate || null,
      branch_id: v.branchId || null,
      message: v.message || null,
    })
  );
}

export async function submitPartsEnquiry(input: PartsEnquiryInput): Promise<ActionResult> {
  const parsed = partsEnquirySchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const v = parsed.data;
  const supabase = createClient();

  return withReferenceRetry("LCM-PT", (reference) =>
    supabase.from("parts_enquiries").insert({
      reference,
      vehicle_model: v.vehicleModel || null,
      part_name: v.partName || null,
      part_number: v.partNumber || null,
      quantity: toNumberOrNull(v.quantity),
      company: v.company || null,
      name: v.name,
      email: v.email,
      phone: v.phone,
      message: v.message || null,
    })
  );
}

export async function submitGeneralEnquiry(
  input: GeneralEnquiryInput
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = generalEnquirySchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const v = parsed.data;
  const supabase = createClient();
  const { error } = await supabase.from("general_enquiries").insert({
    source_page: v.sourcePage || null,
    vehicle_id: v.vehicleId || null,
    name: v.name,
    company: v.company || null,
    email: v.email,
    phone: v.phone || null,
    message: v.message || null,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}
