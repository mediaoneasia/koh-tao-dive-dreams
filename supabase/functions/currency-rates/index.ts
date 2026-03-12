// Supabase Edge Function: currency-rates
// Fetches latest THB to USD/EUR rates from exchangerate.host
import { serve } from 'std/server';

serve(async (req) => {
  const apiUrl = 'https://api.exchangerate.host/latest?base=THB&symbols=USD,EUR';
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch rates' }), { status: 500 });
    }
    const data = await res.json();
    return new Response(JSON.stringify({
      rates: data.rates,
      date: data.date,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Exception fetching rates' }), { status: 500 });
  }
});
