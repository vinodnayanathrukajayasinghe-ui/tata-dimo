"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createAdminUser } from "@/lib/actions/users";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormValues {
  email: string;
  password: string;
  fullName?: string;
}

export function CreateAdminUserForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    setMessage(null);
    const result = await createAdminUser(values);
    if (result.success) {
      setMessage({ type: "success", text: "Admin user created." });
      reset();
    } else {
      setMessage({ type: "error", text: result.error ?? "Failed to create user." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" {...register("fullName")} />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" required {...register("email", { required: true })} />
      </div>
      <div>
        <Label htmlFor="password">Password *</Label>
        <Input id="password" type="password" required minLength={8} {...register("password", { required: true })} />
      </div>
      {message && (
        <p className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Admin User"}
      </Button>
    </form>
  );
}
