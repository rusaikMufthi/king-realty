'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_INQUIRIES } from '@/lib/mock-data';
import { Inquiry } from '@/types';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { MessageSquare, Clock, CheckCircle2, MessageCircle, ArrowRight, Plus } from 'lucide-react';

export default function ClientInquiriesPage() {
  const [inquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <MessageSquare className="w-3.5 h-3.5" /> Confidential Enquiries
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
              My Inquiries & Title Requests ({inquiries.length})
            </h1>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Send New Advisory Inquiry
          </Link>
        </div>

        {/* List */}
        {inquiries.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100">No Inquiries Submitted</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Submit an inquiry on any property listing or contact form to receive detailed title search documents and valuation reports.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="gold-card p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider font-serif">
                      {inq.type} Enquiry
                    </span>
                    <h3 className="text-base font-bold font-serif text-slate-100">
                      Inquiry #{inq.id}
                    </h3>
                  </div>

                  <span className="bg-blue-950 text-blue-300 border border-blue-500/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Status: {inq.status}
                  </span>
                </div>

                <div className="bg-[#18181B] p-4 rounded-xl border border-[#D4AF37]/15 text-xs space-y-2">
                  <div className="text-slate-400 font-medium">Your Message:</div>
                  <p className="text-slate-200 italic">“{inq.message}”</p>
                  <div className="text-[10px] text-slate-500">
                    Submitted on: {new Date(inq.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {inq.notes && (
                  <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30 text-xs space-y-1">
                    <div className="font-bold text-[#D4AF37] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Agent Response Note:
                    </div>
                    <p className="text-slate-200">{inq.notes}</p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <Link
                    href="/client/dashboard/messages"
                    className="px-4 py-2 rounded-xl bg-[#18181B] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Continue in Messaging Desk
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientDashboardLayout>
  );
}
