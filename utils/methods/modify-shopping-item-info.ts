import { supabase } from "@/lib/supabase";
import { ItemCategoryRow, ShoppingItemRow } from "@/constants/types";
import { z } from "zod";
import { addProductInformationSchema } from "@/utils/forms/add-product-link";

export async function modifyShoppingItemInfo(values: z.infer<typeof addProductInformationSchema>, itemId: string): Promise<ShoppingItemRow | null> {

    try{
        const { data, error } = await supabase
        .from('shopping_items')
        .update({ 
            product_title: values.productName,
            product_link: values.productLink,
            shopping_platform: values.shoppingPlatform,
            price: values.price,
            category_id: values.category,
            notes: values.notes,
            priority: values.priority
        })
        .eq('id', itemId)
        .select();

        if(error){
            console.error("Error modifying shopping item info:", error.message);
            return null;
        }


        if (data && data.length > 0) {
            console.log("Shopping Item Info Modified:", data[0]);
            return data[0];
        }

        return null;

    }catch(error){
        console.log("Unexpected error while modifyig shopping item info:", error);
        return null;
    }

}