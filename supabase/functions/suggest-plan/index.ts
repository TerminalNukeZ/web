import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requirements, planType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!requirements || !planType) {
      return new Response(
        JSON.stringify({ error: "Missing requirements or planType" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const planData = {
      minecraft: [
        { name: "Furious – Grass", price: "₹45", ram: "2GB", cpu: "1 vCore", storage: "12GB" },
        { name: "Furious – Wood", price: "₹90", ram: "4GB", cpu: "2 vCores", storage: "24GB" },
        { name: "Furious – Stone", price: "₹180", ram: "6GB", cpu: "3 vCores", storage: "36GB" },
        { name: "Furious – Coal", price: "₹300", ram: "8GB", cpu: "4 vCores", storage: "48GB" },
        { name: "Furious – Iron", price: "₹420", ram: "12GB", cpu: "5 vCores", storage: "60GB" },
        { name: "Furious – Diamond", price: "₹600", ram: "16GB", cpu: "6 vCores", storage: "72GB" },
        { name: "Furious – Netherite", price: "₹900", ram: "24GB", cpu: "7 vCores", storage: "96GB" },
      ],
      discord: [
        { name: "Starter", price: "₹10", ram: "256MB", cpu: "50%", storage: "512MB" },
        { name: "Basic", price: "₹45", ram: "512MB", cpu: "75%", storage: "1024MB" },
        { name: "Standard", price: "₹90", ram: "1024MB", cpu: "100%", storage: "2048MB" },
        { name: "Advanced", price: "₹170", ram: "2048MB", cpu: "150%", storage: "4096MB" },
        { name: "Developer", price: "₹260", ram: "4096MB", cpu: "200%", storage: "8192MB" },
      ],
      vps: [
        { name: "Intel 16GB", price: "₹629", ram: "16GB", cpu: "6 Cores", disk: "100GB" },
        { name: "Intel 32GB", price: "₹1199", ram: "32GB", cpu: "12 Cores", disk: "200GB" },
        { name: "Intel 48GB", price: "₹1699", ram: "48GB", cpu: "18 Cores", disk: "300GB" },
        { name: "Intel 64GB", price: "₹2299", ram: "64GB", cpu: "26 Cores", disk: "400GB" },
      ],
    };

    const plans = planData[planType as keyof typeof planData];

    const systemPrompt = `You are a hosting expert helping customers choose the right ${planType} hosting plan. 
Based on the customer's requirements, analyze their needs and recommend the most suitable plan from the available options.

Available plans:
${JSON.stringify(plans, null, 2)}

Provide a clear, concise recommendation that:
1. Identifies the best matching plan by name
2. Explains why this plan fits their needs
3. Mentions key specs that align with their requirements
4. Suggests if they might need to upgrade in the future based on growth potential

Keep the response friendly, professional, and under 200 words.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: requirements },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI recommendation");
    }

    const data = await response.json();
    const recommendation = data.choices?.[0]?.message?.content || "Unable to generate recommendation";

    return new Response(
      JSON.stringify({ recommendation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("suggest-plan error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
