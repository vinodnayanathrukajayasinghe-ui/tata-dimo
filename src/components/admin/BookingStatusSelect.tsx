"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus, type BookingTable } from "@/lib/actions/admin";
import type { BookingStatus } from "@/lib/database.types";

const STATUSES: BookingStatus[] = ["new", "confirmed", "in_progress", "completed", "cancelled"];
const LABELS: Record<BookingStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function BookingStatusSelect({ table, id, status }: { table: BookingTable; id: string; status: BookingStatus }) {
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as BookingStatus;
        setValue(next);
        startTransition(async () => {
          await updateBookingStatus(table, id, next);
        });
      }}
      className="rounded-md border border-charcoal/20 bg-white px-2 py-1 text-xs font-semibold text-charcoal disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {LABELS[s]}
        </option>
      ))}
    </select>
  );
}
