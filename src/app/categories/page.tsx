
import CategoriesClient from "@/components/CategoryClient";
import { getCategories } from "@/utils/api"; 


export default async function CategoriesPage() {

  const categories = await getCategories();
  return <CategoriesClient initialCategories={categories} />;
}