
export type Category = {
  idCategory: string;
  strCategory: string; 
  strCategoryThumb: string; 
  strCategoryDescription: string; // Added: typical category property
};

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

// Define the full Meal type, as used in favouriteRecipes
export type Meal = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  // Ingredients and Measures (up to 20)
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

export interface UserType {
  name: string;
  password: string;
  favouriteCategory: string[];   // supports multiple categories
  favouriteRecipes: Meal[];      // store full meal objects
}

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logout: () => void;  
}
