// Seeds demo data for Lanka Commercial Motors (LCM).
// All images are real, freely-licensed stock photos from Wikimedia Commons,
// chosen as close visual matches to each model. [PLACEHOLDER] — swap for the
// client's own brochure photography before going live.
// Run with: npm run seed

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Run via `npm run seed` so .env.local is loaded."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const wiki = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const CATEGORIES = [
  {
    slug: "trucks",
    name_en: "Trucks",
    name_si: "ට්‍රක් රථ",
    name_ta: "டிரக்குகள்",
    icon: "truck",
    image: wiki("Tata_LPT_1615_truck_Bangladesh_(24587122563).jpg"),
    sort_order: 1,
  },
  {
    slug: "buses",
    name_en: "Buses",
    name_si: "බස් රථ",
    name_ta: "பேருந்துகள்",
    icon: "bus",
    image: wiki("TATA_STARBUS_NALAKA_TOURS_KANDY_BUS_STATION_SRI_LANKA_JAN_2013_(8900950234).jpg"),
    sort_order: 2,
  },
  {
    slug: "pickups",
    name_en: "Pickups",
    name_si: "පික්අප්",
    name_ta: "பிக்அப் வாகனங்கள்",
    icon: "truck",
    image: wiki("Tata_Xenon_(side_quarter).jpg"),
    sort_order: 3,
  },
  {
    slug: "light-commercial",
    name_en: "Light Commercial",
    name_si: "සැහැල්ලු වාණිජ වාහන",
    name_ta: "இலகு வணிக வாகனங்கள்",
    icon: "truck",
    image: wiki("Tata_Ace_Mini_Truck_(2).JPG"),
    sort_order: 4,
  },
  {
    slug: "tippers",
    name_en: "Tippers",
    name_si: "ටිපර් රථ",
    name_ta: "டிப்பர் வாகனங்கள்",
    icon: "truck",
    image: wiki("Mini_tipper_vehicle.jpg"),
    sort_order: 5,
  },
  {
    slug: "prime-movers",
    name_en: "Prime Movers",
    name_si: "ප්‍රයිම් මූවර්",
    name_ta: "பிரைம் மூவர்",
    icon: "truck",
    image: wiki("Truck_on_truck_Tata_LPS_4018_prime_mover,_Bangladesh._(33921484981).jpg"),
    sort_order: 6,
  },
];

const VEHICLES = [
  {
    slug: "tata-lpt-1618",
    category: "trucks",
    name: "Tata LPT 1618",
    tagline: "The dependable medium-duty workhorse for distribution fleets.",
    hero_image: wiki("Tata_LPT_1615_truck_Bangladesh_(24587122563).jpg"),
    gallery: [wiki("TATA_LPTA_1615_TC.jpg"), wiki("Tata_2000_series_truck.jpg")],
    price_from: 12500000,
    specs: {
      gvw: "16,180 kg",
      engine: "Tata 697 TCIC, 5.7L turbo diesel",
      power: "180 hp",
      torque: "650 Nm",
      payload: "10,500 kg",
      fuel_type: "Diesel",
      transmission: "6-speed manual (GBS60)",
      wheelbase: "4,400 / 5,000 / 5,600 mm",
      fuel_tank: "200 L",
    },
    sort_order: 1,
    variants: [
      { name: "LPT 1618 Standard", price: 12500000, specs: { wheelbase: "4,400 mm" } },
      { name: "LPT 1618 Long Wheelbase", price: 13100000, specs: { wheelbase: "5,600 mm" } },
    ],
  },
  {
    slug: "tata-prima",
    category: "trucks",
    name: "Tata Prima",
    tagline: "Heavy-duty haulage built for the long run.",
    hero_image: wiki("MDL_Logistik_TATA_Prima_(BE_9321_CU).jpg"),
    gallery: [wiki("Tata_2000_series_truck.jpg")],
    price_from: 21500000,
    specs: {
      gvw: "25,000 kg",
      engine: "Cummins/Tata 6-cylinder turbo intercooled",
      power: "310 hp",
      torque: "1,200 Nm",
      payload: "16,000 kg",
      fuel_type: "Diesel",
      transmission: "9-speed manual",
      wheelbase: "4,200 / 5,200 mm",
      fuel_tank: "300 L",
    },
    sort_order: 2,
    variants: [
      { name: "Prima 2528.K", price: 21500000, specs: { power: "280 hp" } },
      { name: "Prima 3128.K", price: 24800000, specs: { power: "310 hp" } },
    ],
  },
  {
    slug: "tata-signa",
    category: "trucks",
    name: "Tata Signa",
    tagline: "Modern medium & heavy-duty range engineered for efficiency.",
    hero_image: wiki("TATA_1210SE_-_TVS_Southern_Roadways_Coimbatore.JPG"),
    gallery: [wiki("Tata_2000_series_truck.jpg")],
    price_from: 16800000,
    specs: {
      gvw: "19,000 kg",
      engine: "Tata 5.7L turbo diesel",
      power: "230 hp",
      torque: "850 Nm",
      payload: "12,200 kg",
      fuel_type: "Diesel",
      transmission: "6-speed manual",
      wheelbase: "4,800 mm",
      fuel_tank: "250 L",
    },
    sort_order: 3,
  },
  {
    slug: "tata-ultra",
    category: "trucks",
    name: "Tata Ultra",
    tagline: "Light & medium-duty truck range for last-mile distribution.",
    hero_image: wiki("TATA_1212_SA_4X4.jpg"),
    gallery: [wiki("Tata_2000_series_truck.jpg")],
    price_from: 9800000,
    specs: {
      gvw: "12,000 kg",
      engine: "Tata 3.3L turbo diesel",
      power: "150 hp",
      torque: "450 Nm",
      payload: "7,500 kg",
      fuel_type: "Diesel",
      transmission: "5-speed manual",
      wheelbase: "3,800 mm",
      fuel_tank: "150 L",
    },
    sort_order: 4,
  },
  {
    slug: "tata-prima-tipper",
    category: "tippers",
    name: "Tata Prima Tipper",
    tagline: "Engineered for high-volume construction and mining haulage.",
    hero_image: wiki("Mini_tipper_vehicle.jpg"),
    gallery: [],
    price_from: 19500000,
    specs: {
      gvw: "25,000 kg",
      engine: "Tata 6-cylinder turbo diesel",
      power: "280 hp",
      torque: "1,050 Nm",
      payload: "15,500 kg",
      fuel_type: "Diesel",
      transmission: "9-speed manual",
      wheelbase: "3,800 mm",
      fuel_tank: "300 L",
    },
    sort_order: 5,
  },
  {
    slug: "tata-signa-tipper",
    category: "tippers",
    name: "Tata Signa Tipper",
    tagline: "Rugged tipper body on the Signa platform for quarry and site work.",
    hero_image: wiki("Mini_tipper_vehicle.jpg"),
    gallery: [],
    price_from: 17200000,
    specs: {
      gvw: "19,000 kg",
      engine: "Tata 5.7L turbo diesel",
      power: "230 hp",
      torque: "850 Nm",
      payload: "11,800 kg",
      fuel_type: "Diesel",
      transmission: "6-speed manual",
      wheelbase: "3,600 mm",
      fuel_tank: "250 L",
    },
    sort_order: 6,
  },
  {
    slug: "tata-prima-4928s",
    category: "prime-movers",
    name: "Tata Prima 4928.S",
    tagline: "High-horsepower tractor unit for articulated trailer haulage.",
    hero_image: wiki("Truck_on_truck_Tata_LPS_4018_prime_mover,_Bangladesh._(33921484981).jpg"),
    gallery: [],
    price_from: 28500000,
    specs: {
      gvw: "49,000 kg (GCW)",
      engine: "Cummins 8.9L turbo intercooled",
      power: "280 hp",
      torque: "1,100 Nm",
      payload: "Tractor-trailer, per trailer spec",
      fuel_type: "Diesel",
      transmission: "9-speed manual",
      wheelbase: "3,300 mm",
      fuel_tank: "300 L",
    },
    sort_order: 7,
  },
  {
    slug: "tata-xenon",
    category: "pickups",
    name: "Tata Xenon",
    tagline: "Double-cab pickup that balances payload with everyday comfort.",
    hero_image: wiki("Tata_Xenon_(side_quarter).jpg"),
    gallery: [wiki("Tata_Xenon_(front_quarter).jpg"), wiki("Tata_Xenon_rear_view.jpg")],
    price_from: 6450000,
    specs: {
      gvw: "2,750 kg",
      engine: "2.2L DICOR turbo diesel",
      power: "140 hp",
      torque: "320 Nm",
      payload: "1,000 kg",
      fuel_type: "Diesel",
      transmission: "5-speed manual",
      wheelbase: "3,150 mm",
      fuel_tank: "65 L",
    },
    sort_order: 8,
    variants: [
      { name: "Xenon Single Cab", price: 5950000, specs: {} },
      { name: "Xenon Double Cab 4x4", price: 6950000, specs: {} },
    ],
  },
  {
    slug: "tata-yodha",
    category: "pickups",
    name: "Tata Yodha",
    tagline: "Built tougher for fleet and commercial pickup duty.",
    hero_image: wiki("Tata_Pick-Up_4x4_double_cab.JPG"),
    gallery: [],
    price_from: 5650000,
    specs: {
      gvw: "2,910 kg",
      engine: "2.2L turbo diesel",
      power: "100 hp",
      torque: "250 Nm",
      payload: "1,500 kg",
      fuel_type: "Diesel",
      transmission: "5-speed manual",
      wheelbase: "2,815 mm",
      fuel_tank: "65 L",
    },
    sort_order: 9,
  },
  {
    slug: "tata-ace",
    category: "light-commercial",
    name: "Tata Ace",
    tagline: "Sri Lanka's favourite mini-truck for first and last-mile delivery.",
    hero_image: wiki("Tata_Ace_Mini_Truck_(2).JPG"),
    gallery: [wiki("Tata_Ace_EX2_(21729583101).jpg"), wiki("Tata_Ace_mini-truck,_Bangladesh._(43208174404).jpg")],
    price_from: 3150000,
    specs: {
      gvw: "1,500 kg",
      engine: "0.7L diesel",
      power: "16 hp",
      torque: "38 Nm",
      payload: "750 kg",
      fuel_type: "Diesel",
      transmission: "4-speed manual",
      wheelbase: "2,000 mm",
      fuel_tank: "21 L",
    },
    sort_order: 10,
    variants: [
      { name: "Ace EX2", price: 3150000, specs: {} },
      { name: "Ace Gold", price: 3450000, specs: {} },
    ],
  },
  {
    slug: "tata-super-ace",
    category: "light-commercial",
    name: "Tata Super Ace",
    tagline: "Bigger deck, bigger payload — for growing delivery fleets.",
    hero_image: wiki("Tata_Super_Ace_display.jpg"),
    gallery: [],
    price_from: 4250000,
    specs: {
      gvw: "2,150 kg",
      engine: "1.4L turbo diesel",
      power: "70 hp",
      torque: "140 Nm",
      payload: "1,150 kg",
      fuel_type: "Diesel",
      transmission: "5-speed manual",
      wheelbase: "2,400 mm",
      fuel_tank: "39 L",
    },
    sort_order: 11,
  },
  {
    slug: "tata-intra",
    category: "light-commercial",
    name: "Tata Intra",
    tagline: "Modern light truck range with car-like cabin comfort.",
    hero_image: wiki("Tata_Ace_mini-truck,_Bangladesh._(43208174404).jpg"),
    gallery: [],
    price_from: 4750000,
    specs: {
      gvw: "3,500 kg",
      engine: "2.2L turbo diesel",
      power: "100 hp",
      torque: "250 Nm",
      payload: "2,000 kg",
      fuel_type: "Diesel",
      transmission: "5-speed manual",
      wheelbase: "2,500 mm",
      fuel_tank: "47 L",
    },
    sort_order: 12,
  },
  {
    slug: "tata-starbus",
    category: "buses",
    name: "Tata LP / Starbus",
    tagline: "Reliable city and intercity bus chassis trusted across Sri Lanka.",
    hero_image: wiki("TATA_STARBUS_NALAKA_TOURS_KANDY_BUS_STATION_SRI_LANKA_JAN_2013_(8900950234).jpg"),
    gallery: [wiki("TATA_BUS_KANDY_SRI_LANKA_JAN_2013_(8900327407).jpg")],
    price_from: 17500000,
    specs: {
      gvw: "11,990 kg",
      engine: "Tata 5.7L turbo diesel",
      power: "150 hp",
      torque: "450 Nm",
      payload: "Up to 52 seats",
      fuel_type: "Diesel",
      transmission: "6-speed manual",
      wheelbase: "4,400 mm",
      fuel_tank: "200 L",
    },
    sort_order: 13,
  },
  {
    slug: "tata-marcopolo",
    category: "buses",
    name: "Tata Marcopolo",
    tagline: "Premium bus body-engineering joint venture for fleet and tourism operators.",
    hero_image: wiki("Kadamba_Tata_Marcopolo_Starbus_Ultra_Ac_Deluxe.jpg"),
    gallery: [wiki("Tata_Marcopolo_Green_Chandigarh_Ind.jpg")],
    price_from: 22500000,
    specs: {
      gvw: "16,200 kg",
      engine: "Tata 5.7L turbo diesel",
      power: "180 hp",
      torque: "650 Nm",
      payload: "Up to 49 seats (AC)",
      fuel_type: "Diesel",
      transmission: "6-speed manual",
      wheelbase: "4,800 mm",
      fuel_tank: "250 L",
    },
    sort_order: 14,
  },
];

const BRANCHES = [
  {
    name: "LCM Colombo Main Service Centre",
    address: "No. 120, Negombo Road, Wattala", // [PLACEHOLDER]
    district: "Colombo",
    phone: "+94112345001", // [PLACEHOLDER]
    email: "colombo@lcm.lk", // [PLACEHOLDER]
    lat: 6.9897,
    lng: 79.8917,
    hours: "Mon - Sat: 8.00 AM - 6.00 PM",
    is_active: true,
  },
  {
    name: "LCM Kandy Service Centre",
    address: "No. 45, Katugastota Road, Kandy", // [PLACEHOLDER]
    district: "Kandy",
    phone: "+94812345002", // [PLACEHOLDER]
    email: "kandy@lcm.lk", // [PLACEHOLDER]
    lat: 7.2965,
    lng: 80.6314,
    hours: "Mon - Sat: 8.00 AM - 6.00 PM",
    is_active: true,
  },
  {
    name: "LCM Kurunegala Service Centre",
    address: "No. 78, Kandy Road, Kurunegala", // [PLACEHOLDER]
    district: "Kurunegala",
    phone: "+94372345003", // [PLACEHOLDER]
    email: "kurunegala@lcm.lk", // [PLACEHOLDER]
    lat: 7.4863,
    lng: 80.3623,
    hours: "Mon - Sat: 8.00 AM - 5.30 PM",
    is_active: true,
  },
  {
    name: "LCM Galle Service Centre",
    address: "No. 12, Matara Road, Galle", // [PLACEHOLDER]
    district: "Galle",
    phone: "+94912345004", // [PLACEHOLDER]
    email: "galle@lcm.lk", // [PLACEHOLDER]
    lat: 6.0535,
    lng: 80.221,
    hours: "Mon - Sat: 8.00 AM - 5.30 PM",
    is_active: true,
  },
];

async function main() {
  console.log("Seeding vehicle_categories...");
  const { data: categories, error: catErr } = await supabase
    .from("vehicle_categories")
    .upsert(CATEGORIES, { onConflict: "slug" })
    .select("id, slug");
  if (catErr) throw catErr;
  const categoryIdBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  console.log("Seeding branches...");
  const { error: branchErr } = await supabase
    .from("branches")
    .upsert(BRANCHES, { onConflict: "name" });
  if (branchErr) throw branchErr;

  console.log("Seeding vehicles...");
  const vehicleRows = VEHICLES.map(({ category, variants, ...v }) => ({
    ...v,
    category_id: categoryIdBySlug[category],
  }));
  const { data: vehicles, error: vehErr } = await supabase
    .from("vehicles")
    .upsert(vehicleRows, { onConflict: "slug" })
    .select("id, slug");
  if (vehErr) throw vehErr;
  const vehicleIdBySlug = Object.fromEntries(vehicles.map((v) => [v.slug, v.id]));

  console.log("Seeding vehicle_variants...");
  const variantRows = VEHICLES.flatMap((v) =>
    (v.variants || []).map((variant) => ({
      ...variant,
      vehicle_id: vehicleIdBySlug[v.slug],
    }))
  );
  if (variantRows.length) {
    const { error: variantErr } = await supabase
      .from("vehicle_variants")
      .upsert(variantRows, { onConflict: "vehicle_id,name" });
    if (variantErr) throw variantErr;
  }

  console.log(
    `Done. Seeded ${categories.length} categories, ${vehicles.length} vehicles, ${variantRows.length} variants, ${BRANCHES.length} branches.`
  );
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
