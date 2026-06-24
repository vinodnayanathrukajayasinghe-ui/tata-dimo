"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { serviceBookingSchema, type ServiceBookingInput } from "@/lib/validation";
import { submitServiceBooking } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site-config";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Branch, Vehicle } from "@/lib/database.types";

const SERVICE_TYPES = [
  { value: "periodic", label: "Periodic / Scheduled Maintenance" },
  { value: "mechanical_repair", label: "Mechanical Repair" },
  { value: "body_paint", label: "Body & Paint" },
  { value: "electrical_ac", label: "Electrical / AC" },
  { value: "tyre_alignment", label: "Tyre & Alignment" },
  { value: "other", label: "Other" },
];

const SERVICE_OPTIONS = [
  { value: "workshop_dropoff", label: "Workshop Drop-off", hint: "Standard" },
  { value: "onsite_fleet", label: "On-site Fleet Service", hint: "T&Cs apply" },
  { value: "pickup_delivery", label: "Pickup & Delivery", hint: "T&Cs apply" },
];

const TITLES = [
  { value: "mr", label: "Mr" },
  { value: "ms", label: "Ms" },
  { value: "mrs", label: "Mrs" },
  { value: "miss", label: "Miss" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const FLEET_SIZES = [
  { value: "single", label: "Single vehicle" },
  { value: "2-10", label: "2 – 10 vehicles" },
  { value: "10+", label: "10+ vehicles" },
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function ServiceBookingForm({ vehicles, branches }: { vehicles: Vehicle[]; branches: Branch[] }) {
  const { t } = useLanguage();
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceBookingInput>({ resolver: zodResolver(serviceBookingSchema) });

  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(values: ServiceBookingInput) {
    setSubmitError(null);
    const res = await submitServiceBooking(values);
    if (res.success) {
      setResult({ reference: res.reference });
    } else {
      setSubmitError(res.error);
    }
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">{t("service.successTitle")}</h2>
        <p className="mt-2 text-charcoal/70">{t("service.successMessage")}</p>
        <p className="mt-4 text-sm text-charcoal/60">{t("service.reference")}</p>
        <p className="text-2xl font-bold tracking-wide text-primary">{result.reference}</p>
        <a
          href={whatsappLink(`Hi LCM, I'd like to confirm my service booking. Reference: ${result.reference}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block"
        >
          <Button variant="accent" size="lg">{t("service.confirmWhatsapp")}</Button>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <section>
        <h2 className="font-heading text-lg font-bold text-charcoal">{t("service.vehicleDetails")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="vehicleModel">{t("service.vehicleModel")} *</Label>
            <Select id="vehicleModel" {...register("vehicleModel")} defaultValue="">
              <option value="" disabled>Select vehicle model</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.name}>{v.name}</option>
              ))}
            </Select>
            {errors.vehicleModel && <p className="mt-1 text-xs text-red-600">{errors.vehicleModel.message}</p>}
          </div>
          <div>
            <Label htmlFor="registrationNo">{t("service.registrationNo")} *</Label>
            <Input id="registrationNo" placeholder="e.g. WP LX-1234" {...register("registrationNo")} />
            {errors.registrationNo && <p className="mt-1 text-xs text-red-600">{errors.registrationNo.message}</p>}
          </div>
          <div>
            <Label htmlFor="mileage">{t("service.mileage")}</Label>
            <Input id="mileage" type="number" min={0} {...register("mileage")} />
          </div>
          <div>
            <Label htmlFor="regYear">{t("service.regYear")}</Label>
            <Input id="regYear" type="number" placeholder="e.g. 2022" {...register("regYear")} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-bold text-charcoal">{t("service.serviceDetails")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="serviceType">{t("service.serviceType")} *</Label>
            <Select id="serviceType" {...register("serviceType")} defaultValue="">
              <option value="" disabled>Select service type</option>
              {SERVICE_TYPES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </Select>
            {errors.serviceType && <p className="mt-1 text-xs text-red-600">{errors.serviceType.message}</p>}
          </div>
          <div>
            <Label htmlFor="branchId">{t("service.branch")} *</Label>
            <Select id="branchId" {...register("branchId")} defaultValue="">
              <option value="" disabled>Select branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </Select>
            {errors.branchId && <p className="mt-1 text-xs text-red-600">{errors.branchId.message}</p>}
          </div>
          <div>
            <Label htmlFor="bookingDate">{t("service.bookingDate")} *</Label>
            <Input id="bookingDate" type="date" min={todayISO()} {...register("bookingDate")} />
            {errors.bookingDate && <p className="mt-1 text-xs text-red-600">{errors.bookingDate.message}</p>}
          </div>
          <div>
            <Label htmlFor="timeSlot">{t("service.timeSlot")}</Label>
            <Select id="timeSlot" {...register("timeSlot")} defaultValue="">
              <option value="">No preference</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Label>{t("service.serviceOption")} *</Label>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {SERVICE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer flex-col rounded-lg border border-charcoal/15 p-4 text-sm hover:border-primary"
                )}
              >
                <span className="flex items-center gap-2 font-semibold text-charcoal">
                  <input type="radio" value={opt.value} {...register("serviceOption")} className="accent-primary" />
                  {opt.label}
                </span>
                <span className="mt-1 text-xs text-charcoal/50">{opt.hint}</span>
              </label>
            ))}
          </div>
          {errors.serviceOption && <p className="mt-1 text-xs text-red-600">{errors.serviceOption.message}</p>}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-bold text-charcoal">{t("service.customerDetails")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">{t("service.titleField")}</Label>
            <Select id="title" {...register("title")} defaultValue="">
              <option value="">Select</option>
              {TITLES.map((ti) => (
                <option key={ti.value} value={ti.value}>{ti.label}</option>
              ))}
            </Select>
          </div>
          <div />
          <div>
            <Label htmlFor="firstName">{t("service.firstName")} *</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">{t("service.lastName")} *</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
          </div>
          <div>
            <Label htmlFor="company">{t("service.company")}</Label>
            <Input id="company" {...register("company")} />
          </div>
          <div>
            <Label htmlFor="fleetSize">{t("service.fleetSize")}</Label>
            <Select id="fleetSize" {...register("fleetSize")} defaultValue="">
              <option value="">Select</option>
              {FLEET_SIZES.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="email">{t("service.email")} *</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">{t("service.phone")} *</Label>
            <Input id="phone" placeholder="+94 77 123 4567" {...register("phone")} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">{t("service.message")}</Label>
            <Textarea id="message" {...register("message")} />
          </div>
        </div>
      </section>

      {submitError && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{submitError}</p>}

      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("common.submitting") : t("common.submit")}
      </Button>
    </form>
  );
}
