import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Property, Currency } from '../types';
import { CURRENCY_RATES } from '../data/estatesData';

interface InvestmentCalculatorProps {
  properties: Property[];
  currentCurrency: Currency;
  onOpenConsultation: () => void;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  properties,
  currentCurrency,
  onOpenConsultation,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || 'custom');
  const [customPrice, setCustomPrice] = useState<number>(12800000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(5.2);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [isCashAcquisition, setIsCashAcquisition] = useState<boolean>(false);

  const selectedProp = properties.find((p) => p.id === selectedPropertyId);
  const basePriceUSD = selectedProp ? selectedProp.price : customPrice;

  const rateInfo = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES['USD'];
  const basePrice = Math.round(basePriceUSD * rateInfo.rate);

  const downPaymentAmount = Math.round(basePrice * (downPaymentPercent / 100));
  const loanPrincipal = basePrice - downPaymentAmount;

  // Monthly mortgage calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const monthlyMortgage = isCashAcquisition
    ? 0
    : Math.round(
        (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
      );

  // Estimates for luxury carrying costs
  const monthlyPropertyTax = Math.round((basePrice * 0.009) / 12);
  const monthlyInsuranceAndConcierge = Math.round((basePrice * 0.006) / 12);
  const totalMonthlyCarryingCost = monthlyMortgage + monthlyPropertyTax + monthlyInsuranceAndConcierge;

  return (
    <section id="investment-calculator" className="py-24 bg-[#0c0d11] border-t border-[#1a1c24] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Explanatory & Controls */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                PORTFOLIO ADVISORY
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl md:text-5xl text-white font-normal tracking-tight">
              Estate Financing & Wealth Analysis
            </h2>
            <p className="text-sm md:text-base text-[#9aa1b0] font-light leading-relaxed">
              Model private bank financing, liquidity requirements, and luxury carrying metrics tailored to global family offices and international asset holders.
            </p>

            <div className="space-y-4 pt-3">
              {/* Select Estate or Custom */}
              <div>
                <label className="block text-xs font-medium text-[#c5c9d4] tracking-wider uppercase mb-1.5">
                  Select Estate Asset
                </label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full bg-[#151720] border border-[#272b38] rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a880] cursor-pointer"
                >
                  {properties.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.title} — {prop.location} (${(prop.price / 1000000).toFixed(1)}M)
                    </option>
                  ))}
                  <option value="custom">Custom Acquisition Amount</option>
                </select>
              </div>

              {selectedPropertyId === 'custom' && (
                <div>
                  <label className="block text-xs font-medium text-[#c5c9d4] tracking-wider uppercase mb-1.5">
                    Acquisition Price ({rateInfo.symbol})
                  </label>
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    step={500000}
                    className="w-full bg-[#151720] border border-[#272b38] rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              )}

              {/* Payment Mode Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#151720] border border-[#232733] rounded-md">
                <span className="text-xs text-[#c5c9d4] font-medium">All-Cash Liquidity Acquisition</span>
                <button
                  onClick={() => setIsCashAcquisition(!isCashAcquisition)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isCashAcquisition ? 'bg-[#c5a880]' : 'bg-[#2a2e3b]'
                  }`}
                >
                  <div
                    className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isCashAcquisition ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {!isCashAcquisition && (
                <>
                  {/* Down Payment Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-[#b0b6c5] mb-1.5">
                      <span>Equity Down Payment</span>
                      <span className="font-semibold text-white">
                        {downPaymentPercent}% ({rateInfo.symbol}{downPaymentAmount.toLocaleString()})
                      </span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={60}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#c5a880] cursor-pointer"
                    />
                  </div>

                  {/* Interest Rate & Term */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#9aa1b0] mb-1">Financing Rate (%)</label>
                      <input
                        type="number"
                        step={0.1}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full bg-[#151720] border border-[#272b38] rounded-md px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#9aa1b0] mb-1">Amortization Term</label>
                      <select
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="w-full bg-[#151720] border border-[#272b38] rounded-md px-3 py-2 text-sm text-white"
                      >
                        <option value={15}>15 Years</option>
                        <option value={20}>20 Years</option>
                        <option value={30}>30 Years</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Premium Interactive Ledger Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#13151c] rounded-xl border border-[#252936] p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#212430] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-[#c5a880]/15 text-[#d8b88a] rounded-lg">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                      Estimated Carrying Metrics
                    </h3>
                    <p className="text-xs text-[#7e8595]">Private Wealth Syndicate Model</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#c5a880] tracking-wider uppercase font-semibold">
                    Asset Total
                  </span>
                  <p className="text-xl font-serif-luxury text-white font-semibold">
                    {rateInfo.symbol}{basePrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Major Number: Monthly Total */}
              <div className="bg-[#0e1015] p-5 rounded-lg border border-[#1e222c] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-[#8f96a5] uppercase tracking-wider block">
                    Estimated Monthly Outlay
                  </span>
                  <p className="text-3xl md:text-4xl font-serif-luxury text-white font-medium mt-1 text-[#e8d5b5]">
                    {rateInfo.symbol}{totalMonthlyCarryingCost.toLocaleString()}
                    <span className="text-xs font-sans text-[#8f96a5] ml-1">/ month</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#d8b88a] bg-[#c5a880]/10 px-3 py-1.5 rounded border border-[#c5a880]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Private Banking Rate</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 divide-y divide-[#1e222c] text-xs">
                <div className="pt-2 flex justify-between text-[#c5c9d4]">
                  <span>Principal & Interest Debt Service</span>
                  <span className="font-semibold text-white">
                    {isCashAcquisition ? 'Fully Capitalized ($0)' : `${rateInfo.symbol}${monthlyMortgage.toLocaleString()} / mo`}
                  </span>
                </div>

                <div className="pt-3 flex justify-between text-[#c5c9d4]">
                  <span>Jurisdictional Property Tax (Est. 0.9% p.a.)</span>
                  <span className="font-semibold text-white">
                    {rateInfo.symbol}{monthlyPropertyTax.toLocaleString()} / mo
                  </span>
                </div>

                <div className="pt-3 flex justify-between text-[#c5c9d4]">
                  <span>Estate Insurance & Full Concierge Care</span>
                  <span className="font-semibold text-white">
                    {rateInfo.symbol}{monthlyInsuranceAndConcierge.toLocaleString()} / mo
                  </span>
                </div>

                <div className="pt-3 flex justify-between text-[#c5c9d4]">
                  <span>Initial Cash Commitment</span>
                  <span className="font-semibold text-[#d8b88a]">
                    {rateInfo.symbol}{(isCashAcquisition ? basePrice : downPaymentAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8b88a] text-black font-semibold text-xs tracking-[0.2em] rounded transition-all flex items-center justify-center space-x-2"
                >
                  <span>CONNECT WITH PRIVATE BANKING ADVISOR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
