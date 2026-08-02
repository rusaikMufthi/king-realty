'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { formatPrice } from '@/lib/currency';
import { Heart, Bed, Bath, Maximize, MapPin, Eye, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { currency } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  const getStatusBadge = (status: Property['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">Available</span>;
      case 'RESERVED':
        return <span className="bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">Reserved</span>;
      case 'UNDER_NEGOTIATION':
        return <span className="bg-blue-950/80 text-blue-300 border border-blue-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">Negotiating</span>;
      case 'SOLD':
        return <span className="bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">Sold</span>;
      default:
        return null;
    }
  };

  return (
    <div className="gold-card rounded-xl overflow-hidden group flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        <Image
          src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            {getStatusBadge(property.status)}
            {property.isFeatured && (
              <span className="bg-[#D4AF37] text-[#0B0B0C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              favorited
                ? 'bg-rose-600 border-rose-400 text-white'
                : 'bg-black/40 border-white/20 text-slate-200 hover:text-[#D4AF37] hover:border-[#D4AF37]'
            }`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* District Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-slate-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{property.district}, {property.city}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
            {property.propertyType.replace('_', ' ')}
          </span>
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#D4AF37] transition-colors line-clamp-1 mt-1">
              {property.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specifications Bar */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D4AF37]/15 text-xs text-slate-300 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Bed className="w-3.5 h-3.5 text-[#D4AF37]" /> Beds
            </span>
            <span className="font-semibold mt-0.5">{property.bedrooms || 'N/A'}</span>
          </div>

          <div className="flex flex-col items-center justify-center border-x border-[#D4AF37]/15">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Bath className="w-3.5 h-3.5 text-[#D4AF37]" /> Baths
            </span>
            <span className="font-semibold mt-0.5">{property.bathrooms || 'N/A'}</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Maximize className="w-3.5 h-3.5 text-[#D4AF37]" /> Area
            </span>
            <span className="font-semibold mt-0.5">
              {property.landSizePerch
                ? `${property.landSizePerch} Perch`
                : `${property.areaSqft.toLocaleString()} sqft`}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex justify-between items-center pt-1">
          <div>
            <div className="text-xs text-slate-400 font-medium">Guide Price</div>
            <div className="text-lg font-bold gold-gradient-text">
              {formatPrice(property.priceLKR, currency, true)}
            </div>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="px-3.5 py-2 rounded-lg bg-[#18181B] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all flex items-center gap-1.5"
          >
            <span>Details</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
