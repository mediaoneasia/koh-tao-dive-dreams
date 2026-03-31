// Utility to fetch live exchange rates (THB to USD, EUR) from exchangerate.host
// Usage: const rates = await getExchangeRates(); rates.USD, rates.EUR

export type ExchangeRates = {
  USD: number;
  EUR: number;
};


export async function getExchangeRates(): Promise<ExchangeRates> {
  // Fetch latest rates with base THB from exchangerate.host
  const url = 'https://api.exchangerate.host/latest?base=THB&symbols=USD,EUR';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exchange rates');
  const data = await res.json();
  console.log('exchangerate.host API response:', data);
  if (!data.rates || typeof data.rates.USD !== 'number' || typeof data.rates.EUR !== 'number') {
    throw new Error('exchangerate.host API response missing USD or EUR rates');
  }
  return {
    USD: data.rates.USD, // 1 THB in USD
    EUR: data.rates.EUR, // 1 THB in EUR
  };
}
