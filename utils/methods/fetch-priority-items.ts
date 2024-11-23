import { supabase } from "@/lib/supabase";
import { ExtendedShoppingItemInsert } from "@/constants/types";

export const getPriorityItems = async (sessionUserId: string, priority: string): Promise<ExtendedShoppingItemInsert[] | null> => {
    const { data, error } = await supabase
        .from('shopping_items')
        .select(`*, item_categories(category_name)`)
        .eq('user_id', sessionUserId)
        .eq('priority', priority)
        .order('created_at', { ascending: true })

        if(error){
          console.error("Error fetching priority items:", error.message);
          return null;
        }

        if(data){
            return data.map((item) => ({
                ...item,
                category_name: item.item_categories?.category_name || "Unknown Category",
            })) as ExtendedShoppingItemInsert[];
        }

        return null;
}