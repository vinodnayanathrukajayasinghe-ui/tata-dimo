export interface ServicePackage {
  name: string;
  price: number; // [PLACEHOLDER] confirm pricing with client
  highlight: boolean;
  items: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    name: "Basic",
    price: 8500,
    highlight: false,
    items: ["Engine oil & filter change", "Multi-point inspection", "Brake check", "Fluid top-up"],
  },
  {
    name: "Standard",
    price: 18500,
    highlight: true,
    items: [
      "Everything in Basic",
      "Air & fuel filter replacement",
      "Brake pad inspection & adjustment",
      "Battery & electrical check",
      "Wheel alignment check",
    ],
  },
  {
    name: "Premium",
    price: 32000,
    highlight: false,
    items: [
      "Everything in Standard",
      "Full diagnostic scan",
      "Suspension & steering inspection",
      "Transmission service",
      "Genuine parts warranty",
    ],
  },
];
