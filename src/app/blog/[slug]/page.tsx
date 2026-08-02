'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { INITIAL_BLOG_POSTS } from '@/lib/mock-data';
import { Calendar, User, Tag, ArrowLeft, Share2, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SingleBlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = INITIAL_BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to All Articles
      </Link>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-y border-[#D4AF37]/20 py-3">
          <span className="flex items-center gap-1.5 text-slate-200">
            <User className="w-4 h-4 text-[#D4AF37]" /> {post.authorName}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> {new Date(post.publishedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
          </span>
          <span>•</span>
          <span>{post.viewsCount} Reads</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
      </div>

      {/* Article Markdown / Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#D4AF37]/20 text-slate-200 text-sm leading-relaxed space-y-6 font-light">
        <p className="text-base font-semibold text-[#D4AF37] italic border-l-2 border-[#D4AF37] pl-4">
          “{post.excerpt}”
        </p>
        <div className="space-y-4 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" /> Article Tags:
          </span>
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#18181B] border border-[#D4AF37]/30 text-slate-300 text-xs px-2.5 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="pt-10 border-t border-[#D4AF37]/20 space-y-6">
          <h3 className="text-2xl font-bold font-serif text-slate-100">Related Legal & Market Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link key={rel.id} href={`/blog/${rel.slug}`} className="gold-card p-5 rounded-xl space-y-2 block group">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{rel.category}</span>
                <h4 className="text-base font-bold text-slate-100 group-hover:text-[#D4AF37] transition-colors font-serif">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
