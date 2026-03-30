import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { model, messages, temperature, max_tokens } = await req.json()
    const apiKey = Deno.env.get('OPENROUTER_API_KEY')

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set')
      return new Response(
        JSON.stringify({ error: 'API key configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://sahedalomsumit.com',
        'X-Title': 'Sahed Portfolio Bot',
      },
      body: JSON.stringify({
        model: model || 'stepfun/step-3.5-flash:free',
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 500,
        stream: true,
      }),
    })

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      status: response.status,
    })

  } catch (error) {
    console.error('Error in openrouter-chat function:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})


