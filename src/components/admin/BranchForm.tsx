"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchFormSchema, type BranchFormInput } from "@/lib/validation-admin";
import { saveBranch } from "@/lib/actions/branches";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/lib/database.types";

export function BranchForm({ branch }: { branch?: Branch }) {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BranchFormInput>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: branch
      ? {
          name: branch.name,
          address: branch.address,
          district: branch.district ?? "",
          phone: branch.phone ?? "",
          email: branch.email ?? "",
          lat: branch.lat != null ? String(branch.lat) : "",
          lng: branch.lng != null ? String(branch.lng) : "",
          hours: branch.hours ?? "",
          isActive: branch.is_active,
        }
      : { isActive: true },
  });

  async function onSubmit(values: BranchFormInput) {
    setFormError(null);
    const result = await saveBranch(branch?.id ?? null, values);
    if (result && !result.success) setFormError(result.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
      {formError && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{formError}</p>}

      <div>
        <Label htmlFor="name">Branch Name *</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea id="address" {...register("address")} />
        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="district">District</Label>
          <Input id="district" {...register("district")} />
        </div>
        <div>
          <Label htmlFor="hours">Opening Hours</Label>
          <Input id="hours" placeholder="Mon - Sat: 8.00 AM - 6.00 PM" {...register("hours")} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="lat">Latitude</Label>
          <Input id="lat" type="number" step="any" {...register("lat")} />
        </div>
        <div>
          <Label htmlFor="lng">Longitude</Label>
          <Input id="lng" type="number" step="any" {...register("lng")} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input id="isActive" type="checkbox" {...register("isActive")} className="h-4 w-4 accent-primary" />
        <Label htmlFor="isActive" className="mb-0">Active (visible on the public site)</Label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : branch ? "Save Changes" : "Create Branch"}
      </Button>
    </form>
  );
}
