import { supabase } from "@/lib/supabase";
import { PriceUpdate } from "@/constants/types";
import { format, startOfDay, subDays } from "date-fns";

const todayStart = format(startOfDay(new Date()), "yyyy-MM-dd HH:mm:ss");
const yesterdayStart = format(
    startOfDay(subDays(new Date(), 1)),
    "yyyy-MM-dd HH:mm:ss",
);

export const getItemPriceUpdates = async (
    sessionUserId: string,
): Promise<PriceUpdate[] | null> => {
    const { data, error } = await supabase
        .from("price_updates")
        .select(`
        id,
        created_at,
        message,
        price,
        title,
        shopping_items:shopping_id (
            id,
            product_title,
            product_link,
            price,
            is_purchased,
            shopping_platform,
            notes,
            priority,
            item_categories:category_id (
                id,
                category_name
            )
        )
    `)
        .eq("user_id", sessionUserId);

    if (error) {
        console.error(
            "Error fetching item price updates items:",
            error.message,
        );
        return null;
    }

    if (data) {
        console.log("DATA FROM TS");
        console.log(data);
        return data as unknown as PriceUpdate[];
    }

    return null;
};

export async function getTodayItemPriceUpdates(
    sessionUserId: string,
    numberOfItems: number,
): Promise<PriceUpdate[] | null> {
    const { data, error } = await supabase
        .from("price_updates")
        .select(`
            id,
            created_at,
            message,
            price,
            title,
            shopping_items:shopping_id (
                id,
                product_title,
                product_link,
                price,
                is_purchased,
                shopping_platform,
                notes,
                priority,
                item_categories:category_id (
                    id,
                    category_name
                )
            )
        `)
        .gte("created_at", todayStart)
        .order("created_at", { ascending: false })
        .limit(numberOfItems);

    if (error) {
        console.error(
            "Error fetching recent item price updates:",
            error.message,
        );
        return null;
    }

    if (data) {
        console.log("DATA FROM TS");
        console.log(data);
        return data as unknown as PriceUpdate[];
    }

    return null;
}

export async function getYesterdayItemPriceUpdates(
    sessionUserId: string,
    numberOfItems: number,
): Promise<PriceUpdate[] | null> {
    const { data, error } = await supabase
        .from("price_updates")
        .select(`
            id,
            created_at,
            message,
            price,
            title,
            shopping_items:shopping_id (
                id,
                product_title,
                product_link,
                price,
                is_purchased,
                shopping_platform,
                notes,
                priority,
                item_categories:category_id (
                    id,
                    category_name
                )
            )
        `)
        .eq("user_id", sessionUserId)
        .gte("created_at", yesterdayStart)
        .lt("created_at", todayStart)
        .order("created_at", { ascending: false })
        .limit(numberOfItems);

    if (error) {
        console.error(
            "Error fetching recent item price updates:",
            error.message,
        );
        return null;
    }

    if (data) {
        return data as unknown as PriceUpdate[];
    }

    return null;
}

export async function getFewDaysAgoItemPriceUpdates(
    sessionUserId: string,
    numberOfItems: number,
): Promise<PriceUpdate[] | null> {
    const { data, error } = await supabase
        .from("price_updates")
        .select(`
            id,
            created_at,
            message,
            price,
            title,
            shopping_items:shopping_id (
                id,
                product_title,
                product_link,
                price,
                is_purchased,
                shopping_platform,
                notes,
                priority,
                item_categories:category_id (
                    id,
                    category_name
                )
            )
        `)
        .eq("user_id", sessionUserId)
        .lt("created_at", yesterdayStart)
        .order("created_at", { ascending: false })
        .limit(numberOfItems);

    if (error) {
        console.error(
            "Error fetching recent item price updates:",
            error.message,
        );
        return null;
    }

    if (data) {
        return data as unknown as PriceUpdate[];
    }

    return null;
}
