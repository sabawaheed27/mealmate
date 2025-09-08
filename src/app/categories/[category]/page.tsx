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
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch meals by category:", error);
    return [];
  }
}

// Define a specific type for the page props
type CategoryDetailPageProps = {
  params: { category: string }; //It lets your page know which specific data to fetch or display based on the URL.
}; //Without params, your page wouldn’t know which category the user wants to see.

// Page component for category details
export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { category } = params;

  const meals = await getMealsByCategory(category);

  return (
    <CategoryDetailClient
      initialMeals={meals}
      category={category} />
  );
}
