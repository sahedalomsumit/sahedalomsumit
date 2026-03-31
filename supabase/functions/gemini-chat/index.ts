import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Fixed Model ID for 2.5 Flash Lite
const GEMINI_MODEL = "gemini-2.5-flash-lite";

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, temperature, max_tokens } = await req.json()
    const geminiKey = Deno.env.get('GEMINI_API_KEY')

    if (!geminiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key is missing' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log(`Calling Gemini API (${GEMINI_MODEL})...`)
    
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const systemMessage = messages.find((m: any) => m.role === 'system')
    const contents = geminiMessages.filter((m: any) => m.role !== 'system')
    const systemInstruction = systemMessage ? { parts: [{ text: systemMessage.content }] } : undefined

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: temperature || 0.7,
            maxOutputTokens: max_tokens || 500,
          }
        })
      }
    )

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Gemini Error:`, errText);
      return new Response(
        JSON.stringify({ error: `Gemini API Error: ${errText}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
      )
    }

    const reader = response.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }
        try {
          let buffer = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            
            // The Gemini stream is a JSON array. We need to extract the objects within it.
            // This loop looks for complete JSON objects by tracking braces.
            let braceCount = 0;
            let startIndex = -1;
            
            for (let i = 0; i < buffer.length; i++) {
              if (buffer[i] === '{') {
                if (braceCount === 0) startIndex = i;
                braceCount++;
              } else if (buffer[i] === '}') {
                braceCount--;
                if (braceCount === 0 && startIndex !== -1) {
                  const chunkStr = buffer.substring(startIndex, i + 1);
                  try {
                    const chunk = JSON.parse(chunkStr);
                    const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    if (text) {
                      const sseData = `data: ${JSON.stringify({
                        choices: [{ delta: { content: text } }]
                      })}\n\n`;
                      controller.enqueue(encoder.encode(sseData));
                    }
                  } catch (e) {
                    // Not a complete or valid candidates object, ignore
                  }
                  // Remove the processed part from the buffer
                  buffer = buffer.substring(i + 1);
                  i = -1; // Reset loop
                  startIndex = -1;
                }
              }
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (e) {
          controller.error(e);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' }
    });

  } catch (error) {
    console.error('Error in gemini-chat function:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
