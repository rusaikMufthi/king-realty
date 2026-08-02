'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Property Acquisition');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
          Confidential Consultation
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif">
          Connect with KING Realty
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Whether you are looking to purchase a Colombo 3 penthouse, list your colonial estate, or request an off-market title appraisal, we respond directly within 2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Direct Channels & Hours */}
        <div className="space-y-6">
          <div className="gold-card p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-100 font-serif border-b border-[#D4AF37]/20 pb-3">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-200">Mobile & Advisory Desk</div>
                  <div className="text-slate-400 mt-0.5">+94 77 693 7333</div>
                  <div className="text-slate-400">+94 72 441 6613</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-200">WhatsApp Direct Chat</div>
                  <a
                    href="https://wa.me/94776937333?text=Hello%20KING%20Realty,%20I%20would%20like%20to%20schedule%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold mt-0.5 block"
                  >
                    +94 77 693 7333 (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-200">Email Enquiries</div>
                  <div className="text-slate-400 mt-0.5">inquiries@kingrealty.lk</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-200">Advisory Lounge Location</div>
                  <div className="text-slate-400 mt-0.5 font-medium text-slate-300">
                    No.51/23, 1st Floor, SS Plaza, Colombo 04, Sri Lanka
                  </div>
                  <div className="text-[10px] text-[#D4AF37] mt-1 italic">
                    * Met On-Site at Property Locations / Office Consultations
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 space-y-3 text-xs">
            <h4 className="font-bold text-slate-100 font-serif flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" /> Business Advisory Hours
            </h4>
            <div className="flex justify-between text-slate-300">
              <span>Monday – Saturday:</span>
              <span className="font-semibold text-[#D4AF37]">8:30 AM – 7:00 PM</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Sunday & Poya Days:</span>
              <span className="font-semibold text-[#D4AF37]">Private Viewing Appointments Only</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/30 space-y-6">
            <div className="border-b border-[#D4AF37]/20 pb-4">
              <h3 className="text-2xl font-bold font-serif text-slate-100">Send an Advisory Message</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the confidential form below. All inquiries automatically register in our lead priority queue.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold font-serif gold-gradient-text">Message Received</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to KING Realty. Our principal agent will contact you via WhatsApp or Email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Kanishka Perera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.lk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+94 77 693 7333"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Inquiry Purpose</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Property Acquisition">Property Buying Inquiry</option>
                      <option value="Property Selling">List My Property for Sale</option>
                      <option value="Valuation & Title Check">Property Valuation & Legal Title</option>
                      <option value="Expat Advisory">Expat / Foreign Investment Legal</option>
                      <option value="General Advisory">General Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Detailed Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details on your budget range, target location (e.g. Colombo 3, Cinnamon Gardens, Galle Fort), or specific property requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Confidential Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
