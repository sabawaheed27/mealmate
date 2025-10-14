
import { Category, Meal, MealSummary } from "./type";

async function fetchData<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok for url: ${url}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchData<{ categories: Category[] }>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  return data?.categories || [];
}

export async function getMealsByCategory(
  category: string
): Promise<MealSummary[]> {
  const data = await fetchData<{ meals: MealSummary[] | null }>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      category
    )}`,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  return data?.meals || [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  if (!id || Array.isArray(id)) return null;

  const data = await fetchData<{ meals: Meal[] | null }>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  return data?.meals ? data.meals[0] : null;
}
