import CategoriesClient from "@/components/CategoryClient";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

async function getCategories(): Promise<Category[]> {
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

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesClient initialCategories={categories} />;
}
