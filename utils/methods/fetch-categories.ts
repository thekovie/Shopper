import { supabase } from "@/lib/supabase";

export const fetchCategories = async (sessionUserId: string): Promise<string[] | null> => {
    const { data: categories, error: categoryError } = await supabase
        .from('item_categories')
        .select()
        .eq('user_id', sessionUserId)

        if(categoryError){
          console.error("Error fetching categories:", categoryError.message);
          return null;
        }

        if(categories){
            return categories.map((category) => category.category_name);
        }

        return null;
}