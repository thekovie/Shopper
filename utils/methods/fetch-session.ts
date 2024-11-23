import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export const fetchSession = async (): Promise<Session | null> => {
    try{
        const { data, error } = await supabase.auth.getSession();

        if(error){
            console.error("Error fetching session: " + error);
            return null;
        }

        return data?.session ?? null;

    }catch(error){
        console.error("Error fetching session: " + error);
        return null;
    }
}

