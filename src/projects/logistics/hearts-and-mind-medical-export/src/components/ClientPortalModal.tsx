import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Upload, 
  ArrowRight, 
  Search,
  Lock,
  Globe2,
  Ship,
  Plane,
  AlertCircle
} from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'buyer' | 'manufacturer';
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'buyer'
}) => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'manufacturer'>(defaultMode);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [productCategory, setProductCategory] = useState('PPE & Protective Gear');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b1b33] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600/30 border border-sky-400/40 flex items-center justify-center">
              <Lock className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Hearts and Mind Medical Export Client Portal
              </h2>
              <span className="text-xs text-slate-400">
                Institutional B2B Procurement & Manufacturer Verification Gateway
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3">
          <button
            onClick={() => {
              setActiveTab('buyer');
              setSubmitted(false);
            }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'buyer'
                ? 'border-[#0284c7] text-[#0284c7]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Institutional Buyer Portal</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('manufacturer');
              setSubmitted(false);
            }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'manufacturer'
                ? 'border-[#0284c7] text-[#0284c7]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Manufacturer Portal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!submitted ? (
            activeTab === 'buyer' ? (
              <div className="space-y-6">
                {/* Live Shipment Tracking Mini Dashboard */}
                <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                      Live Consignment Tracking Specimen
                    </span>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-sky-300 font-semibold text-slate-700">
                      POL: SHA → POD: MSY (New Orleans)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5">
                      <Ship className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800">4x 40ft HC Nitrile Exam Gloves</div>
                        <div className="text-[11px] text-slate-500">CPT Terms • In Transit • ETA: 4 Days</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5">
                      <Plane className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800">Air Express Rapid Antigen Kits</div>
                        <div className="text-[11px] text-slate-500">Pre-Cleared Customs • Dispatched</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Institutional Buyer Registration / Portal Access Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#0b1b33] mb-1">
                      Register Institutional Buyer Account
                    </h3>
                    <p className="text-xs text-slate-500">
                      Unlock access to tier-volume pricing matrices, direct factory inspections, and monthly recurring shipment schedules.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Institution / Healthcare System *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Regional Hospital Authority"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Country of Operation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., United States / Germany"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Procurement Officer Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Dr. Sarah Jenkins"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Official Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@healthcare.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Request Buyer Portal Credentials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              /* Manufacturer Verification Tab */
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-[#0b1b33] mb-1">
                    Manufacturer Verification Application
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Hearts and Mind Medical Export LLC connects certified medical production facilities with global hospital tenders. All applicants undergo our 5-tier audit before listing.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Manufacturing Facility Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex BioMedical Corp Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        FDA / CE Establishment Registration # *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FEI 3012984920 / CE-MDR-0123"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Primary Medical Product Line *
                      </label>
                      <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      >
                        <option>PPE & Protective Gear (Masks, Gloves, Gowns)</option>
                        <option>Sterile Medical Consumables & IV Sets</option>
                        <option>Surgical Instruments & Operating Room Kits</option>
                        <option>Diagnostics & Point-of-Care Rapid Tests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Monthly Production Capacity *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5,000,000 pcs / month"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Document Upload Box */}
                  <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-bold text-[#0b1b33] block">
                      Upload ISO 13485 Certificate, FDA 510(k), & CE MDR Audits
                    </span>
                    <span className="text-[10px] text-slate-500">
                      PDF, ZIP, or DOCX (Max 25MB). Confidential trade protection guaranteed.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0b1b33] hover:bg-[#122849] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Submit Manufacturer Verification Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )
          ) : (
            <div className="py-8 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1b33] mb-1">
                Application Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                Thank you, <strong>{companyName || 'Representative'}</strong>. Hearts and Mind Medical Export LLC compliance officers will review your documentation within 1-2 business days.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 max-w-sm mx-auto mb-6">
                Verification Reference: <strong className="font-mono text-[#0284c7]">HMM-PORTAL-{Math.floor(10000 + Math.random() * 90000)}</strong>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#0284c7] text-white font-bold text-xs rounded-lg hover:bg-[#0369a1] transition-colors"
              >
                Close Portal
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
