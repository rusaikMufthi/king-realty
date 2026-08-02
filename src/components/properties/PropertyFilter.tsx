'use client';

import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export interface FilterState {
  keyword: string;
  district: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  sortBy: string;
}

interface PropertyFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/30 mb-8 space-y-4">
      {/* Top Search Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            placeholder="Search by title, road, area, key features (e.g. Colombo 3, pool, ocean)..."
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
            <option value="popular">Sort: Most Viewed</option>
          </select>

          <button
            onClick={onReset}
            className="px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-slate-700 text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Reset Filters"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Filter Grid Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[#D4AF37]/10 text-xs">
        {/* District Taxonomy */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">District / Zone</label>
          <select
            value={filters.district}
            onChange={(e) => handleChange('district', e.target.value)}
            className="w-full bg-[#18181B] border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Locations</option>
            <option value="Colombo 3">Colombo 3 (Kollupitiya)</option>
            <option value="Colombo 7">Colombo 7 (Cinnamon Gardens)</option>
            <option value="Colombo Suburbs">Colombo Suburbs (Rajagiriya / Nawala)</option>
            <option value="Matara / Galle Coast">Southern Coast (Mirissa / Galle)</option>
            <option value="Galle">Galle Fort & Coastal</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            className="w-full bg-[#18181B] border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Categories</option>
            <option value="LUXURY_APARTMENT">Luxury Apartment & Penthouse</option>
            <option value="RESIDENTIAL_HOUSE">Colonial Bungalow & Villa</option>
            <option value="BEACHFRONT_VILLA">Beachfront / Cliffside Villa</option>
            <option value="COMMERCIAL">Commercial / Heritage</option>
            <option value="LAND_PLOTS">Prime Land Plots</option>
          </select>
        </div>

        {/* Bedrooms Min */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">Min Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
            className="w-full bg-[#18181B] border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">Any Beds</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Max Budget LKR */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">Max Budget (LKR)</label>
          <select
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-full bg-[#18181B] border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">No Max Limit</option>
            <option value="200000000">Up to LKR 200 Mn</option>
            <option value="400000000">Up to LKR 400 Mn</option>
            <option value="600000000">Up to LKR 600 Mn</option>
            <option value="800000000">Up to LKR 800 Mn</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
        <span>Showing <strong className="text-[#D4AF37]">{totalResults}</strong> exclusive listings</span>
      </div>
    </div>
  );
};
