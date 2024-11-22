import { supabase } from "@/lib/supabase";
import { ItemCategoryRow } from "@/constants/types";

export async function deleteCategory(categoryId: string): Promise<ItemCategoryRow | null> {

    try{
        const { data, error } = await supabase
        .from('item_categories')
        .delete()
        .eq('id', categoryId)
        .select();

        if(error){
            console.error("Error deleting category:", error.message);
            return null;
        }

        //console.log("Category Modified:", data[0]);

        if (data && data.length > 0) {
            console.log("Category deleted:", data[0]);
            return data[0];
        }

        return null;

    }catch(error){
        console.log("Unexpected error while adding category:", error);
        return null;
    }

}