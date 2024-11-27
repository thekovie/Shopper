import { supabase } from "@/lib/supabase";
import { ItemCategoryRow, ShoppingItemRow } from "@/constants/types";

export async function deleteShoppingItem(itemId: string): Promise<ShoppingItemRow | null> {

    try{
        const { data, error } = await supabase
        .from('shopping_items')
        .delete()
        .eq('id', itemId)
        .select();

        if(error){
            console.error("Error deleting shopping item:", error.message);
            return null;
        }

        if (data && data.length > 0) {
            console.log("Shopping item deleted:", data[0]);
            return data[0];
        }

        return null;

    }catch(error){
        console.log("Unexpected error while deleting shopping item:", error);
        return null;
    }

}