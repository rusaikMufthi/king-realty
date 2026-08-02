'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getSupabaseSavedSearches, createSupabaseSavedSearch, deleteSupabaseSavedSearch, SavedSearch } from '@/lib/supabase-db';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { Search, Bell, Trash2, ExternalLink, Plus } from 'lucide-react';

export default function ClientSavedSearchesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupabaseSavedSearches(user?.id || 'demo-user').then((res) => {
      setSearches(res);
      setLoading(false);
    });
  }, [user]);

  const toggleNotify = (id: string) => {
    setSearches(prev => prev.map(s => s.id === id ? { ...s, notifyEmail: !s.notifyEmail } : s));
  };

  const handleDelete = async (id: string) => {
    await deleteSupabaseSavedSearch(id);
    setSearches(prev => prev.filter(s => s.id !== id));
  };

  const runSearch = (item: SavedSearch) => {
    const params = new URLSearchParams();
    if (item.district) params.set('district', item.district);
    if (item.propertyType) params.set('category', item.propertyType);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <Search className="w-3.5 h-3.5" /> Supabase Database Queries
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
              Saved Property Searches ({searches.length})
            </h1>
          </div>

          <Link
            href="/properties"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create New Saved Search
          </Link>
        </div>

        {/* List */}
        {loading ? (
          <div className="p-8 text-center text-xs text-[#D4AF37]">Loading saved searches from Supabase...</div>
        ) : searches.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100">No Saved Searches Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Save your preferred location and budget filters on the marketplace to receive instant notifications.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searches.map((item) => (
              <div key={item.id} className="gold-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold font-serif text-slate-100">{item.name}</h3>
                    <button
                      onClick={() => toggleNotify(item.id)}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                        item.notifyEmail
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]'
                          : 'bg-[#18181B] border-slate-700 text-slate-500'
                      }`}
                      title="Toggle Instant Email Alert"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{item.notifyEmail ? 'Alert Active' : 'Alert Muted'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="bg-[#18181B] p-2 rounded-lg border border-[#D4AF37]/15">
                      <span className="text-slate-400 text-[10px] block">Location</span>
                      <span className="font-semibold">{item.district}</span>
                    </div>
                    <div className="bg-[#18181B] p-2 rounded-lg border border-[#D4AF37]/15">
                      <span className="text-slate-400 text-[10px] block">Category</span>
                      <span className="font-semibold">{item.propertyType.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/15 flex justify-between items-center text-xs">
                  <button
                    onClick={() => runSearch(item)}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>Run Search</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-500 hover:text-rose-400"
                    title="Delete Saved Search"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientDashboardLayout>
  );
}
