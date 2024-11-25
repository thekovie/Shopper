// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
//import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2.46.1";

const supabaseUrl = Deno.env.get("EXPO_PUBLIC_SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("EXPO_PUBLIC_SUPABASE_ANON_KEY") || "";
const supabaseServiceKey =
  Deno.env.get("EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
);

console.log("Hello from Functions!");

interface Notification {
  id: string;
  user_id: string;
  shopping_id: string;
  title: string;
  message: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Notification;
  schema: "public";
  old_record: null | Notification;
}

Deno.serve(async (req) => {
  console.log("HERE");
  console.log("supabaseUrl: ", supabaseUrl);
  console.log("supabaseAnonKey: ", supabaseAnonKey);
  const payload: WebhookPayload = await req.json();
  console.log("Received Payload:", payload);

  console.log("USER ID: " + payload.record.user_id);

  const { data, error } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .eq("id", payload.record.user_id)
    .limit(1);

  if (error) {
    console.error("ERROR: " + error.message);
  }

  if (data) {
    console.log("SUCCESS DATA RETRIEVED FORM SUPABASE");
    console.log(data);

    const res = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("EXPO_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify({
        "to": data[0]?.expo_push_token,
        "sound": "default",
        "title": payload.record.title,
        "body": payload.record.message,
      }),
    }).then((res) => res.json());

    return new Response(
      JSON.stringify(res),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response("ok");
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/push' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
