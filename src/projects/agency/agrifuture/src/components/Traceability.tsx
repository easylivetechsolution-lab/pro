import React, { useState } from 'react';
import {
  Tag,
  MapPin,
  Leaf,
  ShieldCheck,
  Layers,
  Box,
  Globe,
  ArrowRight,
  QrCode,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
} from 'lucide-react';
import { TRACEABILITY_STEPS, SAMPLE_BATCHES } from '../data';
import { BatchRecord } from '../types';

interface TraceabilityProps {
  onInspectBatch: (batch: BatchRecord) => void;
  onQualityProcess: () => void;
}

export const Traceability: React.FC<TraceabilityProps> = ({
  onInspectBatch,
  onQualityProcess,
}) => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>('AF-24157');
  const [batchInput, setBatchInput] = useState<string>('');
  const [batchError, setBatchError] = useState<string>('');

  const currentBatch = SAMPLE_BATCHES[selectedBatchId] || SAMPLE_BATCHES['AF-24157'];

  const handleSearchBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = batchInput.trim().toUpperCase();
    if (!query) return;

    if (SAMPLE_BATCHES[query]) {
      setSelectedBatchId(query);
      setBatchError('');
    } else {
      setBatchError(`Batch "${query}" not found. Try sample codes: AF-24157, AF-99821, or AF-33104.`);
    }
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tag':
        return <Tag className="w-4 h-4 text-[#166534]" />;
      case 'MapPin':
        return <MapPin className="w-4 h-4 text-[#166534]" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-[#166534]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#166534]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#166534]" />;
      case 'Box':
        return <Box className="w-4 h-4 text-[#166534]" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-[#166534]" />;
      default:
        return <Tag className="w-4 h-4 text-[#166534]" />;
    }
  };

  return (
    <section id="traceability" className="py-20 lg:py-28 bg-[#f5f4ed] text-[#12281c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2
              id="traceability-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a2316] leading-tight font-serif"
            >
              A Clearer Path
              <br />
              From Farm to You
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#2a3c31] leading-relaxed font-normal">
              Transparency, quality and safety at every step. We empower our wholesale buyers
              and consumers with cryptographic verification from seedling to retail shelf.
            </p>
          </div>

          <div>
            <button
              id="quality-process-btn"
              onClick={onQualityProcess}
              className="px-6 py-3 rounded-full bg-[#0d281a] hover:bg-[#133827] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group whitespace-nowrap shadow-md"
            >
              <span>Our Quality Process</span>
              <ArrowRight className="w-4 h-4 text-[#c39953] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 7-Step Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 mb-14">
          {TRACEABILITY_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="p-4 rounded-2xl bg-white border border-[#22c55e]/20 shadow-sm flex flex-col items-center text-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-full bg-[#22c55e]/15 flex items-center justify-center mb-2">
                {getStepIcon(item.icon)}
              </div>
              <span className="text-sm font-bold text-[#0a2316]">{item.title}</span>
              <span className="text-xs text-[#526056] font-medium mt-1">{item.subtitle}</span>
              <span className="text-[11px] font-mono text-[#a8823d] font-bold mt-2.5">STEP {item.step}</span>
            </div>
          ))}
        </div>

        {/* Traceable & Trusted Interactive Passport Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Search & Demo Switcher */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a2316] font-serif">
              Instant Batch Verification Portal
            </h3>
            <p className="text-base sm:text-lg text-[#324538] leading-relaxed">
              Every shipment arrives sealed with a secure QR code. Scan or input any batch identifier
              to audit chemical residue assays, soil microbiology scores, and refrigerated transport logs.
            </p>

            <form onSubmit={handleSearchBatch} className="flex gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Batch ID (e.g. AF-24157)"
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#0d281a] hover:bg-[#133827] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Verify
              </button>
            </form>

            {batchError && (
              <p className="text-sm text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                {batchError}
              </p>
            )}

            {/* Quick Demo Batch Switchers */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-600 text-xs sm:text-sm font-medium">Sample Batches:</span>
              {Object.keys(SAMPLE_BATCHES).map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedBatchId(id);
                    setBatchError('');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-colors ${
                    selectedBatchId === id
                      ? 'bg-[#22c55e] text-white font-bold'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  #{id}
                </button>
              ))}
            </div>
          </div>

          {/* Right / Live Interactive Passport Preview Card */}
          <div className="lg:col-span-6">
            <div
              id="batch-preview-passport-card"
              onClick={() => onInspectBatch(currentBatch)}
              className="group p-6 rounded-3xl bg-white border border-[#22c55e]/30 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#22c55e] via-[#d8b06d] to-[#22c55e]" />

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* Product Photo */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#061910] shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80"
                    alt="Fresh Hass Avocado"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                    GRADE A+
                  </div>
                </div>

                {/* Batch Data Details */}
                <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-between">
                    <span className="text-xs font-mono font-bold text-[#166534] bg-[#22c55e]/15 px-2.5 py-1 rounded-md">
                      Batch #{currentBatch.batchId}
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                      Certified Pure
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-[#0a2316] font-serif">
                    {currentBatch.productName}
                  </h4>
                  <p className="text-sm text-[#3b4e42]">
                    <strong className="text-[#0a2316]">Origin:</strong> {currentBatch.estate}
                  </p>
                  <p className="text-sm text-[#3b4e42]">
                    <strong className="text-[#0a2316]">Harvested:</strong> {currentBatch.harvestDate}
                  </p>
                  <p className="text-sm text-[#3b4e42]">
                    <strong className="text-[#0a2316]">Quality Test:</strong> {currentBatch.brixLevel}
                  </p>
                </div>

                {/* QR Code & Verify Click */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f8fafc] border border-gray-200">
                  <QrCode className="w-12 h-12 text-[#0a2316]" />
                  <span className="text-[10px] font-mono font-bold text-[#166534] mt-1">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-sm text-[#4b584f]">
                <span>Click to view full Certificate of Analysis (COA)</span>
                <span className="font-semibold text-[#166534] flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                  Inspect Lab Report <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
