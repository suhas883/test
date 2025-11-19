// functions/api/track.js

export async function onRequestPost(context) {
  try {
    const { trackingNumber, courier } = await context.request.json();
    
    if (!trackingNumber) {
      return new Response(JSON.stringify({ 
        error: 'Tracking number is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, return a simple response (no API key needed)
    return new Response(JSON.stringify({
      success: true,
      trackingNumber: trackingNumber,
      courier: courier || 'Auto-detect',
      status: 'API endpoint working! Ready for tracking integration.',
      message: 'Replace this with real tracking API call'
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Request failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
