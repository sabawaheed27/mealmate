import { getMealById } from "@/utils/api";
import ItemDetailClient from "@/components/ItemDetailClient";

interface ItemPageProps {
  params: Promise< { id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params; 
  const meal = await getMealById(id);
  return !meal ? (
    <div className="text-center p-10">
      <p className="text-lg text-gray-400">Recipe not found.</p>
    </div>
  ) : (
    <ItemDetailClient meal={meal} />
  );
}
