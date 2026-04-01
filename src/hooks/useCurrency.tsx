import React, { createContext, useContext, useEffect, useState } from 'react';

const SUPPORTED_CURRENCIES = ['THB', 'USD', 'EUR'] as const;
export type Currency = typeof SUPPORTED_CURRENCIES[number];

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRates: { [key: string]: number };
  convertCurrency: (amount: number | null | undefined, from?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('THB');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({ THB: 1, USD: 1, EUR: 1 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Hardcoded app_id for debugging
        const res = await fetch('https://openexchangerates.org/api/latest.json?app_id=563cc6ace29a406bb2ebcae222e61786&symbols=THB,USD,EUR');
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRates({
            THB: data.rates.THB || 1,
            USD: data.rates.USD || 1,
            EUR: data.rates.EUR || 1,
          });
        }
      } catch {
        // fallback: keep default rates
      }
    };
    fetchRates();
  }, []);

  const convertCurrency = (amount: number | null | undefined, from: string = 'THB') => {
    if (!amount || !exchangeRates[from] || !exchangeRates[currency]) return '-';
    const thbAmount = from === 'THB' ? amount : (amount / exchangeRates[from]) * exchangeRates['THB'];
    const converted = (thbAmount / exchangeRates['THB']) * exchangeRates[currency];
    const symbol = currency === 'THB' ? '฿' : currency === 'USD' ? '$' : '€';
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates, convertCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
};

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex justify-end items-center p-4">
      <label htmlFor="currency-select" className="mr-2 font-medium">Currency:</label>
      <select
        id="currency-select"
        value={currency}
        onChange={e => setCurrency(e.target.value as Currency)}
        className="border rounded px-2 py-1"
      >
        {SUPPORTED_CURRENCIES.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
    </div>
  );
};
