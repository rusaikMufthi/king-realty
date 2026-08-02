'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, Lock, Mail, KeyRound, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    setTimeout(() => {
      const user = loginWithEmail(email);
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/client/dashboard');
      }
    }, 500);
  };

  const handleGoogleAdmin = () => {
    setLoading(true);
    setTimeout(() => {
      const user = loginWithGoogle();
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/client/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="gold-card p-8 sm:p-12 rounded-3xl max-w-md w-full border border-[#D4AF37]/50 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top Glow & Shield */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] flex items-center justify-center mx-auto shadow-xl">
            <Shield className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/40 text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest font-serif">
            <Sparkles className="w-3 h-3" /> Supabase Admin Authentication
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">Administrator Sign In</h1>
          <p className="text-xs text-slate-400">
            Sign in with an assigned Admin email and password stored in Supabase.
          </p>
        </div>

        {/* 1-Click Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleAdmin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#18181B] border border-slate-700 hover:border-[#D4AF37] text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-3 shadow hover:bg-[#222226]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>Continue with Google OAuth</span>
        </button>

        <div className="flex items-center gap-3 text-slate-600 text-xs my-2">
          <div className="h-px bg-slate-800 flex-1" />
          <span>or sign in with email</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Admin Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#D4AF37]" />
              <input
                type="email"
                required
                placeholder="Enter admin email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#D4AF37]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-sm hover:brightness-110 shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Verifying Supabase Credentials...' : 'Authenticate Admin Session'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
