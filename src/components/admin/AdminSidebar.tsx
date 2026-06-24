"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Car,
  Package,
  MessageSquare,
  ClipboardList,
  Building2,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/service-bookings", label: "Service Bookings", icon: Wrench },
  { href: "/admin/test-drive-bookings", label: "Test Drive Bookings", icon: Car },
  { href: "/admin/parts-enquiries", label: "Parts Enquiries", icon: Package },
  { href: "/admin/enquiries", label: "General Enquiries", icon: MessageSquare },
  { href: "/admin/vehicles", label: "Vehicles", icon: ClipboardList },
  { href: "/admin/branches", label: "Branches", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: UserCog },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-white" : "text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
