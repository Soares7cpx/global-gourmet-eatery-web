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
    const { message, history } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `Você é o assistente virtual do Mundo Gastronômico, um restaurante de culinária internacional em São Paulo. Seja simpático, prestativo e conciso.

Informações do restaurante:
- Nome: Mundo Gastronômico
- Especialidade: Culinária internacional com ingredientes frescos e técnicas de todo o mundo
- Localização: São Paulo, SP
- Horário: Terça a Domingo, 12h às 23h. Fechado às segundas.
- Reservas: Disponíveis pelo site ou WhatsApp
- Pedidos online: Disponíveis para entrega e retirada
- Aulas de culinária: Oferecemos aulas de culinária internacional
- Eventos privados: Aceitamos reservas para eventos e festas

Você pode ajudar com:
- Informações sobre o cardápio e pratos
- Horários de funcionamento
- Como fazer reservas
- Pedidos online
- Aulas de culinária
- Eventos privados
- Localização e como chegar

Responda sempre em português brasileiro. Seja breve (máximo 3-4 frases por resposta). Se não souber algo específico, sugira que o cliente entre em contato pelo WhatsApp ou visite o site.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: message },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua mensagem.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao processar mensagem" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
