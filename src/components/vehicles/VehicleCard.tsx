import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatLKR } from "@/lib/utils";
import { whatsappLink } from "@/lib/site-config";
import type { Vehicle, VehicleCategory } from "@/lib/database.types";

export function VehicleCard({ vehicle, category }: { vehicle: Vehicle; category?: VehicleCategory }) {
  const detailHref = category ? `/vehicles/${category.slug}/${vehicle.slug}` : `/vehicles`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={detailHref} className="relative block aspect-[4/3] w-full bg-offwhite">
        {vehicle.hero_image && (
          <Image
            src={vehicle.hero_image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{category.name_en}</span>
        )}
        <h3 className="font-heading text-lg font-bold text-charcoal">{vehicle.name}</h3>
        {vehicle.tagline && <p className="mt-1 line-clamp-2 text-sm text-charcoal/60">{vehicle.tagline}</p>}
        <p className="mt-3 text-sm font-semibold text-primary">
          From {formatLKR(vehicle.price_from)}
        </p>
        <div className="mt-4 flex gap-2">
          <Link href={detailHref} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <a
            href={whatsappLink(`Hi LCM, I'm interested in the ${vehicle.name}. Please share details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="accent" size="sm" className="w-full">
              Enquire
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
