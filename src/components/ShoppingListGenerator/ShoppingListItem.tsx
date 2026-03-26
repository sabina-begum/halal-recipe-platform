import { useDarkMode } from "@/contexts/DarkModeContext";
interface ShoppingItem {
  ingredient: string;
  quantity: string;
  unit: string;
  category: string;
  recipes: string[];
  checked: boolean;
  isCustom: boolean;
}

interface ShoppingListItemProps {
  item: ShoppingItem;
  onRemove: () => void;
  onToggle: () => void;
}

export default function ShoppingListItem({
  item,
  onRemove,
  onToggle,
}: ShoppingListItemProps) {
  const { darkMode } = useDarkMode()!;
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
        darkMode
          ? `bg-neutral-800 border-neutral-600 text-white ${
              item.checked ? "border-stone-600 bg-stone-900" : ""
            }`
          : `bg-white border-gray-200 text-gray-900 ${
              item.checked ? "border-stone-200 bg-stone-50" : ""
            }`
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={onToggle}
          className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          aria-label={`Mark ${item.ingredient} as ${item.checked ? "unpurchased" : "purchased"}`}
        />
        <div className="flex-1">
          <span
            className={`font-medium ${
              item.checked
                ? darkMode
                  ? "line-through text-stone-400"
                  : "line-through text-gray-600"
                : ""
            }`}
          >
            {item.ingredient}
          </span>
          <span
            className={`text-sm ml-2 ${
              darkMode ? "text-stone-300" : "text-gray-600"
            }`}
          >
            {item.quantity} {item.unit}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={`ml-2 px-2 py-1 text-xs rounded ${
          darkMode
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        Remove
      </button>
    </div>
  );
}
