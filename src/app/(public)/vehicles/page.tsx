import Link from "next/link";
import type { Metadata } from "next";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getCategories, getVehicles } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Vehicles | Lanka Commercial Motors" };

export default async function VehiclesPage() {
  const [categories, vehicles] = await Promise.all([getCategories(), getVehicles()]);
  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">Vehicles</h1>
      <p className="mt-2 max-w-2xl text-charcoal/60">
        Browse the full TATA commercial vehicle range available through Lanka Commercial Motors.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className={cn("rounded-full px-4 py-2 text-sm font-semibold", "bg-primary text-white")}>
          All Categories
        </span>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/vehicles/${category.slug}`}
            className="rounded-full border border-charcoal/15 px-4 py-2 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
          >
            {category.name_en}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} category={categoryById[vehicle.category_id]} />
        ))}
      </div>
    </div>
  );
}
