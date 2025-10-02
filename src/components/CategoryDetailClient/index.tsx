
"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { MealSummary, Meal } from "@/utils/type";
import { getMealById } from "@/utils/api"; 
import BackButton from "@/components/BackButton";

interface CategoryDetailClientProps {
  initialMeals: MealSummary[];
  category: string;
}

export default function CategoryDetailClient({
  initialMeals,
  category,
}: CategoryDetailClientProps) {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [savedMeals, setSavedMeals] = useState<string[]>([]);
  const { user, setUser } = userContext || {};

  const toggleFavorite = useCallback(
    async (mealSummary: MealSummary) => {
      if (!user || !setUser) return;

      const isSaved = user.favouriteRecipes.some(
        (r) => r.idMeal === mealSummary.idMeal
      );

      setSavedMeals((prev) =>
        isSaved
          ? prev.filter((id) => id !== mealSummary.idMeal)
          : [...prev, mealSummary.idMeal]
      );

      if (isSaved) {
        const updatedFavorites = user.favouriteRecipes.filter(
          (r) => r.idMeal !== mealSummary.idMeal
        );
        setUser({ ...user, favouriteRecipes: updatedFavorites });
      } else {
        const fullMeal: Meal | null = await getMealById(mealSummary.idMeal);
        if (fullMeal) {
          setUser({
            ...user,
            favouriteRecipes: [...user.favouriteRecipes, fullMeal],
          });
        }
      }
    },
    [user, setUser]
  );

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (user.favouriteRecipes) {
      setSavedMeals(user.favouriteRecipes.map((r) => r.idMeal));
    }
  }, [user, router]);

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-gray-900 min-h-screen text-gray-100">
      {!user ? null : initialMeals.length === 0 ? (
        <div className="text-center p-10 text-gray-200">
          <BackButton />
          <h1 className="text-3xl font-bold mb-2 text-pink-400">
            No Meals Found in {decodeURIComponent(category)}
          </h1>
          <p className="text-gray-400">Try selecting a different category.</p>
          <Link
            href="/"
            className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <BackButton />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Meals in{" "}
            <span className="text-teal-400">{decodeURIComponent(category)}</span>
          </h1>
          <p className="text-gray-400 mb-8">
            Browse the delicious meals in this category.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {initialMeals.map((m) => {
              const isSaved = savedMeals.includes(m.idMeal);
              return (
                <div
                  key={m.idMeal}
                  className="relative group bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-teal-500/40"
                >
                  <Link href={`/item/${m.idMeal}`}>
                    <Image
                      src={m.strMealThumb}
                      alt={m.strMeal}
                      width={400}
                      height={300}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                      <p className="font-semibold text-gray-100 truncate line-clamp-2 group-hover:text-teal-400 transition-colors duration-300">
                        {m.strMeal}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(m)}
                    className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white font-semibold text-sm shadow-md transition-colors ${
                      isSaved
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "bg-teal-500 hover:bg-teal-600"
                    }`}
                  >
                    {isSaved ? "Saved" : "Fav"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

