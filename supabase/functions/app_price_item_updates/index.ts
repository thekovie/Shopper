// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2.46.1";

const supabaseUrl = Deno.env.get("EXPO_PUBLIC_SUPABASE_URL") || "";
const supabaseServiceKey =
  Deno.env.get("EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
);

console.log("Hello from app_price_item_updates!");

export type PriceUpdate = {
  created_at: string; // ISO timestamp
  id: number;
  message: string;
  price: number;
  user_id: string;
  shopping_items: ShoppingItem;
  title: string;
  shopping_id: string;
};

export type ShoppingItem = {
  id: string; // UUID
  is_purchased: boolean;
  item_categories: ItemCategory | null; // Nullable if no category exists
  notes: string | null; // Nullable if no notes
  price: number | null; // Nullable if no price is set
  priority: string | null; // Nullable if no priority
  product_link: string | null; // Nullable if no link
  product_title: string;
  shopping_platform: string | null; // Nullable if no platform
};

export type ItemCategory = {
  id: string; // UUID
  category_name: string;
};

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: PriceUpdate;
  schema: "public";
  old_record: null | PriceUpdate;
}

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  console.log("Received Payload:", payload);
  console.log("USER ID: " + payload.record.user_id);
  console.log("ITEM ID: " + payload.record.shopping_id);

  const { data, error } = await supabase
    .from("shopping_items")
    .update({ price: payload.record.price })
    .eq("id", payload.record.shopping_id)
    .eq("user_id", payload.record.user_id)
    .select();

  if (error) {
    console.error("ERROR: " + error.message);
    return new Response("update error");
  }

  if (data) {
    console.log("SUCCESS DATA RETRIEVED FORM SUPABASE");
    console.log(data);
    return new Response("ok");
  }

  return new Response("error");
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/app_price_item_updates' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
