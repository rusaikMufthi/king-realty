'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import {
  LayoutDashboard,
  User,
  Heart,
  Search,
  Calendar,
  MessageSquare,
  MessageCircle,
  Bell,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const ClientDashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const { favorites } = useFavorites();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', href: '/client/dashboard/profile', icon: User },
    { label: 'Favorite Properties', href: '/client/dashboard/favorites', icon: Heart, badge: favorites.length },
    { label: 'Saved Searches', href: '/client/dashboard/saved-searches', icon: Search },
    { label: 'Appointments', href: '/client/dashboard/appointments', icon: Calendar, badge: 2 },
    { label: 'My Inquiries', href: '/client/dashboard/inquiries', icon: MessageSquare, badge: 3 },
    { label: 'Messages', href: '/client/dashboard/messages', icon: MessageCircle, badge: 1 },
    { label: 'Notifications', href: '/client/dashboard/notifications', icon: Bell, badge: 4 },
    { label: 'Reviews', href: '/client/dashboard/reviews', icon: Star },
    { label: 'Account Settings', href: '/client/dashboard/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0E0E10] border-r border-[#D4AF37]/20 p-5 space-y-6 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 pb-5 border-b border-[#D4AF37]/20">
          <div className="relative w-10 h-10 rounded-lg bg-[#18181B] border border-[#D4AF37]/40 flex items-center justify-center">
            <Image src="/logo.png" alt="KING Realty" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <div className="text-base font-bold tracking-wider gold-gradient-text uppercase font-serif">
              KING Realty
            </div>
            <div className="text-[9px] text-slate-400 tracking-widest uppercase">
              Client Portal
            </div>
          </div>
        </Link>

        {/* User Card */}
        <div className="glass-panel p-3.5 rounded-xl border border-[#D4AF37]/25 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center font-bold text-sm font-serif">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div className="overflow-hidden text-xs">
            <div className="font-bold text-slate-100 truncate">{user?.name || 'Client Account'}</div>
            <div className="text-[10px] text-[#D4AF37] uppercase font-semibold">{role}</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 text-xs">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#BF953F]/20 to-[#AA771C]/10 text-[#D4AF37] border border-[#D4AF37]/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#18181B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-[#D4AF37] text-[#0B0B0C] font-bold text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#D4AF37]/15 space-y-2">
          {role === 'ADMIN' && (
            <Link
              href="/admin"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#BF953F] to-[#AA771C] text-[#0B0B0C] font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <Shield className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}

          <button
            onClick={logout}
            className="w-full py-2 px-3 rounded-xl bg-[#18181B] text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-[#0E0E10] border-r border-[#D4AF37]/30 p-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#D4AF37]/20">
                <span className="font-bold gold-gradient-text font-serif">KING Realty Portal</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 text-xs">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#0B0B0C] font-bold'
                          : 'text-slate-300 hover:text-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="bg-[#18181B] text-[#D4AF37] text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl bg-rose-950/80 text-rose-300 border border-rose-800 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-40 bg-[#0E0E10]/90 backdrop-blur-md border-b border-[#D4AF37]/20 px-4 sm:px-6 py-3.5 flex justify-between items-center">
          {/* Breadcrumb & Mobile Toggle */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg bg-[#18181B] border border-slate-700 text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
              <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
              <Link href="/client/dashboard" className="hover:text-[#D4AF37]">Client Dashboard</Link>
              <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-semibold capitalize">
                {pathname.split('/').pop()?.replace('-', ' ') || 'Overview'}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Dropdown Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-slate-300 hover:text-[#D4AF37] relative transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#121214] border border-[#D4AF37]/40 rounded-2xl p-4 shadow-2xl space-y-3 z-50 text-xs">
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-2">
                    <span className="font-bold font-serif gold-gradient-text">Notifications Center</span>
                    <span className="text-[10px] text-[#D4AF37]">4 Unread</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="bg-[#18181B] p-2.5 rounded-xl border border-[#D4AF37]/20 space-y-1">
                      <div className="font-semibold text-slate-100">Viewing Appointment Approved</div>
                      <div className="text-slate-400 text-[11px]">Sovereign Penthouse, Colombo 3 (Aug 5th at 4:00 PM)</div>
                    </div>
                    <div className="bg-[#18181B] p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-100">Price Reduced on Saved Property</div>
                      <div className="text-slate-400 text-[11px]">Mirissa Ocean Cliffside Villa (- LKR 10 Mn)</div>
                    </div>
                  </div>

                  <Link
                    href="/client/dashboard/notifications"
                    onClick={() => setNotificationsOpen(false)}
                    className="block text-center text-xs font-semibold text-[#D4AF37] hover:underline pt-1"
                  >
                    View All Notifications
                  </Link>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <Link href="/client/dashboard/profile" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-xs font-serif group-hover:scale-105 transition-transform">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-200 group-hover:text-[#D4AF37]">
                {user?.name || 'Client'}
              </span>
            </Link>
          </div>
        </header>

        {/* DASHBOARD PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};
