
import { Category, Meal, MealSummary } from "./type";

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch meals for category: ${category}`);
    }

    const data: { meals: MealSummary[] | null } = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch meals by category:", error);
    return [];
  }
}

export async function getMealById(id: string): Promise<Meal | null> {
  if (!id || Array.isArray(id)) return null;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Failed to fetch meal:", error);
    return null;
  }
}
