import { Database } from "@/lib/supabase/types";

export interface ListShoppingItemProps {
    itemName: string;
    itemPrice: number;
    itemPriority: string;
    itemPlatform: string;
    itemCategory: string;
    isMarkedAsPurchased: boolean
    itemNotes?: string;
}

export interface RecentFindsProps{
    data: ListShoppingItemProps[]
}

// Categories
export type ItemCategoryRow = Database["public"]["Tables"]["item_categories"]["Row"];
export type ItemCategoryInsert = Database["public"]["Tables"]["item_categories"]["Insert"];

// Shopping Items
export type ShoppingItemRow = Database["public"]["Tables"]["shopping_items"]["Row"];
export type ShoppingItemInsert = Database["public"]["Tables"]["shopping_items"]["Insert"];

// Extend ShoppingItemRow to include category_name
export type ExtendedShoppingItemRow = ShoppingItemRow & {
    category_name: string;
};

// Extend ShoppingItemRow to include category_name
export type ExtendedShoppingItemInsert = ShoppingItemInsert & {
    category_name: string;
};

