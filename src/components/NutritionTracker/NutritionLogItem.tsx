import { useDarkMode } from "@/contexts/DarkModeContext";
import React from "react";
import { Meal } from "@/types/global";

interface NutritionLogItemProps {
  meal: Meal;
  onRemove: () => void;
}

const NutritionLogItem: React.FC<NutritionLogItemProps> = ({
  meal,
  onRemove,
}) => {
  const { darkMode } = useDarkMode()!;
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg border mb-2 ${
        darkMode
          ? "bg-stone-800 border-stone-600 text-stone-200"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <div>
        <div className="font-semibold">{meal.name}</div>
        <div
          className={`text-xs mb-1 ${
            darkMode ? "text-stone-300" : "text-gray-600"
          }`}
        >
          {meal.ingredients}
        </div>
        <div className="text-sm">
          {meal.calories} kcal | {meal.protein}g protein | {meal.carbs}g carbs |{" "}
          {meal.fat}g fat
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={`text-sm ml-2 underline-offset-2 hover:underline ${
          darkMode
            ? "text-red-400 hover:text-red-300"
            : "text-red-700 hover:text-red-800"
        }`}
      >
        Remove
      </button>
    </div>
  );
};

export default NutritionLogItem;

