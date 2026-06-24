import { z } from "zod";

const phoneRegex = /^(?:\+94[ -]?|0)?[1-9]\d{8}$/;

const phoneSchema = z
  .string()
  .min(1, "Contact number is required")
  .refine((v) => phoneRegex.test(v.replace(/\s/g, "")), "Enter a valid Sri Lankan number, e.g. +94771234567");

const emailSchema = z.string().min(1, "Email is required").email("Enter a valid email address");

function notInPast(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export const serviceBookingSchema = z.object({
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  registrationNo: z.string().min(1, "Registration number is required"),
  mileage: z.string().optional(),
  regYear: z.string().optional(),
  serviceType: z.enum(["periodic", "mechanical_repair", "body_paint", "electrical_ac", "tyre_alignment", "other"], {
    errorMap: () => ({ message: "Select a service type" }),
  }),
  serviceOption: z.enum(["workshop_dropoff", "onsite_fleet", "pickup_delivery"], {
    errorMap: () => ({ message: "Select a service option" }),
  }),
  branchId: z.string().min(1, "Select a service centre"),
  bookingDate: z.string().min(1, "Booking date is required").refine(notInPast, "Booking date cannot be in the past"),
  // Plain optional strings (not z.enum) so an unselected <select> ("") passes
  // validation cleanly — zod's .optional() only allows undefined, not "".
  timeSlot: z.string().optional(),
  title: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  fleetSize: z.string().optional(),
  email: emailSchema,
  phone: phoneSchema,
  message: z.string().optional(),
});
export type ServiceBookingInput = z.infer<typeof serviceBookingSchema>;

export const testDriveSchema = z.object({
  vehicleId: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  email: emailSchema,
  phone: phoneSchema,
  preferredDate: z.string().optional().refine((v) => !v || notInPast(v), "Preferred date cannot be in the past"),
  branchId: z.string().optional(),
  message: z.string().optional(),
});
export type TestDriveInput = z.infer<typeof testDriveSchema>;

export const partsEnquirySchema = z.object({
  vehicleModel: z.string().optional(),
  partName: z.string().optional(),
  partNumber: z.string().optional(),
  quantity: z.string().optional(),
  company: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: emailSchema,
  phone: phoneSchema,
  message: z.string().optional(),
});
export type PartsEnquiryInput = z.infer<typeof partsEnquirySchema>;

export const generalEnquirySchema = z.object({
  sourcePage: z.string().optional(),
  vehicleId: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: emailSchema,
  phone: z.string().optional(),
  message: z.string().optional(),
});
export type GeneralEnquiryInput = z.infer<typeof generalEnquirySchema>;
