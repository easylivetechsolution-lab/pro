import React from 'react';
import { 
  Lock, 
  FileText, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  FolderLock
} from 'lucide-react';

interface DocumentVaultSectionProps {
  onOpenVault: () => void;
}

export const DocumentVaultSection: React.FC<DocumentVaultSectionProps> = ({ onOpenVault }) => {
  return (
    <section className="bg-[#0b1b33] text-white py-10 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left: Vault Title & CTA matching screenshot */}
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950">
              <FolderLock className="w-7 h-7 text-cyan-400" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Document Vault
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-0.5">
                Securely access product spec sheets, certificates and compliance documents.
              </p>
            </div>

            <div className="hidden sm:block ml-4">
              <button
                onClick={onOpenVault}
                className="py-2.5 px-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
              >
                <span>Access Document Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: 4 Vault Categories with separating divider lines matching Hero/Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-700/70 border-y sm:border-y-0 sm:border-l border-slate-700/70 pt-2 sm:pt-0">
            <div 
              onClick={onOpenVault}
              className="flex flex-col items-center text-center p-3 sm:px-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <FileText className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-white">Product Specs</span>
              <span className="text-[10px] text-slate-400">& Data Sheets</span>
            </div>

            <div 
              onClick={onOpenVault}
              className="flex flex-col items-center text-center p-3 sm:px-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <Award className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-white">Certificates</span>
              <span className="text-[10px] text-slate-400">(FDA, CE, ISO)</span>
            </div>

            <div 
              onClick={onOpenVault}
              className="flex flex-col items-center text-center p-3 sm:px-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-white">Compliance Docs</span>
              <span className="text-[10px] text-slate-400">& MSDS Safety</span>
            </div>

            <div 
              onClick={onOpenVault}
              className="flex flex-col items-center text-center p-3 sm:px-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <Lock className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-white">Secure Access</span>
              <span className="text-[10px] text-slate-400">256-Bit Encrypted</span>
            </div>
          </div>

          <div className="sm:hidden">
            <button
              onClick={onOpenVault}
              className="w-full py-2.5 px-4 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2"
            >
              <span>Access Document Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
