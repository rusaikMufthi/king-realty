'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_PROPERTIES, INITIAL_INQUIRIES, INITIAL_APPOINTMENTS } from '@/lib/mock-data';
import { Property, LeadStatus, PropertyStatus, AppointmentStatus } from '@/types';
import { formatPrice } from '@/lib/currency';
import {
  Shield,
  ShieldAlert,
  Building,
  Users,
  Calendar,
  Plus,
  Trash2,
  BarChart3,
  TrendingUp,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'crm' | 'appointments'>('overview');

  // State management for properties CRUD in admin
  const [propertiesList, setPropertiesList] = useState<Property[]>(INITIAL_PROPERTIES);
  const [inquiriesList, setInquiriesList] = useState(INITIAL_INQUIRIES);
  const [appointmentsList, setAppointmentsList] = useState(INITIAL_APPOINTMENTS);

  // Property Modal Form state
  const [showPropForm, setShowPropForm] = useState(false);
  const [editingPropId, setEditingPropId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formDistrict, setFormDistrict] = useState('Colombo 3');
  const [formType, setFormType] = useState<Property['propertyType']>('LUXURY_APARTMENT');
  const [formBeds, setFormBeds] = useState('3');
  const [formBaths, setFormBaths] = useState('3');
  const [formSqft, setFormSqft] = useState('3500');

  // ---------------------------------------------------------------------------
  // 403 FORBIDDEN / ACCESS DENIED VIEW FOR NON-ADMIN USERS
  // Strictly verifies email against assigned Supabase Admin Gmails dataset.
  // ---------------------------------------------------------------------------
  if (role !== 'ADMIN') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="gold-card p-8 sm:p-12 rounded-3xl max-w-lg w-full border border-rose-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400 shadow-xl">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="bg-rose-950 text-rose-400 border border-rose-500/40 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full font-serif">
              403 Forbidden Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100 mt-2">
              Access Denied
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              The KING Realty Command Center & CRM is strictly restricted to assigned Supabase Admin Gmail accounts (<strong className="text-[#D4AF37]">kingrealty.admin@gmail.com</strong> & <strong className="text-[#D4AF37]">kingrealty.principal@gmail.com</strong>).
            </p>
            <p className="text-xs text-slate-400 pt-1">
              Currently signed in as: <strong className="text-slate-200">{user?.email || 'Guest / Unauthenticated User'}</strong>
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-[#18181B] border border-slate-700 text-slate-300 text-xs font-semibold hover:border-[#D4AF37] transition-all"
            >
              Return to Home
            </Link>

            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] text-xs font-bold shadow-lg"
            >
              Sign In with Admin Email
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHORIZED ADMIN DASHBOARD & CRM VIEW (Email verified via Supabase dataset)
  // ---------------------------------------------------------------------------
  const handleUpdateLeadStatus = (inqId: string, newStatus: LeadStatus) => {
    setInquiriesList((prev) =>
      prev.map((item) => (item.id === inqId ? { ...item, status: newStatus } : item))
    );
  };

  const handleUpdatePropStatus = (propId: string, newStatus: PropertyStatus) => {
    setPropertiesList((prev) =>
      prev.map((item) => (item.id === propId ? { ...item, status: newStatus } : item))
    );
  };

  const handleUpdateApptStatus = (apptId: string, newStatus: AppointmentStatus) => {
    setAppointmentsList((prev) =>
      prev.map((item) => (item.id === apptId ? { ...item, status: newStatus } : item))
    );
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) return;

    if (editingPropId) {
      setPropertiesList((prev) =>
        prev.map((p) =>
          p.id === editingPropId
            ? {
                ...p,
                title: formTitle,
                priceLKR: Number(formPrice),
                district: formDistrict,
                propertyType: formType,
                bedrooms: Number(formBeds),
                bathrooms: Number(formBaths),
                areaSqft: Number(formSqft)
              }
            : p
        )
      );
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title: formTitle,
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: 'New luxury property added via Admin Dashboard.',
        priceLKR: Number(formPrice),
        propertyType: formType,
        status: 'AVAILABLE',
        address: 'Prime Colombo Address',
        city: 'Colombo',
        district: formDistrict,
        province: 'Western Province',
        bedrooms: Number(formBeds),
        bathrooms: Number(formBaths),
        areaSqft: Number(formSqft),
        features: ['24/7 Security', 'Elevator Access', 'High Ceilings'],
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
        ],
        isFeatured: false,
        viewsCount: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setPropertiesList([newProp, ...propertiesList]);
    }

    setShowPropForm(false);
    setEditingPropId(null);
    setFormTitle('');
    setFormPrice('');
  };

  const handleDeleteProperty = (propId: string) => {
    setPropertiesList((prev) => prev.filter((p) => p.id !== propId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="gold-card p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37] text-[#0B0B0C] flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-serif">
              Verified Supabase Admin Session ({user?.email})
            </div>
            <h1 className="text-2xl font-bold text-slate-100 font-serif">
              Principal Agent Dashboard & CRM
            </h1>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap border-b border-[#D4AF37]/20 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'overview'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Overview Analytics
        </button>

        <button
          onClick={() => setActiveTab('properties')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'properties'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" /> Property Management ({propertiesList.length})
        </button>

        <button
          onClick={() => setActiveTab('crm')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'crm'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" /> Lead Pipeline & CRM ({inquiriesList.length})
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'appointments'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> Viewing Requests ({appointmentsList.length})
        </button>
      </div>

      {/* OVERVIEW ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="gold-card p-5 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Active Listings</div>
              <div className="text-3xl font-bold font-serif text-slate-100">{propertiesList.length}</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 100% Verified Freehold Title
              </div>
            </div>

            <div className="gold-card p-5 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Inquiries & Leads</div>
              <div className="text-3xl font-bold font-serif gold-gradient-text">{inquiriesList.length}</div>
              <div className="text-[11px] text-[#D4AF37]">Active Lead Pipeline</div>
            </div>

            <div className="gold-card p-5 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Pending Viewings</div>
              <div className="text-3xl font-bold font-serif text-amber-400">{appointmentsList.length}</div>
              <div className="text-[11px] text-amber-400">On-site Meetings Scheduled</div>
            </div>

            <div className="gold-card p-5 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Views Traffic</div>
              <div className="text-3xl font-bold font-serif text-slate-100">10,640+</div>
              <div className="text-[11px] text-slate-400">Colombo & International Expat</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 font-serif">Recent High-Priority Inquiries</h3>
            <div className="space-y-3 text-xs">
              {inquiriesList.map((inq) => (
                <div key={inq.id} className="bg-[#18181B] p-4 rounded-xl border border-[#D4AF37]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="font-bold text-slate-100">{inq.name} ({inq.phone})</div>
                    <div className="text-slate-400 mt-0.5">{inq.propertyTitle} — “{inq.message}”</div>
                  </div>
                  <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-1 rounded text-[10px] uppercase font-bold">
                    Status: {inq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROPERTY MANAGEMENT */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-100 font-serif">Property Inventory</h3>
            <button
              onClick={() => {
                setEditingPropId(null);
                setFormTitle('');
                setFormPrice('');
                setShowPropForm(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Add New Property Listing
            </button>
          </div>

          {showPropForm && (
            <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/40 space-y-4 max-w-xl mx-auto">
              <h4 className="text-lg font-bold font-serif gold-gradient-text">
                {editingPropId ? 'Edit Property Details' : 'Publish New Property'}
              </h4>
              <form onSubmit={handleSaveProperty} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cinnamon Gardens Heritage Estate"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg p-2.5 text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Price LKR *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 450000000"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg p-2.5 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">District / Zone</label>
                    <select
                      value={formDistrict}
                      onChange={(e) => setFormDistrict(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-lg p-2.5 text-slate-100"
                    >
                      <option value="Colombo 3">Colombo 3</option>
                      <option value="Colombo 7">Colombo 7</option>
                      <option value="Colombo Suburbs">Rajagiriya / Nawala</option>
                      <option value="Matara / Galle Coast">Mirissa & Coast</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0B0C] font-bold">
                    Save & Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPropForm(false)}
                    className="px-4 py-2.5 rounded-lg bg-[#18181B] text-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="glass-panel rounded-2xl border border-[#D4AF37]/30 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#18181B] text-[#D4AF37] font-serif border-b border-[#D4AF37]/20 uppercase">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {propertiesList.map((p) => (
                  <tr key={p.id} className="hover:bg-[#18181B]/50">
                    <td className="p-4 font-bold text-slate-100">{p.title}</td>
                    <td className="p-4">{p.district}</td>
                    <td className="p-4 font-semibold text-[#D4AF37]">{formatPrice(p.priceLKR, 'LKR', true)}</td>
                    <td className="p-4">
                      <select
                        value={p.status}
                        onChange={(e) => handleUpdatePropStatus(p.id, e.target.value as PropertyStatus)}
                        className="bg-[#18181B] border border-[#D4AF37]/30 rounded px-2 py-1 text-slate-100 text-[11px]"
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="RESERVED">RESERVED</option>
                        <option value="UNDER_NEGOTIATION">UNDER_NEGOTIATION</option>
                        <option value="SOLD">SOLD</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteProperty(p.id)}
                        className="p-1.5 rounded bg-rose-950 text-rose-400 hover:bg-rose-900"
                        title="Delete Property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD PIPELINE CRM */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-100 font-serif">Lead Pipeline CRM Kanban</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inquiriesList.map((inq) => (
              <div key={inq.id} className="gold-card p-5 rounded-2xl space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-100 text-sm">{inq.name}</span>
                  <span className="text-[#D4AF37] font-semibold">{inq.phone}</span>
                </div>
                <p className="text-slate-400 italic">“{inq.message}”</p>
                <div className="pt-2 border-t border-[#D4AF37]/15">
                  <label className="block text-slate-400 mb-1 font-semibold">Change Lead Status:</label>
                  <select
                    value={inq.status}
                    onChange={(e) => handleUpdateLeadStatus(inq.id, e.target.value as LeadStatus)}
                    className="w-full bg-[#18181B] border border-[#D4AF37]/40 rounded p-2 text-slate-100 font-bold"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="VIEWING_SCHEDULED">VIEWING_SCHEDULED</option>
                    <option value="NEGOTIATING">NEGOTIATING</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEWING APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-100 font-serif">Property Viewing Requests</h3>
          <div className="space-y-4 text-xs">
            {appointmentsList.map((appt) => (
              <div key={appt.id} className="gold-card p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="font-bold text-sm text-slate-100 font-serif">{appt.clientName} ({appt.clientPhone})</div>
                  <div className="text-slate-300 font-semibold">{appt.propertyTitle}</div>
                  <div className="text-slate-400 mt-1">Requested Date: {appt.preferredDate} at {appt.preferredTime}</div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={appt.status}
                    onChange={(e) => handleUpdateApptStatus(appt.id, e.target.value as AppointmentStatus)}
                    className="bg-[#18181B] border border-[#D4AF37]/40 rounded p-2 text-slate-100 font-bold"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="RESCHEDULED">RESCHEDULED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
