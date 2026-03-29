// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { contents, system_instruction, generationConfig, model } = await req.json();
    // @ts-ignore
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    // Priority: Request Body > Supabase Secret > Default
    // @ts-ignore
    const GEMINI_MODEL = model || Deno.env.get("GEMINI_MODEL") || "gemini-1.5-flash";

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        system_instruction,
        generationConfig: generationConfig || {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return new Response(JSON.stringify({ 
        error: data.error?.message || "Unknown Gemini API error",
        details: data.error
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: response.status,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Function Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
