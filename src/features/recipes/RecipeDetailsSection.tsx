import { useDarkMode } from "@/contexts/DarkModeContext";
import { useEffect } from "react";
import type { Recipe, NutritionData } from "../../types/global";
import { cleanInstruction, isMeaningfulStep } from "../../utils/textFormatters";
import FoodCategory from "../../components/FoodCategory";
import Ingredients from "../../components/Ingredients";
import Instructions from "../../components/Instructions";
import Nutrition from "../../components/Nutrition";
import RecipeDifficulty from "../../components/RecipeDifficulty";
import CookingVideos from "../../components/CookingVideos";
import RecipeScaling from "../../components/RecipeScaling";
import RecipeRating from "../../components/RecipeRating";
import LeftoverIntegration from "../../components/LeftoverIntegration";
import RecipeReviews from "../../components/RecipeReviews";
import StepByStepMode from "../../components/StepByStepMode";

interface RecipeDetailsSectionProps {
  selected: Recipe | null;
  nutritionData: NutritionData | null;
  nutritionLoading: boolean;
}

export default function RecipeDetailsSection({
  selected,
  nutritionData,
  nutritionLoading,
}: RecipeDetailsSectionProps) {
  const { darkMode } = useDarkMode()!;
  useEffect(() => {
    if (selected) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selected?.idMeal]);

  if (!selected)
    return (
      <h2
        className={`text-center font-bold text-xl sm:text-2xl leading-tight ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        No recipe found
      </h2>
    );
  const sectionClass = "py-6 sm:py-8 first:pt-6 last:pb-6";
  const sectionInner = "px-4 sm:px-6 max-w-4xl mx-auto";

  return (
    <div
      className={`font-sans compact-card overflow-hidden relative ${
        darkMode
          ? "bg-black border-gray-700"
          : "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-orange-200"
      }`}
    >
      {/* Recipe title */}
      <header
        className={`${sectionClass} ${sectionInner} ${
          darkMode ? "bg-black text-stone-200" : "bg-white text-gray-800"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold break-words tracking-tight">
          {selected.strMeal}
        </h1>
        <FoodCategory category={selected.strCategory} />
      </header>

      <section className={sectionClass} aria-label="Ingredients">
        <div className={sectionInner}>
          <Ingredients recipe={selected} />
        </div>
      </section>

      <section className={sectionClass} aria-label="Method">
        <div className={sectionInner}>
          <Instructions
            instructions={selected.strInstructions}
          />
        </div>
      </section>

      <section className={sectionClass} aria-label="Step by step">
        <div className={sectionInner}>
          <StepByStepMode
            steps={
              selected.strInstructions
                ? selected.strInstructions
                    .split(/\r?\n/)
                    .map(cleanInstruction)
                    .filter(isMeaningfulStep)
                : []
            }
          />
        </div>
      </section>

      <section className={sectionClass} aria-label="Nutrition">
        <div className={sectionInner}>
          <Nutrition
            nutrition={nutritionData || {}}
            loading={nutritionLoading}
          />
        </div>
      </section>

      <section className={sectionClass} aria-label="Difficulty and tools">
        <div className={`${sectionInner} space-y-8`}>
          <RecipeDifficulty recipe={selected} />
          <CookingVideos recipe={selected} />
          <RecipeScaling recipe={selected} />
        </div>
      </section>

      <section className={sectionClass} aria-label="Rating">
        <div className={sectionInner}>
          <RecipeRating
            recipeId={selected.idMeal}
            recipeName={selected.strMeal}
          />
        </div>
      </section>

      <section className={sectionClass} aria-label="Leftover ideas">
        <div className={sectionInner}>
          <LeftoverIntegration recipe={selected} />
        </div>
      </section>

      <section className={sectionClass} aria-label="Reviews">
        <div className={sectionInner}>
          <RecipeReviews
            recipeId={selected.idMeal}
            recipeName={selected.strMeal}
          />
        </div>
      </section>
    </div>
  );
}
