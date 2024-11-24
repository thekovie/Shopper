import { supabase } from "@/lib/supabase";
import { ItemCategoryRow } from "@/constants/types";
import z from "zod";
import { addProductInformationSchema } from "@/utils/forms/add-product-link";

import { ShoppingItemInsert } from "@/constants/types";

export async function addShoppingItem(values: z.infer<typeof addProductInformationSchema>, userId: string): Promise<ShoppingItemInsert | null> {
    try{
        // TODO: Add category properly
      const { data, error } = await supabase
        .from('shopping_items')
        .insert({
             user_id: userId,
             product_title: values.productName,
             product_link: values.productLink || "",
             shopping_platform: values.shoppingPlatform,
             price: values.price,
             category_id: values.category || null,
             notes: values.notes || "",
             priority: values.priority
        })
        .select();

      if(error){
        console.error("Error adding shopping item:", error.message);
        return null;
      }


      if (data && data.length > 0) {
        console.log("New Shopping Item:", data[0]);
        return data[0];
      }

      return null;

    }catch(error){
      console.log("Unexpected error while adding shopping item:", error);
      return null;
    }
  };
