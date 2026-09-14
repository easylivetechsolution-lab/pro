import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  FolderLock, 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Calendar, 
  ExternalLink,
  Lock,
  Printer
} from 'lucide-react';
import { VAULT_DOCUMENTS } from '../data/mockData';
import type { VaultDoc } from '../types';

interface DocumentVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentVaultModal: React.FC<DocumentVaultModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingDoc, setInspectingDoc] = useState<VaultDoc | null>(null);

  if (!isOpen) return null;

  const categories = ['all', 'FDA', 'CE', 'ISO', 'MSDS', 'Trade'];

  const filteredDocs = VAULT_DOCUMENTS.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDownload = (doc: VaultDoc) => {
    // Generate simulated download
    const blob = new Blob([
      `HEARTS AND MIND MEDICAL EXPORT LLC - COMPLIANCE VERIFICATION\n` +
      `Document: ${doc.title}\n` +
      `Verification Code: ${doc.code}\n` +
      `Issuer: ${doc.issuer}\n` +
      `Date of Validation: ${doc.date}\n` +
      `Status: ${doc.status}\n\n` +
      `Official Summary:\n${doc.summary}\n\n` +
      `Hearts & Mind Medical Export LLC • New Orleans, LA • International Trade Logistics`
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.code}_Verification.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b1b33] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400/40 flex items-center justify-center">
              <FolderLock className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Hearts and Mind Document Vault
              </h2>
              <span className="text-xs text-slate-400">
                Official Regulatory Files, FDA Clearances & CPT Trade Terms
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

        {/* Search & Category Filter */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by certificate code, regulation, or standard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0284c7] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Document List / Inspection Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {inspectingDoc ? (
            /* Document Preview Inspection */
            <div className="space-y-6">
              <button
                onClick={() => setInspectingDoc(null)}
                className="text-xs font-semibold text-[#0284c7] hover:underline flex items-center gap-1"
              >
                ← Back to Document Directory
              </button>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-[#0284c7] text-xs font-bold">
                        {inspectingDoc.category} Regulatory
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        {inspectingDoc.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1b33]">
                      {inspectingDoc.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDownload(inspectingDoc)}
                      className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Copy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Validating Body:</span>
                    <strong className="text-slate-800">{inspectingDoc.issuer}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Date of Issue:</span>
                    <strong className="text-slate-800">{inspectingDoc.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Digital Size:</span>
                    <strong className="text-slate-800">{inspectingDoc.fileSize}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Audit Status:</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {inspectingDoc.status}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-xs font-bold text-[#0b1b33] uppercase tracking-wider mb-2">
                    Scope of Certification & Summary:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                    {inspectingDoc.summary}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Document Cards List */
            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 bg-white hover:bg-slate-50/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-sky-50 text-[#0284c7] shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#0b1b33]">
                          {doc.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-3">
                        <span>Code: <strong className="text-slate-700 font-mono">{doc.code}</strong></span>
                        <span>•</span>
                        <span>Issuer: {doc.issuer}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => setInspectingDoc(doc)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-1.5 bg-sky-50 hover:bg-sky-100 text-[#0284c7] rounded-lg transition-colors"
                      title="Download document summary"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit encrypted institutional compliance archive</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors"
          >
            Close Vault
          </button>
        </div>
      </motion.div>
    </div>
  );
};
