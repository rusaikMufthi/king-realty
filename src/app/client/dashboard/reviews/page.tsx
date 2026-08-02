'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { Star, MessageSquare, CheckCircle2, Plus, Trash2, Edit2 } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  transactionType: string;
  propertyName: string;
  isApproved: boolean;
  date: string;
}

export default function ClientReviewsPage() {
  const { user } = useAuth();
  const [formOpen, setFormOpen] = useState(false);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [transactionType, setTransactionType] = useState('Property Acquisition');
  const [propertyName, setPropertyName] = useState('The Sovereign Residence (Colombo 3)');

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      rating: 5,
      title: 'Flawless Advisory & Clean Deed Verification',
      comment: 'KING Realty handled the acquisition of our Colombo 3 penthouse with utmost transparency and professionalism. Highly recommended for high-net-worth buyers.',
      transactionType: 'Property Acquisition',
      propertyName: 'The Sovereign Residence (Colombo 3)',
      isApproved: true,
      date: '2026-07-15'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      rating,
      title,
      comment,
      transactionType,
      propertyName,
      isApproved: true,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [newRev, ...prev]);
    setTitle('');
    setComment('');
    setFormOpen(false);
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <Star className="w-3.5 h-3.5 fill-current" /> Client Advisory Reviews
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
              My Service Reviews ({reviews.length})
            </h1>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> {formOpen ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {/* Submit Review Form */}
        {formOpen && (
          <form onSubmit={handleSubmit} className="gold-card p-6 sm:p-8 rounded-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold font-serif text-slate-100 border-b border-[#D4AF37]/20 pb-2">
              Submit Client Testimonial & Review
            </h3>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Star Rating (1 to 5)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 focus:outline-none"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Review Headline Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional Service & Transparent Title Search"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Property Involved</label>
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Detailed Feedback *</label>
              <textarea
                rows={3}
                required
                placeholder="Share your experience working with KING Realty..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs shadow-md hover:brightness-110"
            >
              Publish Testimonial
            </button>
          </form>
        )}

        {/* List */}
        {reviews.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100">No Reviews Written Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Completed an advisory consultation or property purchase with KING Realty? Share your testimonial to inspire future clients.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="gold-card p-6 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                        />
                      ))}
                    </div>
                    <h3 className="text-base font-bold font-serif text-slate-100">{rev.title}</h3>
                  </div>

                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Published Testimonial
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">“{rev.comment}”</p>

                <div className="pt-2 border-t border-[#D4AF37]/15 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Property: <strong className="text-slate-200">{rev.propertyName}</strong></span>
                  <div className="flex items-center gap-3">
                    <span>{rev.date}</span>
                    <button onClick={() => deleteReview(rev.id)} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientDashboardLayout>
  );
}
