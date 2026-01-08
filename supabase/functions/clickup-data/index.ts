import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, listId, accessToken } = await req.json();

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: 'Access token is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let url = '';
    
    switch (action) {
      case 'getTeams':
        url = 'https://api.clickup.com/api/v2/team';
        break;
      case 'getSpaces':
        const { teamId } = await req.json();
        url = `https://api.clickup.com/api/v2/team/${teamId}/space`;
        break;
      case 'getFolders':
        const { spaceId } = await req.json();
        url = `https://api.clickup.com/api/v2/space/${spaceId}/folder`;
        break;
      case 'getLists':
        const { folderId } = await req.json();
        url = `https://api.clickup.com/api/v2/folder/${folderId}/list`;
        break;
      case 'getTasks':
        if (!listId) {
          return new Response(
            JSON.stringify({ error: 'List ID is required for getTasks' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        url = `https://api.clickup.com/api/v2/list/${listId}/task?include_closed=true&subtasks=true`;
        break;
      case 'getGoals':
        const { team_id } = await req.json();
        url = `https://api.clickup.com/api/v2/team/${team_id}/goal`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ClickUp API Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `ClickUp API error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
