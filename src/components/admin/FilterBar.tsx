import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/lib/database.types";

export function FilterBar({
  searchParams,
  branches,
  showBranch,
  showDate,
}: {
  searchParams: Record<string, string | undefined>;
  branches?: Branch[];
  showBranch?: boolean;
  showDate?: boolean;
}) {
  return (
    <form method="get" className="flex flex-wrap items-end gap-3">
      <Input name="q" placeholder="Search name, reference, email..." defaultValue={searchParams.q ?? ""} className="w-full sm:w-56" />
      <Select name="status" defaultValue={searchParams.status ?? ""} className="w-auto min-w-[10rem]">
        <option value="">All Statuses</option>
        <option value="new">New</option>
        <option value="confirmed">Confirmed</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </Select>
      {showBranch && branches && (
        <Select name="branch" defaultValue={searchParams.branch ?? ""} className="w-auto min-w-[12rem]">
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </Select>
      )}
      {showDate && <Input type="date" name="date" defaultValue={searchParams.date ?? ""} className="w-auto" />}
      <Button type="submit" variant="outline" size="sm">Filter</Button>
      {(searchParams.q || searchParams.status || searchParams.branch || searchParams.date) && (
        <a href="." className="text-xs font-medium text-charcoal/50 hover:text-primary">Reset</a>
      )}
    </form>
  );
}
