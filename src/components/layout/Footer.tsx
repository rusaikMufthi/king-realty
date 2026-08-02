'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#08080A] border-t border-[#D4AF37]/20 pt-16 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded bg-[#18181B] border border-[#D4AF37]/40 flex items-center justify-center">
                <Image src="/logo.png" alt="KING Realty" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-xl font-bold tracking-wider gold-gradient-text uppercase font-serif">
                KING Realty
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs sm:text-sm">
              Sri Lanka’s premier independent real estate advisory. Curating high-value residential, commercial, beachfront, and investment properties in Colombo, Galle, and pristine island locations.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>No.51/23, 1st Floor, SS Plaza, Colombo 04, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>+94 77 693 7333 / +94 72 441 6613</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>inquiries@kingrealty.lk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4 text-xs tracking-widest uppercase font-serif gold-gradient-text">
              Prime Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/properties?category=LUXURY_APARTMENT" className="hover:text-[#D4AF37] transition-colors">
                  Colombo Luxury Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?category=RESIDENTIAL_HOUSE" className="hover:text-[#D4AF37] transition-colors">
                  Cinnamon Gardens Estates
                </Link>
              </li>
              <li>
                <Link href="/properties?category=BEACHFRONT_VILLA" className="hover:text-[#D4AF37] transition-colors">
                  Southern Beachfront Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?category=LAND_PLOTS" className="hover:text-[#D4AF37] transition-colors">
                  Prime Commercial & Land Plots
                </Link>
              </li>
              <li>
                <Link href="/properties?status=UNDER_NEGOTIATION" className="hover:text-[#D4AF37] transition-colors">
                  Off-Market Investment Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Company */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4 text-xs tracking-widest uppercase font-serif gold-gradient-text">
              Advisory & Firm
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/agent" className="hover:text-[#D4AF37] transition-colors">
                  Meet Your Principal Agent
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D4AF37] transition-colors">
                  Property Buying & Selling
                </Link>
              </li>
              <li>
                <Link href="/services#valuation" className="hover:text-[#D4AF37] transition-colors">
                  Legal & Valuation Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#D4AF37] transition-colors">
                  Market Insights & Intelligence
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Schedule Private Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4 text-xs tracking-widest uppercase font-serif gold-gradient-text">
              Private Market Briefing
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to receive confidential quarterly Sri Lankan property market intelligence and off-market listings.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 p-3 rounded border border-emerald-800 text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed successfully. Check your email for verification.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-[#BF953F] to-[#AA771C] text-[#0B0B0C] font-bold text-xs rounded hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <span>Subscribe Briefing</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KING Realty Sri Lanka. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Advisory</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
