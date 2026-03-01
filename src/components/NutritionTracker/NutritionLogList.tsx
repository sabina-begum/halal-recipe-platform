import React from "react";
import NutritionLogItem from "./NutritionLogItem";
import type { Meal } from "@/types/global";

interface NutritionLogListProps {
  meals: Meal[];
  onRemoveMeal: (mealId: number) => void;
}

const NutritionLogList: React.FC<NutritionLogListProps> = ({
  meals,
  onRemoveMeal,
}) => {
  if (!meals.length) return null;
  return (
    <div className="mb-4">
      {meals.map((meal, idx) => (
        <NutritionLogItem
          key={meal.id ?? idx}
          meal={meal}
          onRemove={() => onRemoveMeal(meal.id ?? idx)}
        />
      ))}
    </div>
  );
};

export default NutritionLogList;
