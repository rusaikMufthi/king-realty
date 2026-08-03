'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { INITIAL_PROPERTIES, INITIAL_BLOG_POSTS, INITIAL_TESTIMONIALS } from '@/lib/mock-data';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Search, MapPin, Building2, ShieldCheck, Award, Users, ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const featuredProperties = INITIAL_PROPERTIES.filter((p) => p.isFeatured).slice(0, 3);
  const latestProperties = INITIAL_PROPERTIES.slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDistrict) params.set('district', searchDistrict);
    if (searchCategory) params.set('category', searchCategory);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Gold Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85"
            alt="Colombo Luxury Real Estate"
            fill
            className="object-cover object-center opacity-35 filter contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Crown Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B]/80 border border-[#D4AF37]/40 shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest gold-gradient-text uppercase font-serif">
              Sri Lanka’s Premier Independent Real Estate Advisory
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif text-slate-100 tracking-tight leading-none">
            Exclusive Properties.<br />
            <span className="gold-gradient-text">Uncompromised Luxury.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Curated ultra-luxury penthouses in Colombo 3 & 7, colonial heritage estates, beachfront Southern villas, and prime investment land for discerning Sri Lankan and international buyers.
          </p>

          {/* Quick Search Widget */}
          <form
            onSubmit={handleHeroSearch}
            className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/40 max-w-4xl mx-auto shadow-2xl space-y-3 sm:space-y-0 sm:flex items-center gap-3"
          >
            <div className="flex-1 flex items-center gap-2 bg-[#18181B] border border-[#D4AF37]/20 rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <select
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#18181B]">Select Location / District...</option>
                <option value="Colombo 3" className="bg-[#18181B]">Colombo 3 (Kollupitiya)</option>
                <option value="Colombo 7" className="bg-[#18181B]">Colombo 7 (Cinnamon Gardens)</option>
                <option value="Colombo Suburbs" className="bg-[#18181B]">Rajagiriya & Nawala</option>
                <option value="Matara / Galle Coast" className="bg-[#18181B]">Mirissa & Southern Coast</option>
                <option value="Galle" className="bg-[#18181B]">Galle Fort</option>
              </select>
            </div>

            <div className="flex-1 flex items-center gap-2 bg-[#18181B] border border-[#D4AF37]/20 rounded-xl px-3 py-2.5">
              <Building2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#18181B]">All Property Types...</option>
                <option value="LUXURY_APARTMENT" className="bg-[#18181B]">Luxury Apartment & Penthouse</option>
                <option value="RESIDENTIAL_HOUSE" className="bg-[#18181B]">Colonial Bungalow & Villa</option>
                <option value="BEACHFRONT_VILLA" className="bg-[#18181B]">Beachfront / Cliffside Villa</option>
                <option value="COMMERCIAL" className="bg-[#18181B]">Commercial Property</option>
                <option value="LAND_PLOTS" className="bg-[#18181B]">Prime Land Plot</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Explore Portfolio</span>
            </button>
          </form>
        </div>
      </section>

      {/* QUICK STATS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/25 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-serif gold-gradient-text">LKR 18+ Bn</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Transaction Volume</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-serif gold-gradient-text">100%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Clear Title Verified</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-serif gold-gradient-text">15+ Yrs</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Colombo Market Expertise</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-serif gold-gradient-text">98%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
              Handpicked Residences
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif mt-1">
              Featured Luxury Listings
            </h2>
          </div>

          <Link
            href="/properties"
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1.5"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE KING REALTY */}
      <section className="bg-[#08080A] py-16 border-y border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
              The KING Realty Advantage
            </span>
            <h2 className="text-3xl font-bold text-slate-100 font-serif">
              Why Discerning Clients Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Operating without the overhead of corporate sales teams allows KING Realty to offer personal, direct, and completely transparent real estate advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gold-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-serif">Direct Principal Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You work directly with the founder and principal agent for every viewing, contract negotiation, and title transfer—never passed down to junior reps.
              </p>
            </div>

            <div className="gold-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-serif">100% Legal & Title Rigor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every property listing undergoes strict land registry extract checks, non-vesting verification, and surveyor plan validation prior to publication.
              </p>
            </div>

            <div className="gold-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-serif">Tailored Expat Services</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialized remote assistance, virtual 3D walk-throughs, and legal power-of-attorney guidance for Sri Lankan expatriates and foreign buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET PRINCIPAL AGENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gold-card p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl flex-shrink-0 bg-[#18181B]">
            <Image
              src="/agent-mudhassir.jpg"
              alt="MUDHASSIR SHAREEF - KING Realty Principal Real Estate Agent"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-4 text-center lg:text-left flex-1">
            <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
              Personal Brand & Reputation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 font-serif">
              Meet Your Agent: MUDHASSIR SHAREEF
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              “My commitment is simple: absolute transparency, rapid response, and finding the perfect match between high-net-worth buyers and exceptional Sri Lankan properties.”
            </p>
            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/agent"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs hover:brightness-110 shadow-lg"
              >
                Read Mudhassir Shareef&apos;s Profile & Credentials
              </Link>
              <a
                href="https://wa.me/94776937333?text=Hello%20Mudhassir%20Shareef,%20I%20am%20inquiring%20about%20a%20property."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/40"
              >
                Direct WhatsApp Chat (+94 77 693 7333)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
            Client Success
          </span>
          <h2 className="text-3xl font-bold text-slate-100 font-serif">Words from Our Buyers & Sellers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TESTIMONIALS.map((item) => (
            <div key={item.id} className="gold-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#D4AF37]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  “{item.content}”
                </p>
              </div>
              <div className="pt-4 border-t border-[#D4AF37]/15">
                <div className="text-sm font-bold text-slate-100 font-serif">{item.clientName}</div>
                <div className="text-[11px] text-[#D4AF37] mt-0.5">{item.roleTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST BLOG ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-[#D4AF37]/20 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase font-serif">
              Market Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif mt-1">
              Latest Insights & Legal Guides
            </h2>
          </div>
          <Link href="/blog" className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_BLOG_POSTS.map((post) => (
            <div key={post.id} className="gold-card rounded-2xl overflow-hidden group flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0B0B0C]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-bold px-2.5 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-slate-100 group-hover:text-[#D4AF37] transition-colors line-clamp-2 font-serif">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:underline pt-2"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
