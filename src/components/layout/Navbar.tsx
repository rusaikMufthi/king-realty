'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { CurrencyCode } from '@/lib/currency';
import { Heart, Menu, X, Shield, User as UserIcon, Phone, Globe, LogIn, UserPlus } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const { favorites } = useFavorites();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Meet Your Agent', href: '/agent' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-[#D4AF37]/20 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-[#0B0B0C] border-b border-[#D4AF37]/10 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Phone className="w-3.5 h-3.5" /> +94 77 693 7333 / +94 72 441 6613
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Colombo Premier Independent Real Estate Advisory
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-[#18181B] px-2 py-0.5 rounded border border-[#D4AF37]/20">
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="LKR" className="bg-[#18181B]">LKR (₨)</option>
                <option value="USD" className="bg-[#18181B]">USD ($)</option>
                <option value="AUD" className="bg-[#18181B]">AUD (A$)</option>
                <option value="GBP" className="bg-[#18181B]">GBP (£)</option>
              </select>
            </div>

            {/* Auth Navigation Links */}
            {role === 'GUEST' ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-xs text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3 text-[#D4AF37]" /> Sign In
                </Link>
                <span className="text-slate-600">/</span>
                <Link
                  href="/register"
                  className="text-xs text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <UserPlus className="w-3 h-3 text-[#D4AF37]" /> Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#D4AF37] font-semibold">
                  {user?.name} {role === 'ADMIN' ? '👑 (Admin)' : '(Client)'}
                </span>
                <button
                  onClick={logout}
                  className="text-xs text-slate-400 hover:text-red-400 underline ml-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-lg bg-[#18181B] border border-[#D4AF37]/40 flex items-center justify-center overflow-hidden group-hover:border-[#D4AF37] transition-all">
              <Image
                src="/logo.png"
                alt="KING Realty Logo"
                width={48}
                height={48}
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider gold-gradient-text uppercase font-serif">
                KING Realty
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase">
                Versatile Properties. Seamless Solutions.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-slate-300 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Wishlist Link */}
            <Link
              href="/client/dashboard"
              className="relative p-2.5 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0B0B0C] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {role === 'ADMIN' ? (
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Admin Dashboard
              </Link>
            ) : role === 'CLIENT' ? (
              <Link
                href="/client/dashboard"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-semibold text-sm hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> Client Portal
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg bg-[#18181B] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all font-semibold text-sm shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-[#D4AF37] hover:bg-[#18181B]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0C] border-b border-[#D4AF37]/20 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-200 hover:text-[#D4AF37]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Link
              href="/client/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-slate-300 hover:text-[#D4AF37]"
            >
              <span>Saved Favorites</span>
              <span className="bg-[#D4AF37] text-[#0B0B0C] px-2 py-0.5 text-xs font-bold rounded-full">
                {favorites.length}
              </span>
            </Link>
            {role === 'ADMIN' ? (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0B0C] font-bold"
              >
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-[#18181B] border border-[#D4AF37] text-[#D4AF37] font-semibold text-xs"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
