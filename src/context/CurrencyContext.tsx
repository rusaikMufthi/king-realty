'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'LKR',
  setCurrency: () => {}
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('LKR');

  useEffect(() => {
    const saved = localStorage.getItem('kr_currency') as CurrencyCode;
    if (saved && ['LKR', 'USD', 'AUD', 'GBP'].includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem('kr_currency', c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
