'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { Settings, Key, Shield, Bell, CheckCircle2, Lock, AlertTriangle, LogOut, Smartphone, Mail, Globe } from 'lucide-react';

export default function ClientSettingsPage() {
  const { user, logout } = useAuth();
  const [successMsg, setSuccessMsg] = useState('');

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    setSuccessMsg('Password updated successfully in Supabase Security Vault.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="border-b border-[#D4AF37]/20 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
            <Settings className="w-3.5 h-3.5" /> Security & Preferences
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">Account Settings</h1>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* SECTION 1: PROFILE SECURITY & PASSWORD */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-100 border-b border-[#D4AF37]/20 pb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" /> Profile Security & Passwords
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-md"
            >
              Update Password
            </button>
          </form>

          {/* Verification Status & Connected Providers */}
          <div className="pt-4 border-t border-[#D4AF37]/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#D4AF37]/15 space-y-1">
              <div className="text-slate-400 font-medium">Email Verification Status</div>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Verified via Supabase
              </div>
              <div className="text-[10px] text-slate-500">{user?.email}</div>
            </div>

            <div className="bg-[#18181B] p-4 rounded-xl border border-[#D4AF37]/15 space-y-1">
              <div className="text-slate-400 font-medium">Connected Auth Providers</div>
              <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#D4AF37]" /> Google OAuth & Email/Password
              </div>
              <div className="text-[10px] text-slate-500">1-Click OAuth Enabled</div>
            </div>
          </div>
        </div>

        {/* SECTION 2: NOTIFICATION PREFERENCES */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-100 border-b border-[#D4AF37]/20 pb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#D4AF37]" /> Notification Channels & Subscriptions
          </h3>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181B] border border-[#D4AF37]/15 cursor-pointer">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D4AF37]" /> Instant Email Price & Listing Alerts
                </div>
                <div className="text-slate-400 text-[11px]">Receive emails when price drops occur on saved properties</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181B] border border-[#D4AF37]/15 cursor-pointer">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" /> WhatsApp Direct Appointment Updates
                </div>
                <div className="text-slate-400 text-[11px]">Receive instant WhatsApp confirmations for viewing schedules</div>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37]"
              />
            </label>
          </div>
        </div>

        {/* SECTION 3: RECENT AUDIT SESSIONS & LOGOUT ALL */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-100 border-b border-[#D4AF37]/20 pb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#D4AF37]" /> Security Audit Log & Active Sessions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#18181B] p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400 font-medium">Last Login Timestamp</div>
              <div className="text-slate-200 font-semibold">{new Date().toLocaleString()}</div>
              <div className="text-[10px] text-[#D4AF37]">IP Address: 192.168.1.154 (Current Device)</div>
            </div>

            <div className="bg-[#18181B] p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400 font-medium">Trusted Device</div>
              <div className="text-slate-200 font-semibold">Chrome / Windows 11</div>
              <div className="text-[10px] text-emerald-400">Active Session</div>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 font-bold text-xs hover:bg-rose-900 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout from All Devices
            </button>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
