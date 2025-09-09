"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserContext } from "@/context/UserContext";
import { Heart } from "lucide-react";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({
  initialCategories, //comes from server page(CategoryPage)
}: CategoriesClientProps) {
  const userContext = useContext(UserContext);//gives access to the global user state

  if (!userContext) {
    return null; 
  }
  const { user, setUser } = userContext; //user contains things like favouriteCategory: string[]

  const toggleFavCategory = (catName: string) => {
    if (!user || !setUser) return;

    const isFavourite = user.favouriteCategory.includes(catName);
    const updatedCategories = isFavourite
      ? user.favouriteCategory.filter((c) => c !== catName)
      : [...user.favouriteCategory, catName];

    setUser({ ...user, favouriteCategory: updatedCategories });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Categories</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {initialCategories.map((cat) => {
          const isSaved = user?.favouriteCategory.includes(cat.strCategory);
          return (
            <motion.div
              key={cat.idCategory}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col justify-between bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-teal-500/40 transition-all duration-300">
              <Link href={`/categories/${cat.strCategory}`} className="block">
                
                <Image //clicking the image goes to /categories/[category]
                //that route is handled by your CategoryDetailPage
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  width={400}
                  height={200}
                  className="w-full h-48 sm:h-52 object-cover"/>
              </Link>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg text-teal-300 truncate">
                    {cat.strCategory}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {cat.strCategoryDescription}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center gap-2">
                  <Link
                    href={`/categories/${cat.strCategory}`}
                    className="flex-1 bg-teal-600 hover:bg-teal-500 text-white px-3 py-2 rounded-md text-center font-semibold transition-all duration-300">
                    Explore
                  </Link>
                  <button //navigates to category detail page
                    onClick={() => toggleFavCategory(cat.strCategory)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md font-semibold transition-all duration-300 ${
                      isSaved
                        ? "bg-pink-500 text-white hover:bg-pink-600"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}>
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        isSaved ? "fill-current text-pink-500" : "text-gray-400"
                      }`}
                    />
                    {isSaved ? "Saved" : "Fav"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
