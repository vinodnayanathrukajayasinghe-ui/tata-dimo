import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { VehicleCategory } from "@/lib/database.types";

export function CategoryCard({ category }: { category: VehicleCategory }) {
  return (
    <Link
      href={`/vehicles/${category.slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl bg-charcoal"
    >
      {category.image && (
        <Image
          src={category.image}
          alt={category.name_en}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
      <div className="relative z-10 flex items-center justify-between p-4">
        <span className="font-heading text-lg font-bold text-white">{category.name_en}</span>
        <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
