import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PUT, OPTIONS",
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

    const body = await req.json();

    if (!body.id) {
      return new Response(
        JSON.stringify({ error: "Missing required field: id" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { id, ...updateData } = body;

    const updateFields: any = {};
    if (updateData.name !== undefined) updateFields.name = updateData.name;
    if (updateData.slug !== undefined) updateFields.slug = updateData.slug;
    if (updateData.sku !== undefined) updateFields.sku = updateData.sku || null;
    if (updateData.category !== undefined) updateFields.category = updateData.category;
    if (updateData.description !== undefined) updateFields.description = updateData.description || null;
    if (updateData.specs !== undefined) updateFields.specs = updateData.specs || {};
    if (updateData.sizes !== undefined) updateFields.sizes = updateData.sizes || [];
    if (updateData.price !== undefined) updateFields.price = updateData.price ? parseFloat(updateData.price) : null;
    if (updateData.is_price_visible !== undefined) updateFields.is_price_visible = updateData.is_price_visible;
    if (updateData.featured !== undefined) updateFields.featured = updateData.featured;
    if (updateData.images !== undefined) updateFields.images = updateData.images || [];
    if (updateData.brochure_path !== undefined) updateFields.brochure_path = updateData.brochure_path || null;

    updateFields.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("products")
      .update(updateFields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});