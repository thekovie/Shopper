import { supabase } from "@/lib/supabase";
import { ItemCategoryRow } from "@/lib/supabase/types";

export async function addCategory(newCategory: string, userId: string): Promise<ItemCategoryRow | null> {
    try{
      const { data, error } = await supabase
        .from('item_categories')
        .insert({ category_name: newCategory, user_id: userId })
        .select();

      if(error){
        console.error("Error adding category:", error.message);
        return null;
      }

      console.log("New Category Added:", data[0]);

      if (data && data.length > 0) {
        console.log("New Category Added:", data[0]);
        return data[0];
      }

      return null;

    }catch(error){
      console.log("Unexpected error while adding category:", error);
      return null;
    }
  };
