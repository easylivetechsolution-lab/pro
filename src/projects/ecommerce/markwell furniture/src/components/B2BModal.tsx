import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Check, 
  Send, 
  ShieldCheck, 
  FileText, 
  Users, 
  PhoneCall
} from 'lucide-react';

interface B2BModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BModal: React.FC<B2BModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    teamSize: '25-50 people',
    projectScope: 'Full Office Fitout',
    budgetRange: '$25,000 - $50,000',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#12151c] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#e29d52]/20 border border-[#e29d52] flex items-center justify-center text-[#f3ba77] mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Partnership Request Received!
            </h3>
            <p className="text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
              Thank you for trusting MarkWell, <strong>{formData.contactName || 'Valued Partner'}</strong>. A senior enterprise account executive has been assigned to <strong>{formData.companyName || 'your team'}</strong> and will follow up with custom volume tiering and 3D CAD space planning within 4 business hours.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-4 py-2 rounded-xl mb-6">
              <PhoneCall className="w-4 h-4 text-[#f3ba77]" />
              <span>Direct Commercial Line: +1 (800) 967-5935</span>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#f3ba77] hover:bg-[#e29d52] text-black font-bold text-sm transition-all"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[#f3ba77]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f3ba77]">
                Corporate Trade & Enterprise Portal
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Start a B2B Partnership
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
              Unlock tax exemption, dedicated account management, custom live-edge wood species, and tiered commercial volume discounts up to 35%.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TechGlobal Innovations"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@techglobal.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Team Size</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                  >
                    <option>5 - 20 employees</option>
                    <option>20 - 50 employees</option>
                    <option>50 - 200 employees</option>
                    <option>200+ enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Project Scope</label>
                  <select
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                  >
                    <option>Full Office Fitout</option>
                    <option>Ergonomic Chair Refresh</option>
                    <option>Executive Boardroom Suite</option>
                    <option>Remote Work Stipends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Estimated Budget</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                  >
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Additional Project Specifications</label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding timeline, delivery location, architectural requirements or custom dimensions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e29d52] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e29d52] to-[#cf8739] hover:from-[#f3ba77] hover:to-[#e29d52] text-black font-bold text-sm shadow-lg shadow-[#e29d52]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Inquiry</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f3ba77]" />
                <span>NDA Protected • Zero obligations • Response in 4h</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
