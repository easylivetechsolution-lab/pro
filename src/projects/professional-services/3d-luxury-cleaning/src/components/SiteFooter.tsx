import React, { useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

type FooterLink = { label: string; section?: string };
type FooterGroup = { title: string; links: FooterLink[] };

const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Services', section: 'solutions' },
      { label: 'Instant Quote', section: 'quote' },
      { label: 'Impact & Trust', section: 'impact' },
      { label: 'Pricing', section: 'pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', section: 'who-we-are' },
      { label: 'FAQs', section: 'faq' },
      { label: 'Careers' },
      { label: 'Contact', section: 'quote' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Referrals', section: 'referrals' },
      { label: 'Blog' },
      { label: 'Help Center', section: 'faq' },
      { label: 'Guides', section: 'standards' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service' },
      { label: 'Privacy Policy' },
      { label: 'Cookie Policy' },
      { label: 'Refund Policy' },
    ],
  },
];

const SOCIAL_MARKS = [
  { label: 'X', mark: 'X' },
  { label: 'Facebook', mark: 'f' },
  { label: 'Instagram', mark: 'IG' },
  { label: 'YouTube', mark: 'YT' },
  { label: 'LinkedIn', mark: 'in' },
];

const PaymentMethods: React.FC = () => (
  <div className="mt-4 flex items-center justify-between gap-3 border-t border-blue-100/90 pt-4" role="img" aria-label="Visa, Mastercard, PayPal, Apple Pay, and Google Pay accepted">
    <span className="font-display text-sm font-black italic tracking-[-0.08em] text-[#1A1F71]">VISA</span>
    <svg aria-hidden="true" viewBox="0 0 48 30" className="h-6 w-10 shrink-0">
      <circle cx="18" cy="15" r="11" fill="#EB001B" />
      <circle cx="30" cy="15" r="11" fill="#F79E1B" fillOpacity=".95" />
      <path d="M24 6.5a11 11 0 0 1 0 17 11 11 0 0 1 0-17Z" fill="#FF5F00" />
    </svg>
    <span className="inline-flex items-center gap-1 font-semibold italic text-[#003087]"><span className="text-lg font-black">P</span>PayPal</span>
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-slate-800">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] fill-current">
        <path d="M17.1 12.8c.03 3.25 2.85 4.33 2.88 4.35-.02.08-.46 1.55-1.5 3.07-.9 1.3-1.83 2.6-3.3 2.63-1.44.03-1.9-.85-3.54-.85s-2.16.82-3.52.88c-1.42.05-2.5-1.4-3.4-2.7-1.84-2.66-3.25-7.63-.08-12.04a5.1 5.1 0 0 1 5.29-2.78c1.3-.03 2.55.94 3.35.94.8 0 2.3-1.17 3.88-1 .66.03 2.51.27 3.7 2-.1.06-2.22 1.29-2.2 3.85ZM14.55 4.47c.72-.88 1.21-2.1 1.08-3.32-1.04.04-2.3.7-3.04 1.58-.67.78-1.26 2.01-1.1 3.19 1.16.09 2.34-.59 3.06-1.45Z" />
      </svg>
      Pay
    </span>
    <span className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-slate-700">
      <span className="bg-[conic-gradient(from_-45deg,#4285F4_0deg_90deg,#34A853_90deg_180deg,#FBBC05_180deg_270deg,#EA4335_270deg_360deg)] bg-clip-text text-lg font-black text-transparent">G</span>
      Pay
    </span>
  </div>
);

export const SiteFooter: React.FC<{ onNavigate: (sectionId: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setNotice('Newsletter signup will be available soon.');
  };

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-sky-100 bg-white text-slate-600"
      style={{
        backgroundImage:
          'linear-gradient(115deg, #ffffff 0%, #f8fbff 48%, #ffffff 100%)',
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 1440 455" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <defs>
          <linearGradient id="footerWaveBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dbeafe" stopOpacity=".88" />
            <stop offset="1" stopColor="#eff6ff" stopOpacity=".18" />
          </linearGradient>
          <linearGradient id="footerWavePale" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#bfdbfe" stopOpacity=".48" />
            <stop offset="1" stopColor="#eff6ff" stopOpacity=".08" />
          </linearGradient>
        </defs>
        <path fill="url(#footerWaveBlue)" d="M1000 0c92 27 131 105 229 91 90-13 126-72 211-43v247c-91-54-117-111-206-137-111-32-166-1-234-158Z" />
        <path fill="url(#footerWavePale)" d="M0 82c113-39 196-11 284 45 67 43 134 49 216 19 100-37 154-40 247-4-112-7-162 46-261 65-112 21-159-3-252-58C151 96 80 86 0 125Z" />
        <path fill="url(#footerWaveBlue)" d="M0 342c102 22 144 59 216 113H0Z" />
        <path fill="url(#footerWavePale)" d="M1110 455c104-77 169-121 330-158v158Z" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 pb-10 pt-12 sm:px-8 lg:grid-cols-[1.65fr_.65fr_.65fr_.65fr_.9fr_1.7fr] lg:gap-x-5 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="col-span-2 lg:col-span-1">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('top');
            }}
            className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <img src="/assets/aistudio/aetherlogo.png" alt="" aria-hidden="true" className="h-14 w-[5.25rem] object-contain" />
            <span className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.7rem]">AetherClean</span>
          </a>
          <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-slate-600">
            A smarter, cleaner, and more trusted way to get things done.
          </p>
          <div className="mt-5 flex items-center gap-2.5" role="img" aria-label="Social channels: X, Facebook, Instagram, YouTube, and LinkedIn">
            {SOCIAL_MARKS.map(({ label, mark }) => (
              <span
                key={label}
                title={`${label} profile`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100/80 bg-white/75 text-sm font-bold text-slate-500 shadow-sm"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={`${group.title} links`} className="relative pl-4 before:absolute before:left-0 before:top-0 before:h-32 before:w-px before:bg-blue-100/90 sm:pl-5">
            <h2 className="mb-4 text-sm font-bold text-slate-900">{group.title}</h2>
            <ul className="space-y-2.5 text-[13px]">
              {group.links.map((link) => (
                <li key={link.label}>
                  {link.section ? (
                    <a
                      href={`#${link.section}`}
                      onClick={(event) => {
                        event.preventDefault();
                        onNavigate(link.section!);
                      }}
                      className="transition-colors hover:text-blue-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="cursor-default text-slate-500/90" title="Coming soon">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <section className="col-span-2 lg:col-span-1 lg:relative lg:pl-6 lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:h-32 lg:before:w-px lg:before:bg-blue-100/90">
          <h2 className="text-base font-bold text-slate-900">Stay in the Loop</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
            Get the latest updates and exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex min-w-0 rounded-full border border-blue-100 bg-white/85 p-1 shadow-[0_4px_16px_rgba(37,99,235,0.08)] focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
            <label htmlFor="footer-newsletter-email" className="sr-only">Your email address</label>
            <Mail aria-hidden="true" className="ml-3 h-4 w-4 shrink-0 self-center text-slate-500" />
            <input
              id="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => { setEmail(event.target.value); setNotice(''); }}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:from-blue-700 hover:to-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Subscribe
            </button>
          </form>
          {notice && <p role="status" className="mt-2 text-xs text-slate-500">{notice}</p>}
          <PaymentMethods />
        </section>
      </div>

      <div className="relative border-t border-blue-100/90">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-slate-500 sm:px-8 md:flex-row lg:px-8">
          <p>&copy; {new Date().getFullYear()} AetherClean. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue-600" /> Secure &amp; Trusted</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-blue-200 sm:block" />
            <span>Built for a better tomorrow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
