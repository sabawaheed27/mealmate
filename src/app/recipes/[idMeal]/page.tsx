
import { getMealById } from "@/utils/api";
import ItemDetailClient from "@/components/ItemDetailClient";

interface RecipePageProps {
  params: { idMeal: string };
}

export default async function RecipePage(props: RecipePageProps) {
  const { idMeal } = props.params;
  const meal = await getMealById(idMeal);

  if (!meal) {
    return (
      <div className="text-center p-10">
        <p className="text-lg text-gray-400">Recipe not found.</p>
      </div>
    );
  }
  return <ItemDetailClient meal={meal} />;
}
