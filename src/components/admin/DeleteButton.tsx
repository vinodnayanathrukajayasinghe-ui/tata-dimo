"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmMessage = "Are you sure you want to delete this item? This cannot be undone.",
}: {
  action: () => Promise<{ success: boolean; error?: string } | void>;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(async () => {
          const result = await action();
          if (result && !result.success) window.alert(result.error ?? "Failed to delete.");
        });
      }}
      className="rounded-md p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
