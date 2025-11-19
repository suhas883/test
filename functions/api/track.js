// functions/api/track.js

export async function onRequestPost(context) {
  try {
    const { trackingNumber, courier } = await context.request.json();
    
    if (!trackingNumber) {
      return new Response(JSON.stringify({ error: 'Tracking number is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call Perplexity AI API
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'user',
          content: `Track this package: ${trackingNumber}${courier ? ` with ${courier}` : ''}. Provide current status, location, and estimated delivery.`
        }]
      })
    });

    const data = await perplexityResponse.json();
    
    return new Response(JSON.stringify({
      success: true,
      tracking: data.choices[0].message.content,
      citations: data.citations || []
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Tracking failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
