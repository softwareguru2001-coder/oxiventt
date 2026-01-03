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

    const body = await req.json();

    if (!body.mobile) {
      return new Response(
        JSON.stringify({ error: "Missing required field: mobile" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!body.brochure_path && !body.brochure_url) {
      return new Response(
        JSON.stringify({ error: "Missing required field: brochure_path or brochure_url" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const mobileRegex = /^\d{10,15}$/;
    const cleanMobile = body.mobile.replace(/\D/g, '');
    if (!mobileRegex.test(cleanMobile)) {
      return new Response(
        JSON.stringify({ error: "Invalid mobile number format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email format" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    const leadData = {
      type: "brochure" as const,
      name: body.name || null,
      company: body.company || null,
      mobile: cleanMobile,
      email: body.email || null,
      city: body.city || null,
      message: "Downloaded brochure",
      product_id: body.product_id || null,
      utm: body.utm || null,
    };

    const { error: leadError } = await supabase
      .from("leads")
      .insert(leadData);

    if (leadError) {
      console.error("Lead insertion error:", leadError);
    }

    let brochurePath = body.brochure_path;

    if (!brochurePath && body.brochure_url) {
      const urlParts = body.brochure_url.split('/brochures/');
      if (urlParts.length > 1) {
        brochurePath = urlParts[1];
      }
    }

    if (!brochurePath) {
      return new Response(
        JSON.stringify({ error: "Invalid brochure path or URL format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: signedData, error: signedError } = await supabase
      .storage
      .from("brochures")
      .createSignedUrl(brochurePath, 3600);

    if (signedError || !signedData) {
      console.error("Signed URL error:", signedError);
      return new Response(
        JSON.stringify({ error: "Failed to generate download link" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        url: signedData.signedUrl,
        message: "Brochure download link generated successfully"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});