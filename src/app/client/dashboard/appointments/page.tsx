'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getSupabaseAppointments } from '@/lib/supabase-db';
import { Appointment, AppointmentStatus } from '@/types';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { Calendar, Clock, CheckCircle2, XCircle, RefreshCw, Plus } from 'lucide-react';

export default function ClientAppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00');
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);

  useEffect(() => {
    getSupabaseAppointments(user?.email || 'demo@kingrealty.lk').then((res) => {
      setAppointments(res);
      setLoading(false);
    });
  }, [user]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved / Confirmed</span>;
      case 'PENDING':
        return <span className="bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Pending Review</span>;
      case 'RESCHEDULED':
        return <span className="bg-blue-950/80 text-blue-300 border border-blue-500/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Rescheduled</span>;
      case 'CANCELLED':
        return <span className="bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return null;
    }
  };

  const handleCancel = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt || !newDate) return;
    setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, preferredDate: newDate, preferredTime: newTime, status: 'RESCHEDULED' } : a));
    setRescheduleModalOpen(false);
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <Calendar className="w-3.5 h-3.5" /> Supabase Database Schedule
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
              My Viewing Appointments ({appointments.length})
            </h1>
          </div>

          <Link
            href="/properties"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Book New Property Viewing
          </Link>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="p-8 text-center text-xs text-[#D4AF37]">Loading viewing appointments from Supabase...</div>
        ) : appointments.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100">No Scheduled Viewings</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Select any property in our portfolio to schedule a private on-site meeting with our principal agent.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="gold-card p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(appt.status)}
                    <span className="text-xs text-slate-400">ID: #{appt.id}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-slate-100">{appt.propertyTitle}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
                      <Calendar className="w-3.5 h-3.5" /> Date: {appt.preferredDate}
                    </span>
                    <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Time Slot: {appt.preferredTime}
                    </span>
                  </div>

                  {appt.notes && (
                    <p className="text-xs text-slate-400 italic bg-[#18181B] p-2.5 rounded-xl border border-[#D4AF37]/15">
                      Client Note: “{appt.notes}”
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {appt.status !== 'CANCELLED' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedAppt(appt);
                          setRescheduleModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#18181B] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Request Reschedule
                      </button>

                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="px-3.5 py-2 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reschedule Modal */}
        {rescheduleModalOpen && selectedAppt && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#121214] border border-[#D4AF37]/40 rounded-2xl max-w-md w-full p-6 space-y-4">
              <h3 className="text-lg font-bold font-serif text-slate-100">Request Appointment Reschedule</h3>
              <p className="text-xs text-slate-400">{selectedAppt.propertyTitle}</p>

              <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">New Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">New Time Slot</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="10:00">10:00 AM Morning</option>
                    <option value="14:00">02:00 PM Afternoon</option>
                    <option value="16:30">04:30 PM Sunset View</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0B0C] font-bold">
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setRescheduleModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#18181B] text-slate-400"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ClientDashboardLayout>
  );
}
