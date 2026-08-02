'use client';

import React, { useState } from 'react';
import { Property } from '@/types';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ViewingModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewingModal: React.FC<ViewingModalProps> = ({ property, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121214] border border-[#D4AF37]/40 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-[#18181B]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-serif gold-gradient-text">Viewing Requested</h3>
            <p className="text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
              Your private viewing appointment for <strong className="text-white">{property.title}</strong> has been logged. Our principal agent will contact you within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#D4AF37]/20 pb-3">
              <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-serif font-bold">
                Private Property Advisory
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-serif">Schedule Property Viewing</h3>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{property.title}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Rohan de Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="10:00">10:00 AM Morning</option>
                    <option value="14:00">02:00 PM Afternoon</option>
                    <option value="16:30">04:30 PM Sunset View</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Special Requirements / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Any specific requests or questions for the agent..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Request Private Appointment
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                100% Confidential. Met on-site at property location by KING Realty principal agent.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
