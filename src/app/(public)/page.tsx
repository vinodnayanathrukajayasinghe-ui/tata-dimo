import { HomePageContent } from "@/components/home/HomePageContent";
import { getCategories, getFeaturedVehicles } from "@/lib/data";

export default async function HomePage() {
  const [categories, featuredVehicles] = await Promise.all([getCategories(), getFeaturedVehicles(6)]);
  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

  return <HomePageContent categories={categories} featuredVehicles={featuredVehicles} categoryById={categoryById} />;
}
