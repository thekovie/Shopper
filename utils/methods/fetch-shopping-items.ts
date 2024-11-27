import { ShoppingItemRow } from "@/constants/types";
import { supabase } from "@/lib/supabase";

export async function fetchShoppingItems(categoryId: string): Promise<ShoppingItemRow[] | null>{
    const { data: shoppingItems, error: shoppingItemsError } = await supabase
        .from('shopping_items')
        .select()
        .eq('category_id', categoryId)
        .order('price', { ascending: true });
    
        if(shoppingItemsError){
            console.error("Error fetching shopping items:", shoppingItemsError.message);
            return null;
        }

        if(shoppingItems){
            return shoppingItems;
        }

        return null;
}