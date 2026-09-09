import React, { useState } from 'react';
import { X, Check, Lock, Mail, Building, User, Globe, ArrowRight } from 'lucide-react';
import { TrilinkLogo } from './TrilinkLogo';

interface AuthAndSalesModalsProps {
  signInOpen: boolean;
  contactSalesOpen: boolean;
  onCloseSignIn: () => void;
  onCloseContactSales: () => void;
}

export const AuthAndSalesModals: React.FC<AuthAndSalesModalsProps> = ({
  signInOpen,
  contactSalesOpen,
  onCloseSignIn,
  onCloseContactSales,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInSuccess, setSignInSuccess] = useState(false);

  // Sales form state
  const [salesName, setSalesName] = useState('');
  const [salesEmail, setSalesEmail] = useState('');
  const [salesCompany, setSalesCompany] = useState('');
  const [salesVolume, setSalesVolume] = useState('$500k - $2M / month');
  const [salesSubmitted, setSalesSubmitted] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSignInSuccess(true);
    setTimeout(() => {
      setSignInSuccess(false);
      onCloseSignIn();
    }, 1800);
  };

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salesEmail || !salesName) return;
    setSalesSubmitted(true);
    setTimeout(() => {
      setSalesSubmitted(false);
      onCloseContactSales();
    }, 2200);
  };

  return (
    <>
      {/* SIGN IN MODAL */}
      {signInOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-slate-900">
            <button
              onClick={onCloseSignIn}
              className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <TrilinkLogo size="md" variant="dark" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                Sign in to your account
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Access your payments dashboard, analytics, and API keys.
              </p>
            </div>

            {signInSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00A86B] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Signed in successfully!</h4>
                <p className="text-xs text-slate-500">Redirecting to your Trilink Dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-700 font-semibold">Password</label>
                    <a href="#" className="text-[#00A86B] font-medium hover:underline">Forgot?</a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-md transition-all mt-2"
                >
                  Continue to Dashboard
                </button>

                <div className="pt-2 text-center text-slate-500 text-[11px]">
                  Don't have an account yet?{' '}
                  <span onClick={onCloseSignIn} className="text-[#00A86B] font-bold cursor-pointer hover:underline">
                    Get started
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CONTACT SALES MODAL */}
      {contactSalesOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-8 sm:p-10 shadow-2xl border border-slate-100 text-slate-900">
            <button
              onClick={onCloseContactSales}
              className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                Advisory Team
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">
                Connect with Trilink Sales
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us about your business to get tailored volume discounts, technical architecture support, and dedicated SLAs.
              </p>
            </div>

            {salesSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00A86B] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Inquiry received!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  A dedicated Trilink solutions specialist will reach out to {salesEmail} within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSalesSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={salesName}
                      onChange={(e) => setSalesName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={salesEmail}
                      onChange={(e) => setSalesEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={salesCompany}
                    onChange={(e) => setSalesCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Estimated Monthly Volume</label>
                  <select
                    value={salesVolume}
                    onChange={(e) => setSalesVolume(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 font-medium bg-white"
                  >
                    <option>$0 - $50k / month (Startup)</option>
                    <option>$50k - $500k / month (Growth)</option>
                    <option>$500k - $2M / month (Scale)</option>
                    <option>$2M+ / month (Enterprise tier)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all mt-3"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
