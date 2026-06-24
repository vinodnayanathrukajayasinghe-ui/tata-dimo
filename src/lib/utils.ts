import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLKR(amount: number | null | undefined) {
  if (amount == null) return "Price on request";
  return `Rs. ${amount.toLocaleString("en-LK")}`;
}

export function generateReference(prefix: string) {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${digits}`;
}
