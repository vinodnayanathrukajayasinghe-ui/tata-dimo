"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { generalEnquirySchema, type GeneralEnquiryInput } from "@/lib/validation";
import { submitGeneralEnquiry } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GeneralEnquiryInput>({
    resolver: zodResolver(generalEnquirySchema),
    defaultValues: { sourcePage: "contact" },
  });

  async function onSubmit(values: GeneralEnquiryInput) {
    const result = await submitGeneralEnquiry(values);
    if (result.success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">{t("contact.successTitle")}</h2>
        <p className="mt-2 text-charcoal/70">{t("contact.successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("sourcePage")} />
      <div>
        <Label htmlFor="name">{t("contact.name")} *</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
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
          <Label htmlFor="phone">{t("service.phone")}</Label>
          <Input id="phone" placeholder="+94 77 123 4567" {...register("phone")} />
        </div>
      </div>
      <div>
        <Label htmlFor="message">{t("service.message")}</Label>
        <Textarea id="message" {...register("message")} />
      </div>
      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("common.submitting") : t("common.submit")}
      </Button>
    </form>
  );
}
