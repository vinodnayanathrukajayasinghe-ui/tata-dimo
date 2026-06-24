"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalEnquirySchema, type GeneralEnquiryInput } from "@/lib/validation";
import { submitGeneralEnquiry } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";

export function VehicleEnquiryForm({ vehicleId, vehicleName }: { vehicleId: string; vehicleName: string }) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GeneralEnquiryInput>({
    resolver: zodResolver(generalEnquirySchema),
    defaultValues: { vehicleId, sourcePage: `vehicle:${vehicleName}` },
  });

  async function onSubmit(values: GeneralEnquiryInput) {
    const result = await submitGeneralEnquiry(values);
    if (result.success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-700">Thank you! We&apos;ve received your enquiry about the {vehicleName}.</p>
        <p className="mt-1 text-sm text-green-700/80">Our sales team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("vehicleId")} />
      <input type="hidden" {...register("sourcePage")} />
      <div>
        <Label htmlFor="name">{t("contact.name")}</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="company">{t("service.company")}</Label>
        <Input id="company" {...register("company")} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">{t("service.phone")}</Label>
          <Input id="phone" placeholder="+94 77 123 4567" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="email">{t("service.email")}</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="message">{t("service.message")}</Label>
        <Textarea id="message" {...register("message")} placeholder={`I'm interested in the ${vehicleName}...`} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t("common.submitting") : t("common.submit")}
      </Button>
    </form>
  );
}
