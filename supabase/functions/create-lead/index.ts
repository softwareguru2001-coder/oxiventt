import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { name, email, phone, company, message, product_id, product_name, source, selected_size, city, quantity } = await req.json();

    if (source === "whatsapp") {
      if (!product_id && !product_name) {
        return new Response(
          JSON.stringify({ error: "Product information is required for WhatsApp leads" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else if (source === "quote_form") {
      if (!phone) {
        return new Response(
          JSON.stringify({ error: "Mobile number is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      if (!name || !email || !phone) {
        return new Response(
          JSON.stringify({ error: "Name, email, and phone are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    let leadMessage = message || '';

    if (selected_size) {
      leadMessage = leadMessage ? `${leadMessage} - Selected Size: ${selected_size}` : `Selected Size: ${selected_size}`;
    }

    if (quantity) {
      leadMessage = leadMessage ? `${leadMessage} - Quantity: ${quantity}` : `Quantity: ${quantity}`;
    }

    const leadType = source === "brochure_download" ? "brochure" :
                     source === "whatsapp" ? "whatsapp" : "quote";

    const { data, error } = await supabase
      .from("leads")
      .insert({
        type: leadType,
        name: name || null,
        email: email || null,
        mobile: phone || null,
        company: company || null,
        city: city || null,
        message: leadMessage || null,
        product_id: product_id || null,
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
