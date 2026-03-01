import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import type { Recipe, NutritionData } from "../types/global";
import LoadingSpinner from "./LoadingSpinner";
import HomePage from "../features/recipes/Home";
import AZRecipesPage from "../features/recipes/AZRecipesPage";
import UserProfile from "./UserProfile";
import Favorites from "./Favorites";
import UserRecipeSubmission from "./UserRecipeSubmission";
import Login from "../features/Auth/Login";
import Signup from "../features/Auth/Signup";
import MealPlanningCalendar from "./MealPlanningCalendar";
import ShoppingListGenerator from "./ShoppingListGenerator";
import AdvancedSearch from "./AdvancedSearch";
import RecipeCollections from "./RecipeCollections";
import NutritionTracker from "./NutritionTracker";
import About from "./About";
import AIFeaturesPage from "../pages/AIFeaturesPage";
import IngredientInventory from "./IngredientInventory";
import SeasonalIngredients from "./SeasonalIngredients";
import SmartNotifications from "./SmartNotifications";
import AdvancedAnalytics from "./AdvancedAnalytics";
import RecipeDetailsSection from "../features/recipes/RecipeDetailsSection";
import CategoriesPage from "../pages/CategoriesPage";
import RecommendationsPage from "../pages/RecommendationsPage";

interface MainRoutesProps {
  selected: Recipe | null;
  nutritionData: NutritionData | null;
  loading: boolean;
  error: string | null;
  nutritionLoading: boolean;
}

export default function MainRoutes({
  selected,
  nutritionData,
  loading,
  error,
  nutritionLoading,
}: MainRoutesProps) {
  const routes: { path: string; element: React.ReactNode }[] = [
    {
      path: "/",
      element: (
        <HomePage
          selected={selected}
          nutritionData={nutritionData}
          loading={loading}
          error={error}
          nutritionLoading={nutritionLoading}
        />
      ),
    },
    {
      path: "/recipe/:id",
      element: (
        <RecipeDetailsSection
          selected={selected}
          nutritionData={nutritionData}
          nutritionLoading={nutritionLoading}
        />
      ),
    },
    { path: "/recipes", element: <AZRecipesPage /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/favorites", element: <Favorites /> },
    {
      path: "/submit-recipe",
      element: <UserRecipeSubmission />,
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/meal-planning",
      element: <MealPlanningCalendar />,
    },
    {
      path: "/shopping-list",
      element: <ShoppingListGenerator />,
    },
    {
      path: "/advanced-search",
      element: <AdvancedSearch onSearch={() => {}} />,
    },
    {
      path: "/collections",
      element: <RecipeCollections />,
    },
    {
      path: "/nutrition-tracker",
      element: <NutritionTracker />,
    },
    { path: "/about", element: <About /> },
    {
      path: "/ai-features",
      element: <AIFeaturesPage onSearch={() => {}} />,
    },
    {
      path: "/ingredient-inventory",
      element: <IngredientInventory />,
    },
    {
      path: "/seasonal-ingredients",
      element: <SeasonalIngredients />,
    },
    {
      path: "/notifications",
      element: <SmartNotifications />,
    },
    {
      path: "/analytics",
      element: <AdvancedAnalytics />,
    },
    {
      path: "/categories",
      element: <CategoriesPage />,
    },
    {
      path: "/recommendations",
      element: <RecommendationsPage />,
    },
    { path: "*", element: <div>404 - Page Not Found</div> },
  ];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
}
