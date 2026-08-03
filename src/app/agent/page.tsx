'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Phone, Mail, MapPin, CheckCircle2, MessageCircle, Star } from 'lucide-react';

export default function AgentPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Banner */}
      <div className="gold-card p-8 sm:p-14 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
        <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl flex-shrink-0 bg-[#18181B]">
          <Image
            src="/agent-mudhassir.jpg"
            alt="MUDHASSIR SHAREEF - KING Realty Principal Agent"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="space-y-5 text-center lg:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif">
            <Award className="w-3.5 h-3.5" /> Founder & Principal Real Estate Agent
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif">
            MUDHASSIR SHAREEF
          </h1>
          <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-serif -mt-2">
            Colombo Premier Independent Real Estate Advisor
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            With dedicated market expertise across Colombo 3 & 7 residential penthouses, coastal villas, and high-value land titling, Mudhassir Shareef provides direct, confidential real estate representation for buyers and sellers without corporate friction.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>English & Sinhala Fluent</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Licensed Colombo Advisor</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>100% On-Site Representation</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/94776937333?text=Hello%20Mudhassir%20Shareef,%20I%20would%20like%20to%20connect%20with%20you%20regarding%20KING%20Realty%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/40"
            >
              <MessageCircle className="w-4 h-4" /> Direct WhatsApp Chat
            </a>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-[#18181B] border border-[#D4AF37] text-[#D4AF37] font-semibold text-xs hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all"
            >
              Schedule Confidential Meeting
            </Link>
          </div>
        </div>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-2 text-center">
          <Phone className="w-6 h-6 text-[#D4AF37] mx-auto" />
          <div className="font-bold text-slate-100 font-serif">Direct Mobile</div>
          <div className="text-slate-300 font-semibold">+94 77 693 7333 / +94 72 441 6613</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-2 text-center">
          <Mail className="w-6 h-6 text-[#D4AF37] mx-auto" />
          <div className="font-bold text-slate-100 font-serif">Inquiry Email</div>
          <div className="text-slate-300 font-semibold">kingrealty91@gmail.com</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-2 text-center">
          <MapPin className="w-6 h-6 text-[#D4AF37] mx-auto" />
          <div className="font-bold text-slate-100 font-serif">Office Location</div>
          <div className="text-slate-300 font-semibold">No.51/23, 1st Floor, SS Plaza, Colombo 04</div>
        </div>
      </div>

      {/* Mission & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3">
          <h3 className="text-lg font-bold text-slate-100 font-serif">Personal Representation</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Mudhassir Shareef personally conducts every property inspection, seller negotiation, and deed review, ensuring complete accountability.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3">
          <h3 className="text-lg font-bold text-slate-100 font-serif">Expat & Foreign Investment</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Specialized legal and financial guidance for non-resident Sri Lankans and overseas investors seeking prime land, beachfront villas, and luxury condos.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3">
          <h3 className="text-lg font-bold text-slate-100 font-serif">Legal & Title Oversight</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Every transaction is backed by top-tier legal counsels in Colombo, ensuring title extract verification, street line certification, and clean deeds.
          </p>
        </div>
      </div>
    </div>
  );
}
