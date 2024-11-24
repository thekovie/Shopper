import { supabase } from "@/lib/supabase";
import { ItemCategoryRow, ItemCategoryInsert } from "@/constants/types";

export const fetchTotalItems = async (sessionUserId: string): Promise<number | null> => {
    const { data, error } = await supabase
        .from('shopping_items')
        .select('*')
        .eq('user_id', sessionUserId)

        if(error){
          console.error("Error fetching categories:", error.message);
          return null;
        }

        if(data){
            return data.length;
        }

        return null;
}