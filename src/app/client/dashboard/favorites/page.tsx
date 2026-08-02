'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import { INITIAL_PROPERTIES } from '@/lib/mock-data';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { Heart, Search, ArrowRight, Trash2 } from 'lucide-react';

export default function ClientFavoritesPage() {
  const { favorites } = useFavorites();
  const [sortBy, setSortBy] = useState('newest');

  const favoritedProperties = INITIAL_PROPERTIES.filter((p) => favorites.includes(p.id)).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceLKR - b.priceLKR;
    if (sortBy === 'price-desc') return b.priceLKR - a.priceLKR;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <Heart className="w-3.5 h-3.5 fill-current" /> Personal Wishlist
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
              Saved Favorite Properties ({favoritedProperties.length})
            </h1>
          </div>

          {favoritedProperties.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <label className="text-slate-400 font-medium">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
              >
                <option value="newest">Recently Saved</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        {favoritedProperties.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100">Your Favorite Properties List is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Explore our luxury marketplace and click the heart icon on any penthouse, bungalow, or villa to bookmark it here.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg hover:brightness-110"
            >
              <Search className="w-4 h-4" /> Browse Portfolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </ClientDashboardLayout>
  );
}
