import { ExtendedShoppingItemInsert, ShoppingItemRow } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export async function getShoppingItemInfo(itemId: string): Promise<ExtendedShoppingItemInsert | null>{
    const { data: shoppingItem, error: shoppingItemsError } = await supabase
        .from('shopping_items')
        .select(`*, item_categories(category_name)`)
        .eq('id', itemId)
        .single();
    
        if(shoppingItemsError){
            console.error("Error fetching shopping items:", shoppingItemsError.message);
            return null;
        }

        if(shoppingItem){
            return {
                ...shoppingItem,
                category_name: shoppingItem.item_categories?.category_name || "Unknown Category",
            } as ExtendedShoppingItemInsert;
        }

        return null;
}