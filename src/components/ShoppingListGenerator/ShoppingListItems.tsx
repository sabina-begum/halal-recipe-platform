import ShoppingListItem from "./ShoppingListItem";

interface ShoppingItem {
  ingredient: string;
  quantity: string;
  unit: string;
  category: string;
  recipes: string[];
  checked: boolean;
  isCustom: boolean;
}

interface ShoppingListItemsProps {
  items: ShoppingItem[];
  onRemoveItem: (index: number) => void;
  onToggleChecked: (index: number) => void;
}

export default function ShoppingListItems({
  items,
  onRemoveItem,
  onToggleChecked,
}: ShoppingListItemsProps) {
  return (
    <div className="space-y-2">
      {items.map((item: ShoppingItem, idx: number) => (
        <ShoppingListItem
          key={idx}
          item={item}
          onRemove={() => onRemoveItem(idx)}
          onToggle={() => onToggleChecked(idx)}
        />
      ))}
    </div>
  );
}
