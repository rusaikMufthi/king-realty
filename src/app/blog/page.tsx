'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { INITIAL_BLOG_POSTS } from '@/lib/mock-data';
import { Search, ArrowRight, Tag, BookOpen } from 'lucide-react';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Investment Advice', 'Legal Advice', 'Market Trends', 'Neighborhood Guides'];

  const filteredPosts = INITIAL_BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'ALL' && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTags = post.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif">
          <BookOpen className="w-3.5 h-3.5" /> Market Intelligence & Insights
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif">
          Sri Lanka Real Estate Journal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Expert legal checklists, Colombo market appreciation breakdowns, and investment advice curated for buyers, sellers, and expats.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#0B0B0C]'
                  : 'bg-[#18181B] border border-[#D4AF37]/20 text-slate-300 hover:text-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            placeholder="Search articles & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400">
          No articles match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="gold-card rounded-2xl overflow-hidden group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative h-52 w-full overflow-hidden">
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

                <div className="px-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#D4AF37] transition-colors font-serif leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[#D4AF37]/15 flex justify-between items-center">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Tag className="w-3 h-3 text-[#D4AF37]" />
                  <span>{post.tags[0]}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
