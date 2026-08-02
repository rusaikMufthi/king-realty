export type CurrencyCode = 'LKR' | 'USD' | 'AUD' | 'GBP';

export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  LKR: 1,
  USD: 0.0033,  // 1 LKR = ~0.0033 USD (1 USD = ~300 LKR)
  AUD: 0.0051,  // 1 LKR = ~0.0051 AUD
  GBP: 0.0026   // 1 LKR = ~0.0026 GBP
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  LKR: 'LKR',
  USD: '$',
  AUD: 'A$',
  GBP: '£'
};

export function formatPrice(amountLKR: number, currency: CurrencyCode = 'LKR', compact: boolean = false): string {
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = amountLKR * rate;
  const symbol = CURRENCY_SYMBOLS[currency];

  if (currency === 'LKR') {
    if (compact) {
      if (amountLKR >= 1000000000) {
        return `LKR ${(amountLKR / 1000000000).toFixed(2)} Bn`;
      }
      if (amountLKR >= 1000000) {
        return `LKR ${(amountLKR / 1000000).toFixed(1)} Mn`;
      }
    }
    return `LKR ${amountLKR.toLocaleString('en-LK')}`;
  }

  // Foreign currencies
  if (compact) {
    if (converted >= 1000000) {
      return `${symbol}${(converted / 1000000).toFixed(2)}M`;
    }
    if (converted >= 1000) {
      return `${symbol}${(converted / 1000).toFixed(0)}K`;
    }
  }

  return `${symbol}${Math.round(converted).toLocaleString('en-US')}`;
}
