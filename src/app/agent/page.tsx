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
        <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl flex-shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
            alt="KING Realty Principal Agent"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="space-y-5 text-center lg:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif">
            <Award className="w-3.5 h-3.5" /> Founder & Principal Advisory Agent
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif">
            Personal Leadership. Unmatched Market Integrity.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            With over 15 years of dedicated experience across Colombo 3 & 7 residential, coastal villa acquisitions, and high-value land titling, KING Realty provides direct, confidential real estate guidance for local and international buyers.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>English & Sinhala Fluent</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Licensed Colombo Broker</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>100% On-Site Personal Met</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/94777778888?text=Hello%20KING%20Realty,%20I%20would%20like%20to%20connect%20directly."
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

      {/* Mission & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3">
          <h3 className="text-lg font-bold text-slate-100 font-serif">Mission Statement</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            To provide Sri Lanka with a modern, ultra-reliable real estate platform where property buyers and sellers receive direct, executive-level representation without corporate friction.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3">
          <h3 className="text-lg font-bold text-slate-100 font-serif">Vision & Long-Term Growth</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Building Sri Lanka’s most trusted digital property portal for expatriates and overseas investors seeking verified freehold land, luxury condos, and heritage estates.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3">
          <h3 className="text-lg font-bold text-slate-100 font-serif">Legal & Escrow Oversight</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Every transaction is backed by top-tier legal counsels in Colombo, ensuring title extract verification, street line certification, and secure bank transfers.
          </p>
        </div>
      </div>
    </div>
  );
}
