import { ExtendedShoppingItemInsert } from "@/constants/types";
import { supabase } from "@/lib/supabase";
import { startOfDay, subDays, format } from "date-fns";

const todayStart = format(startOfDay(new Date()), "yyyy-MM-dd HH:mm:ss");
const yesterdayStart = format(startOfDay(subDays(new Date(), 1)), "yyyy-MM-dd HH:mm:ss");

export async function getRecentShoppingItems(userId: string, numberOfItems: number): Promise<ExtendedShoppingItemInsert[] | null>{
    const { data, error } = await supabase
        .from('shopping_items')
        .select(`*, item_categories(category_name)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(numberOfItems);

        if(error){
          console.error("Error fetching recent shopping items:", error.message);
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

export async function getTodayShoppingItems(userId: string, numberofItems: number): Promise<ExtendedShoppingItemInsert[] | null>{
    const { data, error } = await supabase
        .from('shopping_items')
        .select(`*, item_categories(category_name)`)
        .eq('user_id', userId)
        .gte('created_at', todayStart)
        .order('created_at', { ascending: false })
        .limit(numberofItems);

        if(error){
          console.error("Error fetching recent shopping items:", error.message);
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



export async function getYesterdayShoppingItems(userId: string, numberofItems: number): Promise<ExtendedShoppingItemInsert[] | null>{
    const { data, error } = await supabase
        .from('shopping_items')
        .select(`*, item_categories(category_name)`)
        .eq('user_id', userId)
        .gte('created_at', yesterdayStart)
        .lt('created_at', todayStart)
        .order('created_at', { ascending: false })
        .limit(numberofItems);

        if(error){
          console.error("Error fetching recent shopping items:", error.message);
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

export async function getFewDaysAgoShoppingItems(userId: string, numberofItems: number): Promise<ExtendedShoppingItemInsert[] | null>{

    const { data, error } = await supabase
        .from('shopping_items')
        .select(`*, item_categories(category_name)`)
        .eq('user_id', userId)
        .lt('created_at', yesterdayStart)
        .order('created_at', { ascending: false })
        .limit(numberofItems);

        if(error){
          console.error("Error fetching recent shopping items:", error.message);
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


