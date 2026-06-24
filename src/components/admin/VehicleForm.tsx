"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { vehicleFormSchema, type VehicleFormInput } from "@/lib/validation-admin";
import { saveVehicle } from "@/lib/actions/vehicles";
import { uploadVehicleImage } from "@/lib/upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Vehicle, VehicleCategory } from "@/lib/database.types";

const SPEC_FIELDS: { key: keyof NonNullable<VehicleFormInput["specs"]>; label: string }[] = [
  { key: "gvw", label: "GVW" },
  { key: "engine", label: "Engine" },
  { key: "power", label: "Power" },
  { key: "torque", label: "Torque" },
  { key: "payload", label: "Payload" },
  { key: "fuel_type", label: "Fuel Type" },
  { key: "transmission", label: "Transmission" },
  { key: "wheelbase", label: "Wheelbase" },
  { key: "fuel_tank", label: "Fuel Tank Capacity" },
];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function VehicleForm({ vehicle, categories }: { vehicle?: Vehicle; categories: VehicleCategory[] }) {
  const [gallery, setGallery] = useState<string[]>(vehicle?.gallery ?? []);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormInput>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: vehicle
      ? {
          categoryId: vehicle.category_id,
          slug: vehicle.slug,
          name: vehicle.name,
          tagline: vehicle.tagline ?? "",
          heroImage: vehicle.hero_image ?? "",
          gallery: vehicle.gallery ?? [],
          priceFrom: vehicle.price_from != null ? String(vehicle.price_from) : "",
          brochureUrl: vehicle.brochure_url ?? "",
          isActive: vehicle.is_active,
          sortOrder: String(vehicle.sort_order),
          specs: vehicle.specs ?? {},
        }
      : { isActive: true, sortOrder: "0", gallery: [] },
  });

  const heroImage = watch("heroImage");
  const nameValue = watch("name");

  async function onSubmit(values: VehicleFormInput) {
    setFormError(null);
    const result = await saveVehicle(vehicle?.id ?? null, { ...values, gallery });
    if (result && !result.success) setFormError(result.error);
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadVehicleImage(file);
      setValue("heroImage", url, { shouldValidate: true });
    } catch {
      setFormError("Image upload failed. Please try again.");
    } finally {
      setUploadingHero(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(uploadVehicleImage));
      setGallery((prev) => [...prev, ...urls]);
    } catch {
      setFormError("Image upload failed. Please try again.");
    } finally {
      setUploadingGallery(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {formError && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{formError}</p>}

      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register("name", {
              onChange: (e) => {
                if (!vehicle) setValue("slug", slugify(e.target.value));
              },
            })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" {...register("slug")} />
          {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>}
        </div>
        <div>
          <Label htmlFor="categoryId">Category *</Label>
          <Select id="categoryId" {...register("categoryId")} defaultValue={vehicle?.category_id ?? ""}>
            <option value="" disabled>Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name_en}</option>
            ))}
          </Select>
          {errors.categoryId && <p className="mt-1 text-xs text-red-600">{errors.categoryId.message}</p>}
        </div>
        <div>
          <Label htmlFor="priceFrom">Price From (LKR)</Label>
          <Input id="priceFrom" type="number" {...register("priceFrom")} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" {...register("tagline")} placeholder={`e.g. ${nameValue || "Vehicle"} — built for the long haul`} />
        </div>
        <div>
          <Label htmlFor="brochureUrl">Brochure URL</Label>
          <Input id="brochureUrl" {...register("brochureUrl")} placeholder="[PLACEHOLDER] PDF link" />
        </div>
        <div>
          <Label htmlFor="sortOrder">Sort Order</Label>
          <Input id="sortOrder" type="number" {...register("sortOrder")} />
        </div>
      </section>

      <section>
        <Label>Hero Image</Label>
        <div className="flex items-center gap-4">
          {heroImage && (
            <div className="relative h-20 w-28 overflow-hidden rounded-md border border-charcoal/10">
              <Image src={heroImage} alt="Hero preview" fill className="object-cover" />
            </div>
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-charcoal/30 px-4 py-3 text-sm font-medium text-charcoal/70 hover:border-primary hover:text-primary">
            {uploadingHero ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploadingHero ? "Uploading..." : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
          </label>
        </div>
        <Input className="mt-2" {...register("heroImage")} placeholder="Or paste an image URL" />
      </section>

      <section>
        <Label>Gallery</Label>
        <div className="flex flex-wrap gap-3">
          {gallery.map((url) => (
            <div key={url} className="relative h-20 w-28 overflow-hidden rounded-md border border-charcoal/10">
              <Image src={url} alt="Gallery image" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setGallery((prev) => prev.filter((u) => u !== url))}
                className="absolute right-1 top-1 rounded-full bg-charcoal/70 p-0.5 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label className="flex h-20 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-charcoal/30 text-xs font-medium text-charcoal/70 hover:border-primary hover:text-primary">
            {uploadingGallery ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Add
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
          </label>
        </div>
      </section>

      <section>
        <Label>Specifications</Label>
        <div className="grid gap-4 sm:grid-cols-3">
          {SPEC_FIELDS.map((field) => (
            <div key={field.key}>
              <Label htmlFor={`spec-${field.key}`} className="text-xs text-charcoal/60">{field.label}</Label>
              <Input id={`spec-${field.key}`} {...register(`specs.${field.key}`)} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center gap-3">
        <input id="isActive" type="checkbox" {...register("isActive")} className="h-4 w-4 accent-primary" />
        <Label htmlFor="isActive" className="mb-0">Active (visible on the public site)</Label>
      </section>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : vehicle ? "Save Changes" : "Create Vehicle"}
        </Button>
      </div>
    </form>
  );
}
