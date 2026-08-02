'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/lib/currency';
import { Calculator, Percent, DollarSign } from 'lucide-react';

interface MortgageCalcProps {
  propertyPriceLKR: number;
}

export const MortgageCalc: React.FC<MortgageCalcProps> = ({ propertyPriceLKR }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(12); // ~12% typical SL commercial bank rate
  const [tenureYears, setTenureYears] = useState<number>(20);

  const downPaymentLKR = (propertyPriceLKR * downPaymentPercent) / 100;
  const loanPrincipalLKR = propertyPriceLKR - downPaymentLKR;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyInstallment =
    monthlyRate > 0
      ? (loanPrincipalLKR * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipalLKR / totalMonths;

  return (
    <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-5">
      <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 pb-3">
        <Calculator className="w-5 h-5 text-[#D4AF37]" />
        <h3 className="text-lg font-bold text-slate-100 font-serif">
          Sri Lanka Mortgage & Financing Estimator
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Down Payment % */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            Down Payment ({downPaymentPercent}%)
          </label>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
          <div className="text-slate-400 mt-1 font-semibold">
            {formatPrice(downPaymentLKR, 'LKR', true)}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            Bank Interest Rate ({interestRate}% p.a.)
          </label>
          <input
            type="range"
            min={8}
            max={18}
            step={0.5}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
          <div className="text-slate-400 mt-1 font-semibold">
            Commercial Bank Preset ({interestRate}%)
          </div>
        </div>

        {/* Loan Tenure */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            Loan Tenure ({tenureYears} Years)
          </label>
          <input
            type="range"
            min={5}
            max={25}
            step={5}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
          <div className="text-slate-400 mt-1 font-semibold">
            {tenureYears * 12} Monthly Payments
          </div>
        </div>
      </div>

      {/* Result Display Card */}
      <div className="bg-[#18181B] border border-[#D4AF37]/30 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs text-slate-400 uppercase font-medium tracking-wider">
            Estimated Monthly Installment
          </span>
          <div className="text-2xl font-bold gold-gradient-text mt-0.5">
            {formatPrice(monthlyInstallment, 'LKR')} / mo
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Principal Loan Amount: {formatPrice(loanPrincipalLKR, 'LKR', true)}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-3 py-1.5 rounded-lg border border-[#D4AF37]/20 block">
            Partnered with Commercial Bank & HNB Advisory
          </span>
        </div>
      </div>
    </div>
  );
};
