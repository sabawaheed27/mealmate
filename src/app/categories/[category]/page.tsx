import CategoryDetailClient from "@/components/CategoryDetailClient";
import { MealSummary } from "@/utils/type";

//  Fetch meals by category from TheMealDB
async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  try {
    // Add revalidation to cache the data for an hour
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch meals for category: ${category}`);
    }

    // Add type for the API response
    const data: { meals: MealSummary[] | null } = await response.json();
    return data.meals || []; //it's fall back to array
  } catch (error) {
    console.error("Failed to fetch meals by category:", error);
    return []; //this function always returns a clean MealSummary[] array, no matter what.
  }
}

// Define a specific type for the page props
type CategoryDetailPageProps = {
  params: { category: string }; //It lets your page know which specific data to fetch or display based on the URL.
}; //Without params, your page wouldn’t know which category the user wants to see.



// The Page Component
export default async function CategoryDetailPage({params,}: CategoryDetailPageProps) {
  const meals = await getMealsByCategory(params.category);

  return (
    <CategoryDetailClient
      initialMeals={meals}
      category={params.category} />
  );
}


//encodeURIComponent(category): Makes sure special characters in the category name (like spaces) don’t break the URL.
//The reason for splitting into CategoryDetailPage (server) + CategoryDetailClient (client) is:
//Server Component does the fetching (secure, fast, cacheable).
//Client Component handles interactivity (like searching, filtering, updating state).