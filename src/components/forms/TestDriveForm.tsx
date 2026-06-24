"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { testDriveSchema, type TestDriveInput } from "@/lib/validation";
import { submitTestDriveBooking } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Branch, Vehicle } from "@/lib/database.types";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function TestDriveForm({
  vehicles,
  branches,
  defaultVehicleId,
}: {
  vehicles: Vehicle[];
  branches: Branch[];
  defaultVehicleId?: string;
}) {
  const { t } = useLanguage();
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestDriveInput>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: { vehicleId: defaultVehicleId },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(values: TestDriveInput) {
    setSubmitError(null);
    const res = await submitTestDriveBooking(values);
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
        <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">{t("testDrive.successTitle")}</h2>
        <p className="mt-2 text-charcoal/70">{t("testDrive.successMessage")}</p>
        <p className="mt-4 text-sm text-charcoal/60">{t("service.reference")}</p>
        <p className="text-2xl font-bold tracking-wide text-primary">{result.reference}</p>
        <a
          href={whatsappLink(`Hi LCM, I'd like to confirm my test drive. Reference: ${result.reference}`)}
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="vehicleId">{t("testDrive.vehicle")}</Label>
        <Select id="vehicleId" {...register("vehicleId")} defaultValue={defaultVehicleId ?? ""}>
          <option value="">Select vehicle</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
      <div>
        <Label htmlFor="company">{t("service.company")}</Label>
        <Input id="company" {...register("company")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="preferredDate">{t("testDrive.preferredDate")}</Label>
          <Input id="preferredDate" type="date" min={todayISO()} {...register("preferredDate")} />
          {errors.preferredDate && <p className="mt-1 text-xs text-red-600">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="branchId">{t("testDrive.branch")}</Label>
          <Select id="branchId" {...register("branchId")} defaultValue="">
            <option value="">Select branch</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">{t("service.message")}</Label>
        <Textarea id="message" {...register("message")} />
      </div>
      {submitError && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{submitError}</p>}

      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("common.submitting") : t("common.bookTestDrive")}
      </Button>
    </form>
  );
}
