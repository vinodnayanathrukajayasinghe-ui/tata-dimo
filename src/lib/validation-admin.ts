import { z } from "zod";

export const vehicleFormSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  name: z.string().min(1, "Name is required"),
  tagline: z.string().optional(),
  heroImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  priceFrom: z.string().optional(),
  brochureUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.string().optional(),
  specs: z
    .object({
      gvw: z.string().optional(),
      engine: z.string().optional(),
      power: z.string().optional(),
      torque: z.string().optional(),
      payload: z.string().optional(),
      fuel_type: z.string().optional(),
      transmission: z.string().optional(),
      wheelbase: z.string().optional(),
      fuel_tank: z.string().optional(),
    })
    .optional(),
});
export type VehicleFormInput = z.infer<typeof vehicleFormSchema>;

export const branchFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  district: z.string().optional(),
  phone: z.string().optional(),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  hours: z.string().optional(),
  isActive: z.boolean().optional(),
});
export type BranchFormInput = z.infer<typeof branchFormSchema>;
