import React, { useState } from 'react';
import { MapPin, Clock, Phone, Car, Navigation, Copy, Check } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CLINIC_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openGoogleMaps = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`, '_blank');
  };

  return (
    <section id="location" className="py-16 lg:py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Location & Hours Cards (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 rounded-3xl bg-[#FAF9F6] border border-zinc-200/90 shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
                <span>Our Location & Hours</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#0E282E] font-semibold mb-6">
                Visit Our Austin Sanctuary
              </h3>

              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E282E] flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Practice Address</strong>
                    <span className="text-zinc-600 block">{CLINIC_INFO.address}</span>
                    <span className="text-xs text-zinc-400">Downtown Austin Wellness Corridor</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E282E] flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Office Hours</strong>
                    <span className="text-zinc-600 block">{CLINIC_INFO.hours.weekdays}</span>
                    <span className="text-zinc-600 block">{CLINIC_INFO.hours.saturday}</span>
                    <span className="text-xs text-emerald-600 font-medium mt-0.5 inline-block">
                      &bull; Now Accepting Appointments
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E282E] flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Concierge Line</strong>
                    <a
                      href={`tel:${CLINIC_INFO.phone}`}
                      className="text-zinc-800 hover:text-[#0E282E] font-semibold underline decoration-zinc-300"
                    >
                      {CLINIC_INFO.phone}
                    </a>
                    <span className="text-xs text-zinc-400 block">Direct SMS & Call support available</span>
                  </div>
                </div>

                {/* Parking info */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E282E] flex-shrink-0">
                    <Car className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Parking & Transit</strong>
                    <span className="text-zinc-600">
                      Private, complimentary heated garage parking for patients & convenient to MetroRail.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-wrap gap-3">
              <button
                onClick={copyAddress}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
              </button>

              <button
                onClick={openGoogleMaps}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#0E282E] hover:bg-[#153B44] rounded-xl cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Map Graphic (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-zinc-200 shadow-sm relative min-h-[380px] bg-[#E5E9E8] group">
            {/* Styled Map Canvas Background */}
            <div className="absolute inset-0 bg-[#f4f3f0] flex items-center justify-center overflow-hidden">
              {/* Map grid lines simulation */}
              <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D3D7D6" strokeWidth="1" />
                    <circle cx="30" cy="30" r="1.5" fill="#CAD0CF" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
                {/* Simulated Lady Bird Lake / Colorado River curve */}
                <path
                  d="M -50,220 C 150,260 300,180 500,240 C 700,300 850,200 1000,250"
                  fill="none"
                  stroke="#BCD4D6"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
                <path
                  d="M 120,-10 L 220,500 M 380,-10 L 320,500 M 0,140 L 800,120"
                  fill="none"
                  stroke="#E2E4E1"
                  strokeWidth="8"
                />
              </svg>

              {/* Landmark Callouts */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] font-semibold text-zinc-600 shadow-xs border border-zinc-200">
                Downtown Austin District
              </div>
              <div className="absolute bottom-12 left-10 bg-[#BCD4D6]/70 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-medium text-[#1A454C]">
                Lady Bird Lake Trail
              </div>

              {/* Pin Marker on Austin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#0E282E] text-[#D4AF37] border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
                    <MapPin className="w-6 h-6 fill-[#D4AF37] text-white" />
                  </div>
                  <div className="w-4 h-1.5 bg-black/20 rounded-full blur-xs mx-auto mt-1" />
                </div>

                <div className="mt-2 bg-[#0E282E] text-white px-4 py-2 rounded-xl shadow-xl text-center border border-[#1E434B]">
                  <p className="text-xs font-bold font-serif">PearlView Dental Studio</p>
                  <p className="text-[10px] text-zinc-300">123 Wellness Drive &bull; Suite 400</p>
                </div>
              </div>
            </div>

            {/* Bottom floating action bar */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={openGoogleMaps}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold shadow-lg transition-transform group-hover:scale-105"
              >
                <span>Open in Google Maps</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
