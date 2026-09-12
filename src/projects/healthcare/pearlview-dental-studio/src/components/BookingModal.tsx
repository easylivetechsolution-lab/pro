import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, CalendarCheck, Shield, ArrowRight } from 'lucide-react';
import { SERVICES_DATA, DOCTORS_DATA, CLINIC_INFO } from '../data/dentalData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialDoctorId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialDoctorId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceId, setServiceId] = useState<string>(initialServiceId || 'cosmetic');
  const [doctorId, setDoctorId] = useState<string>(initialDoctorId || 'dr-michael-carter');
  const [selectedDate, setSelectedDate] = useState<string>('tomorrow');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [comfortPreference, setComfortPreference] = useState<string>('Noise-Canceling Headphones & Netflix');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  useEffect(() => {
    if (initialServiceId) setServiceId(initialServiceId);
    if (initialDoctorId) setDoctorId(initialDoctorId);
  }, [initialServiceId, initialDoctorId]);

  if (!isOpen) return null;

  const dates = [
    { id: 'today', label: 'Today (Limited)', date: 'Same-Day Emergency' },
    { id: 'tomorrow', label: 'Tomorrow', date: 'Fri, Sep 18' },
    { id: 'next_mon', label: 'Monday', date: 'Mon, Sep 21' },
    { id: 'next_tue', label: 'Tuesday', date: 'Tue, Sep 22' },
  ];

  const timeSlots = [
    '8:30 AM', '9:45 AM', '10:00 AM', '11:30 AM',
    '1:15 PM', '2:30 PM', '3:45 PM', '4:30 PM'
  ];

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      setBookingRef(`PV-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === doctorId) || DOCTORS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-6 bg-[#0E282E] text-white flex items-center justify-between border-b border-[#1A3E46]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#EAD8B7]">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold text-white">
                Reserve Concierge Appointment
              </h3>
              <p className="text-xs text-zinc-300">
                PearlView Dental Studio &bull; Austin, TX
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isConfirmed ? (
            /* Confirmation Screen */
            <div className="text-center py-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#5B7980]">
                Appointment Confirmed
              </span>

              <h4 className="text-2xl sm:text-3xl font-serif text-[#0E282E] font-bold mt-1 mb-2">
                We Look Forward to Welcoming You
              </h4>

              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto mb-6">
                A calendar invitation and digital new patient onboarding guide have been sent to <strong>{email || 'your email'}</strong>.
              </p>

              {/* Summary Card */}
              <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-zinc-200/90 text-left max-w-md mx-auto mb-6 space-y-2 text-xs">
                <div className="flex justify-between border-b border-zinc-200/60 pb-2">
                  <span className="text-zinc-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-zinc-900">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/60 pb-2">
                  <span className="text-zinc-500">Service:</span>
                  <span className="font-semibold text-[#0E282E]">{selectedService.title}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/60 pb-2">
                  <span className="text-zinc-500">Doctor:</span>
                  <span className="font-semibold text-zinc-900">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/60 pb-2">
                  <span className="text-zinc-500">Time & Date:</span>
                  <span className="font-semibold text-zinc-900">{selectedTime}, {selectedDate === 'tomorrow' ? 'Tomorrow' : 'Upcoming'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Suite Amenities:</span>
                  <span className="font-semibold text-[#0E282E]">{comfortPreference}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#0E282E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#153B44]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form Steps */
            <form onSubmit={handleComplete} className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 pb-4 border-b border-zinc-100">
                <span className={step >= 1 ? 'text-[#0E282E]' : ''}>1. Treatment & Doctor</span>
                <span className={step >= 2 ? 'text-[#0E282E]' : ''}>2. Date & Time</span>
                <span className={step >= 3 ? 'text-[#0E282E]' : ''}>3. Patient Details</span>
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Select Desired Treatment
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => setServiceId(srv.id)}
                        className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                          serviceId === srv.id
                            ? 'border-[#0E282E] bg-[#FAF9F6] ring-1 ring-[#0E282E]'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <p className="text-xs font-bold text-zinc-900">{srv.title}</p>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{srv.shortDesc}</p>
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mt-4">
                    Preferred Doctor or Specialist
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DOCTORS_DATA.map((doc) => (
                      <button
                        type="button"
                        key={doc.id}
                        onClick={() => setDoctorId(doc.id)}
                        className={`p-3 rounded-xl text-left border flex items-center gap-3 transition-all cursor-pointer ${
                          doctorId === doc.id
                            ? 'border-[#0E282E] bg-[#FAF9F6] ring-1 ring-[#0E282E]'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-zinc-900">{doc.name}</p>
                          <p className="text-[11px] text-zinc-500">{doc.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Date & Time</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">
                      Select Appointment Day
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {dates.map((d) => (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => setSelectedDate(d.id)}
                          className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                            selectedDate === d.id
                              ? 'border-[#0E282E] bg-[#FAF9F6] ring-1 ring-[#0E282E]'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <p className="text-xs font-bold text-zinc-900">{d.label}</p>
                          <p className="text-[11px] text-zinc-500">{d.date}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">
                      Available Time Slot (Austin Local Time)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            selectedTime === slot
                              ? 'bg-[#0E282E] text-white shadow-xs'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Complimentary Comfort Amenity
                    </label>
                    <select
                      value={comfortPreference}
                      onChange={(e) => setComfortPreference(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-zinc-200 rounded-xl text-zinc-800 focus:outline-hidden"
                    >
                      <option>Bose Noise-Canceling Headphones & Netflix</option>
                      <option>Heated Massage Chair & Weighted Blanket</option>
                      <option>Aromatherapy Lavender Warm Towels</option>
                      <option>Mild Nitrous Oxide Sedation (Zero Anxiety)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Contact</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Katherine Vance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-hidden focus:border-[#0E282E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Email Address (For Calendar Confirmation) *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="katherine@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-hidden focus:border-[#0E282E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Mobile Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="(512) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-hidden focus:border-[#0E282E]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary preview */}
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-zinc-200/90 text-[11px] text-zinc-600 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0E282E] block">{selectedService.title}</span>
                      <span>With {selectedDoctor.name} &bull; {selectedTime}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      No Prepayment Required
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900"
                    >
                      &larr; Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Reserving Appointment...</span>
                      ) : (
                        <>
                          <span>Confirm My Appointment</span>
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
