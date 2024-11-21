import { supabase } from "@/lib/supabase";
import { ItemCategoryRow, ItemCategoryInsert } from "@/lib/supabase/types";

export const fetchCategories = async (sessionUserId: string): Promise<ItemCategoryRow[] | null> => {
    const { data: categories, error: categoryError } = await supabase
        .from('item_categories')
        .select()
        .eq('user_id', sessionUserId)

        if(categoryError){
          console.error("Error fetching categories:", categoryError.message);
          return null;
        }

        if(categories){
            return categories;
        }

        return null;
}