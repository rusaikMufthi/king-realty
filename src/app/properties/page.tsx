'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_PROPERTIES } from '@/lib/mock-data';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyFilter, FilterState } from '@/components/properties/PropertyFilter';
import { LayoutGrid, List, Sparkles } from 'lucide-react';

function PropertyListingsingsContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    keyword: searchParams.get('keyword') || '',
    district: searchParams.get('district') || '',
    propertyType: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    sortBy: 'newest'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((item) => {
      if (filters.keyword) {
        const query = filters.keyword.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCity = item.city.toLowerCase().includes(query);
        const matchesDistrict = item.district.toLowerCase().includes(query);
        const matchesFeatures = item.features.some((f) => f.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCity && !matchesDistrict && !matchesFeatures) {
          return false;
        }
      }

      if (filters.district && item.district !== filters.district) {
        return false;
      }

      if (filters.propertyType && item.propertyType !== filters.propertyType) {
        return false;
      }

      if (filters.bedrooms && item.bedrooms < Number(filters.bedrooms)) {
        return false;
      }

      if (filters.maxPrice && item.priceLKR > Number(filters.maxPrice)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceLKR - b.priceLKR;
      if (filters.sortBy === 'price-desc') return b.priceLKR - a.priceLKR;
      if (filters.sortBy === 'popular') return b.viewsCount - a.viewsCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filters]);

  const handleReset = () => {
    setFilters({
      keyword: '',
      district: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      sortBy: 'newest'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Curated Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 font-serif">
            Sri Lanka Luxury Property Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified apartments in Colombo 3 & 7, colonial manors, beachfront villas, and investment plots.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-[#18181B] border border-[#D4AF37]/30 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewMode === 'grid'
                ? 'bg-[#D4AF37] text-[#0B0B0C]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewMode === 'list'
                ? 'bg-[#D4AF37] text-[#0B0B0C]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
        </div>
      </div>

      {/* Filter Component */}
      <PropertyFilter
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        totalResults={filteredProperties.length}
      />

      {/* Property Grid / List */}
      {filteredProperties.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-[#D4AF37]/30 text-center space-y-4">
          <h3 className="text-xl font-bold font-serif gold-gradient-text">No Properties Match Your Criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your budget slider, location filter, or keywords to explore available inventory.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs hover:brightness-110"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }
        >
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyListingsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Property Portfolio...</div>}>
      <PropertyListingsingsContent />
    </Suspense>
  );
}
