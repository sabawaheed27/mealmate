
import CategoryDetailClient from "@/components/CategoryDetailClient";
import { getMealsByCategory } from "@/utils/api";

// Define a specific type for the page props
interface CategoryDetailPageProps {
  params:Promise< { category: string }>; //It lets your page know which specific data to fetch or display based on the URL.
}; //Without params, your page wouldn’t know which category the user wants to see.



// The Page Component
export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { category } =await  params;
  const meals = await getMealsByCategory(category);

  return <CategoryDetailClient initialMeals={meals} category={category} />;
}


//encodeURIComponent(category): Makes sure special characters in the category name (like spaces) don’t break the URL.
//The reason for splitting into CategoryDetailPage (server) + CategoryDetailClient (client) is:
//Server Component does the fetching (secure, fast, cacheable).
//Client Component handles interactivity (like searching, filtering, updating state).