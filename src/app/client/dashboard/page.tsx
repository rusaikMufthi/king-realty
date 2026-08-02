'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { INITIAL_PROPERTIES, INITIAL_APPOINTMENTS, INITIAL_INQUIRIES } from '@/lib/mock-data';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import {
  Heart,
  Calendar,
  MessageSquare,
  MessageCircle,
  Bell,
  Search,
  User,
  Plus,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  TrendingUp
} from 'lucide-react';

export default function ClientDashboardHome() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  const favoritedProperties = INITIAL_PROPERTIES.filter((p) => favorites.includes(p.id));
  const recommendedProperties = INITIAL_PROPERTIES.slice(0, 3);
  const recentlyViewedProperties = INITIAL_PROPERTIES.slice(0, 2);

  const activities = [
    { title: 'Saved a Property', detail: 'The Sovereign Residence – Ultra-Luxury Penthouse', time: '2 hours ago', icon: Heart },
    { title: 'Booked a Viewing Appointment', detail: 'Horton Sanctuary Manor (Colombo 7)', time: 'Yesterday at 4:30 PM', icon: Calendar },
    { title: 'Sent Property Inquiry', detail: 'Requested ROI breakdown for Mirissa Villa', time: '3 days ago', icon: MessageSquare },
    { title: 'Updated Profile Preferences', detail: 'Added Colombo 3 & 7 to target districts', time: '5 days ago', icon: User }
  ];

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Welcome Greeting Banner */}
        <div className="gold-card p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif">
              <Sparkles className="w-3.5 h-3.5" /> VIP Client Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-100">
              Welcome back, <span className="gold-gradient-text">{user?.name || 'John'}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Track your saved Colombo penthouses, upcoming on-site viewings, direct messages with our principal agent, and personalized recommendations.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5 z-10 flex-shrink-0">
            <Link
              href="/properties"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" /> Search Properties
            </Link>
            <Link
              href="/client/dashboard/profile"
              className="px-4 py-2.5 rounded-xl bg-[#18181B] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-xs hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all flex items-center gap-1.5"
            >
              <User className="w-4 h-4" /> Edit Preferences
            </Link>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-xs">
          <Link href="/client/dashboard/favorites" className="gold-card p-4 sm:p-5 rounded-2xl space-y-2 group">
            <div className="flex justify-between items-center text-slate-400">
              <span className="font-semibold uppercase text-[10px]">Saved Favorites</span>
              <Heart className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">{favorites.length}</div>
            <div className="text-[10px] text-[#D4AF37]">Click to manage wishlist</div>
          </Link>

          <Link href="/client/dashboard/appointments" className="gold-card p-4 sm:p-5 rounded-2xl space-y-2 group">
            <div className="flex justify-between items-center text-slate-400">
              <span className="font-semibold uppercase text-[10px]">Appointments</span>
              <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">{INITIAL_APPOINTMENTS.length}</div>
            <div className="text-[10px] text-amber-400">Upcoming Viewings</div>
          </Link>

          <Link href="/client/dashboard/inquiries" className="gold-card p-4 sm:p-5 rounded-2xl space-y-2 group">
            <div className="flex justify-between items-center text-slate-400">
              <span className="font-semibold uppercase text-[10px]">Total Inquiries</span>
              <MessageSquare className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-blue-400">{INITIAL_INQUIRIES.length}</div>
            <div className="text-[10px] text-blue-400">Logged in CRM Queue</div>
          </Link>

          <Link href="/client/dashboard/messages" className="gold-card p-4 sm:p-5 rounded-2xl space-y-2 group">
            <div className="flex justify-between items-center text-slate-400">
              <span className="font-semibold uppercase text-[10px]">Unread Messages</span>
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400">1</div>
            <div className="text-[10px] text-emerald-400">From Principal Agent</div>
          </Link>

          <Link href="/client/dashboard/notifications" className="gold-card p-4 sm:p-5 rounded-2xl space-y-2 group col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center text-slate-400">
              <span className="font-semibold uppercase text-[10px]">Notifications</span>
              <Bell className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">4</div>
            <div className="text-[10px] text-[#D4AF37]">Active Updates</div>
          </Link>
        </div>

        {/* 2 Column Section: Activity Timeline & Recently Viewed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Timeline (2 cols) */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-5">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3">
              <h3 className="text-lg font-bold font-serif text-slate-100">Recent Activity Timeline</h3>
              <span className="text-[10px] text-[#D4AF37] font-semibold">Real-Time Sync</span>
            </div>

            <div className="space-y-4 text-xs">
              {activities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 bg-[#18181B] p-3.5 rounded-xl border border-[#D4AF37]/15">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-100">{act.title}</div>
                      <div className="text-slate-400 mt-0.5">{act.detail}</div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" /> {act.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Viewed Properties */}
          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3">
              <h3 className="text-lg font-bold font-serif text-slate-100">Recently Viewed</h3>
              <Link href="/properties" className="text-[10px] text-[#D4AF37] hover:underline">View All</Link>
            </div>

            <div className="space-y-4">
              {recentlyViewedProperties.map((prop) => (
                <Link key={prop.id} href={`/properties/${prop.id}`} className="gold-card p-3 rounded-xl flex gap-3 block group">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900">
                    <Image src={prop.images[0]} alt={prop.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs overflow-hidden flex-1">
                    <div className="font-bold text-slate-100 group-hover:text-[#D4AF37] truncate font-serif">{prop.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{prop.district}</div>
                    <div className="text-[#D4AF37] font-bold mt-1">LKR {(prop.priceLKR / 1000000).toFixed(0)} Mn</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended For You Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-[#D4AF37]/20 pb-4">
            <div>
              <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
                Tailored Real Estate Intelligence
              </span>
              <h2 className="text-2xl font-bold text-slate-100 font-serif mt-1">
                Recommended Properties For You
              </h2>
            </div>

            <Link href="/properties" className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
              <span>Browse All Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
