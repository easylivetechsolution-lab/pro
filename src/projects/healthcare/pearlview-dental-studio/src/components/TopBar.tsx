import React from 'react';
import { MapPin, Clock, Phone, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface TopBarProps {
  onNavigate?: (page: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate }) => {
  return (
    <div id="top-bar" className="w-full bg-[#0D2428] text-[#E0E7E9] text-xs py-2.5 px-4 sm:px-6 border-b border-[#1A383E] transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 text-center lg:text-left">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs">
          <button
            onClick={() => onNavigate ? onNavigate('contact') : undefined}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors duration-200 cursor-pointer text-left"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span>{CLINIC_INFO.address}</span>
          </button>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span>{CLINIC_INFO.hours.weekdays} &bull; {CLINIC_INFO.hours.saturday}</span>
          </div>

          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="flex items-center gap-1.5 text-zinc-200 hover:text-[#E8D39E] font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span>{CLINIC_INFO.phone}</span>
          </a>
        </div>

        <div className="flex items-center gap-4 text-[11px] sm:text-xs text-zinc-300 font-medium">
          <button
            onClick={() => onNavigate ? onNavigate('fees-insurance') : undefined}
            className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#88C5BE]" />
            <span>{CLINIC_INFO.insuranceNote}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
