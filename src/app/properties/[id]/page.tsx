'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_PROPERTIES } from '@/lib/mock-data';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { formatPrice } from '@/lib/currency';
import { ViewingModal } from '@/components/properties/ViewingModal';
import { MortgageCalc } from '@/components/properties/MortgageCalc';
import { PropertyCard } from '@/components/properties/PropertyCard';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  Share2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Building,
  School,
  Hospital,
  ShoppingCart,
  Compass,
  FileText,
  Video
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SinglePropertyPage({ params }: PageProps) {
  const { id } = use(params);
  const property = INITIAL_PROPERTIES.find((p) => p.id === id || p.slug === id);

  if (!property) {
    notFound();
  }

  const { currency } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'virtualtour'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  const similarProperties = INITIAL_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.district === property.district || p.propertyType === property.propertyType)
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-[#D4AF37]">Properties</Link>
          <span>/</span>
          <span className="text-[#D4AF37] font-semibold">{property.district}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`px-4 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
              favorited
                ? 'bg-rose-600 border-rose-500 text-white'
                : 'bg-[#18181B] border-[#D4AF37]/30 text-slate-200 hover:text-[#D4AF37]'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            <span>{favorited ? 'Saved in Wishlist' : 'Save Property'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-lg bg-[#18181B] border border-[#D4AF37]/30 text-slate-200 hover:text-[#D4AF37] text-xs font-semibold flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Price Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-[#D4AF37]/20 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md">
              {property.propertyType.replace('_', ' ')}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {property.address}, {property.district}, {property.city}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 font-serif">
            {property.title}
          </h1>
        </div>

        <div className="text-left lg:text-right">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Guide Price</div>
          <div className="text-3xl sm:text-4xl font-bold gold-gradient-text">
            {formatPrice(property.priceLKR, currency)}
          </div>
          {property.priceUSD && (
            <div className="text-xs text-slate-400 mt-1">
              Estimated USD: ${property.priceUSD.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery & Media Switcher */}
      <div className="space-y-4">
        {/* Large Main Display */}
        <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden bg-slate-900 border border-[#D4AF37]/30 shadow-2xl">
          <Image
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-slate-200">
            Image {activeImageIndex + 1} of {property.images.length}
          </div>
        </div>

        {/* Thumbnail Row */}
        {property.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIndex === idx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Navigation: Overview | Floor Plan | Virtual Tour */}
      <div className="flex items-center gap-4 border-b border-[#D4AF37]/20 pb-2 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'overview'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Overview & Specs
        </button>
        <button
          onClick={() => setActiveTab('floorplan')}
          className={`pb-2 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'floorplan'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" /> Architectural Floor Plan
        </button>
        {property.virtualTourUrl && (
          <button
            onClick={() => setActiveTab('virtualtour')}
            className={`pb-2 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'virtualtour'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4" /> 3D Virtual Tour
          </button>
        )}
      </div>

      {/* Main Grid: Left Details & Right Schedule Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-10">
          {activeTab === 'overview' && (
            <>
              {/* Specification Grid */}
              <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
                    <Bed className="w-4 h-4 text-[#D4AF37]" /> Bedrooms
                  </div>
                  <div className="text-xl font-bold text-slate-100 font-serif mt-1">
                    {property.bedrooms || 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
                    <Bath className="w-4 h-4 text-[#D4AF37]" /> Bathrooms
                  </div>
                  <div className="text-xl font-bold text-slate-100 font-serif mt-1">
                    {property.bathrooms || 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
                    <Maximize className="w-4 h-4 text-[#D4AF37]" /> Built Area
                  </div>
                  <div className="text-xl font-bold text-slate-100 font-serif mt-1">
                    {property.areaSqft ? `${property.areaSqft.toLocaleString()} sqft` : 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-xs flex items-center justify-center gap-1">
                    <Compass className="w-4 h-4 text-[#D4AF37]" /> Land Extent
                  </div>
                  <div className="text-xl font-bold text-slate-100 font-serif mt-1">
                    {property.landSizePerch ? `${property.landSizePerch} Perches` : 'Condominium'}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-100 font-serif">Property Narrative</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Key Features & Amenities */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-100 font-serif">Luxury Amenities & Inclusions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-[#18181B] border border-[#D4AF37]/20 p-3 rounded-xl text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Nearby Facilities */}
              <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
                <h3 className="text-lg font-bold text-slate-100 font-serif">Nearby Neighborhood Facilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <School className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-semibold text-slate-100">Top Schools</div>
                      <div className="text-slate-400 text-[11px]">Royal College / CIS Colombo (1.2 km)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hospital className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-semibold text-slate-100">Hospitals & Clinics</div>
                      <div className="text-slate-400 text-[11px]">Durdans & Asiri Medical (0.8 km)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-semibold text-slate-100">Supermarkets & Malls</div>
                      <div className="text-slate-400 text-[11px]">Cargills Food City & One Galle Face (1.5 km)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-semibold text-slate-100">Expressway Access</div>
                      <div className="text-slate-400 text-[11px]">Port City / Katunayake Highway (10 mins)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <MortgageCalc propertyPriceLKR={property.priceLKR} />
            </>
          )}

          {activeTab === 'floorplan' && (
            <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 text-center space-y-4">
              <h3 className="text-xl font-bold font-serif text-slate-100">Architectural Floor Plan</h3>
              <div className="relative h-96 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural Floor Plan"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <p className="text-xs text-slate-400">
                Detailed CAD blueprints and structural load reports are available upon verified inquiry.
              </p>
            </div>
          )}

          {activeTab === 'virtualtour' && (
            <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 text-center space-y-4">
              <h3 className="text-xl font-bold font-serif text-slate-100">3D Matterport Virtual Walkthrough</h3>
              <div className="h-96 w-full rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center space-y-3 p-6">
                <Video className="w-12 h-12 text-[#D4AF37]" />
                <p className="text-xs text-slate-300 max-w-sm">
                  Interactive 3D Virtual Walkthrough loaded for remote viewing. Request a guided live video call session with the principal agent.
                </p>
                <button
                  onClick={() => setViewingModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs hover:brightness-110"
                >
                  Book Live Video Walkthrough
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Column: Schedule & Agent CTA */}
        <div className="space-y-6">
          <div className="gold-card p-6 rounded-2xl border border-[#D4AF37]/40 space-y-5 sticky top-28">
            <div className="border-b border-[#D4AF37]/20 pb-3">
              <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-serif font-bold">
                Private Advisory
              </span>
              <h3 className="text-lg font-bold text-slate-100 font-serif">Schedule Private Viewing</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Met on-site by KING Realty principal agent.
              </p>
            </div>

            <button
              onClick={() => setViewingModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Schedule On-Site Viewing
            </button>

            <a
              href={`https://wa.me/94777778888?text=I%20am%20interested%20in%20viewing%20${encodeURIComponent(property.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#18181B] border border-emerald-500/50 text-emerald-400 font-semibold text-xs hover:bg-emerald-950/40 transition-all flex items-center justify-center gap-2"
            >
              Direct WhatsApp Inquiry
            </a>

            <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                  alt="Agent"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-100 font-serif">KING Realty Lead Agent</div>
                <div className="text-slate-400">+94 77 777 8888</div>
                <div className="text-[#D4AF37] text-[10px]">Licensed Colombo Broker</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings Section */}
      {similarProperties.length > 0 && (
        <div className="pt-10 border-t border-[#D4AF37]/20 space-y-6">
          <h3 className="text-2xl font-bold font-serif text-slate-100">
            Similar Prime Listings You May Consider
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </div>
      )}

      {/* Schedule Viewing Modal */}
      <ViewingModal
        property={property}
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
      />
    </div>
  );
}
