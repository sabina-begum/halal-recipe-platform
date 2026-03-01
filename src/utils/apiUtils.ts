// API data extraction utilities

import type { Recipe } from "@/types/global";

/**
 * Extracts ingredients from a recipe API response object.
 * @param recipe Recipe object
 * @returns {string[]}
 */
export function extractIngredientsFromRecipe(recipe: Recipe): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (typeof ingredient === "string" && ingredient.trim()) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}
