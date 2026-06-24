import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { cn } from "@/lib/utils";
import { getCategories, getCategoryBySlug, getVehiclesByCategorySlug } from "@/lib/data";

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  return { title: category ? `${category.name_en} | Lanka Commercial Motors` : "Vehicles | Lanka Commercial Motors" };
}

export default async function VehicleCategoryPage({ params }: { params: { category: string } }) {
  const [category, categories] = await Promise.all([
    getCategoryBySlug(params.category),
    getCategories(),
  ]);

  if (!category) notFound();

  const vehicles = await getVehiclesByCategorySlug(params.category);

  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">{category.name_en}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/vehicles"
          className="rounded-full border border-charcoal/15 px-4 py-2 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
        >
          All Categories
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/vehicles/${c.slug}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold",
              c.slug === category.slug
                ? "bg-primary text-white"
                : "border border-charcoal/15 text-charcoal hover:border-primary hover:text-primary"
            )}
          >
            {c.name_en}
          </Link>
        ))}
      </div>

      {vehicles.length === 0 ? (
        <p className="mt-10 text-charcoal/60">No vehicles found in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
