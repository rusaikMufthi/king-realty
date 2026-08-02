'use client';

import React from 'react';
import Link from 'next/link';
import { Building, ShieldCheck, DollarSign, Scale, Key, FileCheck, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const servicesList = [
    {
      icon: Building,
      title: 'Luxury Property Acquisition',
      desc: 'Discreet, representation for high-net-worth buyers seeking off-market penthouses, Cinnamon Gardens bungalows, or Southern beachfront villas.'
    },
    {
      icon: DollarSign,
      title: 'Property Selling & Marketing',
      desc: 'High-definition architectural photography, targeted digital campaigns to overseas Sri Lankan expats, and qualified buyer vetting.'
    },
    {
      icon: Key,
      title: 'Property Management & Leasing',
      desc: 'End-to-end tenant screening, lease agreement drafting, monthly rent collection, and maintenance management for residential and commercial units.'
    },
    {
      icon: Scale,
      title: 'Legal & Title Verification',
      desc: 'Collaborating with leading Colombo attorneys to inspect land registry extracts (up to 100 years), street line certificates, and non-vesting deeds.'
    },
    {
      icon: FileCheck,
      title: 'Property Valuation & Appraisal',
      desc: 'Comprehensive market valuation reports considering recent transaction metrics, land perch appreciation, and replacement cost calculations.'
    },
    {
      icon: ShieldCheck,
      title: 'Expat & Foreign Buyer Advisory',
      desc: 'Specialized assistance on Sri Lanka foreign exchange regulations, condominium ownership laws, tax planning, and power-of-attorney execution.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
          Comprehensive Real Estate Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif">
          Advisory & Management Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          From legal title verification to high-yield portfolio management, KING Realty provides end-to-end personal guidance tailored to your exact investment goals.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className="gold-card p-8 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-serif">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{service.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/15">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
