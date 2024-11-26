import { Database } from "@/lib/supabase/types";

export interface ListShoppingItemProps {
    itemName: string;
    itemPrice: number;
    itemPriority: string;
    itemPlatform: string;
    itemCategory: string;
    isMarkedAsPurchased: boolean;
    itemNotes?: string;
}

export interface RecentFindsProps {
    data: ListShoppingItemProps[];
}

// Categories
export type ItemCategoryRow =
    Database["public"]["Tables"]["item_categories"]["Row"];
export type ItemCategoryInsert =
    Database["public"]["Tables"]["item_categories"]["Insert"];

// Shopping Items
export type ShoppingItemRow =
    Database["public"]["Tables"]["shopping_items"]["Row"];
export type ShoppingItemInsert =
    Database["public"]["Tables"]["shopping_items"]["Insert"];

// Extend ShoppingItemRow to include category_name
export type ExtendedShoppingItemRow = ShoppingItemRow & {
    category_name: string;
};

// Extend ShoppingItemRow to include category_name
export type ExtendedShoppingItemInsert = ShoppingItemInsert & {
    category_name: string;
};

// Item Price Updates
export type ItemPriceUpdateRow =
    Database["public"]["Tables"]["price_updates"]["Row"];
export type ItemPriceUpdateInsert =
    Database["public"]["Tables"]["price_updates"]["Insert"];

export type PriceUpdate = {
    created_at: string; // ISO timestamp
    id: number;
    message: string;
    user_id: string;
    price: number;
    shopping_items: ShoppingItem;
    title: string;
};

export type ShoppingItem = {
    id: string; // UUID
    is_purchased: boolean;
    item_categories: ItemCategory | null; // Nullable if no category exists
    notes: string | null; // Nullable if no notes
    price: number | null; // Nullable if no price is set
    priority: string | null; // Nullable if no priority
    product_link: string | null; // Nullable if no link
    product_title: string;
    shopping_platform: string | null; // Nullable if no platform
};

export type ItemCategory = {
    id: string; // UUID
    category_name: string;
};
