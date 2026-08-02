'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { getSupabaseProfile, updateSupabaseProfile } from '@/lib/supabase-db';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { User, Mail, Phone, MapPin, Globe, CheckCircle2, Save, Sparkles, Camera, Upload, Trash2 } from 'lucide-react';

export default function ClientProfilePage() {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Avatar Picture Upload State
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(' ')[0] : 'John');
  const [lastName, setLastName] = useState(user?.name ? user.name.split(' ').slice(1).join(' ') : 'Doe');
  const [email, setEmail] = useState(user?.email || 'john.doe@example.lk');
  const [phone, setPhone] = useState(user?.phone || '+94 77 693 7333');
  const [whatsapp, setWhatsapp] = useState(user?.phone || '+94 77 693 7333');
  const [dob, setDob] = useState('1988-06-15');
  const [gender, setGender] = useState('Male');
  const [language, setLanguage] = useState('English');
  const [bio, setBio] = useState('High-net-worth real estate investor seeking luxury penthouses and coastal properties in Sri Lanka.');

  // Address
  const [country, setCountry] = useState('Sri Lanka');
  const [province, setProvince] = useState('Western Province');
  const [district, setDistrict] = useState('Colombo 3');
  const [city, setCity] = useState('Colombo');
  const [postalCode, setPostalCode] = useState('00300');

  // Property Preferences
  const [prefTypes, setPrefTypes] = useState<string[]>(['LUXURY_APARTMENT', 'BEACHFRONT_VILLA']);
  const [prefPurpose, setPrefPurpose] = useState('Buy');
  const [prefMaxBudget, setPrefMaxBudget] = useState('600000000');
  const [prefAmenities, setPrefAmenities] = useState<string[]>(['Swimming Pool', '24/7 Security', 'Smart Home']);

  // Fetch real profile from Supabase on mount
  useEffect(() => {
    if (user?.email) {
      getSupabaseProfile(user.email).then((prof) => {
        if (prof) {
          if (prof.name) {
            const parts = prof.name.split(' ');
            setFirstName(parts[0] || '');
            setLastName(parts.slice(1).join(' ') || '');
          }
          if (prof.avatarUrl) setAvatarUrl(prof.avatarUrl);
          if (prof.phone) setPhone(prof.phone);
          if (prof.whatsapp) setWhatsapp(prof.whatsapp);
          if (prof.dob) setDob(prof.dob);
          if (prof.gender) setGender(prof.gender);
          if (prof.language) setLanguage(prof.language);
          if (prof.bio) setBio(prof.bio);
          if (prof.country) setCountry(prof.country);
          if (prof.province) setProvince(prof.province);
          if (prof.district) setDistrict(prof.district);
          if (prof.city) setCity(prof.city);
          if (prof.postalCode) setPostalCode(prof.postalCode);
          if (prof.prefTypes) setPrefTypes(prof.prefTypes);
          if (prof.prefPurpose) setPrefPurpose(prof.prefPurpose);
          if (prof.prefMaxBudget) setPrefMaxBudget(prof.prefMaxBudget);
          if (prof.prefAmenities) setPrefAmenities(prof.prefAmenities);
        }
      });
    }
  }, [user]);

  // Avatar Upload Handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatarUrl(base64);
      setUploadingAvatar(false);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarUrl('');
  };

  const toggleType = (t: string) => {
    setPrefTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const toggleAmenity = (a: string) => {
    setPrefAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim();

    await updateSupabaseProfile(email, {
      name: fullName,
      avatarUrl,
      phone,
      whatsapp,
      dob,
      gender,
      language,
      bio,
      country,
      province,
      district,
      city,
      postalCode,
      prefTypes,
      prefPurpose,
      prefMaxBudget,
      prefAmenities
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <ClientDashboardLayout>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <User className="w-3.5 h-3.5" /> Supabase Synchronized Account
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">My Profile & Preferences</h1>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs hover:brightness-110 shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Sync to Supabase</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Your profile details and avatar picture have been saved to Supabase database!</span>
          </div>
        )}

        {/* SECTION 1: PROFILE PICTURE UPLOAD & EDIT */}
        <div className="gold-card p-6 sm:p-8 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-100 border-b border-[#D4AF37]/20 pb-3 flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#D4AF37]" /> Profile Photo Upload & Management
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Preview */}
            <div className="relative w-28 h-28 rounded-full bg-[#18181B] border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center flex-shrink-0 shadow-xl group">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
              ) : (
                <span className="text-3xl font-bold font-serif text-[#D4AF37]">
                  {firstName ? firstName.charAt(0).toUpperCase() : 'C'}
                </span>
              )}

              {uploadingAvatar && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-[#D4AF37] font-semibold">
                  Uploading...
                </div>
              )}
            </div>

            {/* Upload & Edit Buttons */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <label className="px-4 py-2.5 rounded-xl bg-[#18181B] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>{avatarUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="px-4 py-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Photo
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Recommended: Square JPG or PNG (Max 5MB). Stored securely in Supabase Storage.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: PERSONAL INFORMATION */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-100 border-b border-[#D4AF37]/20 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-[#D4AF37]" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
              <input
                type="email"
                required
                readOnly
                value={email}
                className="w-full bg-[#18181B]/60 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">WhatsApp Number</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Preferred Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="English">English</option>
                <option value="Sinhala">Sinhala (සිංහල)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-medium mb-1">Personal Investor Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: PROPERTY PREFERENCES */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
          <div className="border-b border-[#D4AF37]/20 pb-3 flex justify-between items-center">
            <h3 className="text-lg font-bold font-serif text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Property Investment Preferences
            </h3>
            <span className="text-[10px] text-[#D4AF37] font-semibold uppercase">Powers Recommendation AI</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-2">Preferred Categories</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'LUXURY_APARTMENT', label: 'Luxury Apartment & Penthouse' },
                  { id: 'RESIDENTIAL_HOUSE', label: 'Colonial Bungalow & Villa' },
                  { id: 'BEACHFRONT_VILLA', label: 'Beachfront Villa' },
                  { id: 'LAND_PLOTS', label: 'Prime Land Plots' },
                  { id: 'COMMERCIAL', label: 'Commercial' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleType(item.id)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      prefTypes.includes(item.id)
                        ? 'bg-[#D4AF37] text-[#0B0B0C] border-[#D4AF37]'
                        : 'bg-[#18181B] border-[#D4AF37]/30 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Purpose</label>
                <select
                  value={prefPurpose}
                  onChange={(e) => setPrefPurpose(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                >
                  <option value="Buy">Outright Purchase / Buy</option>
                  <option value="Rent">Luxury Rent</option>
                  <option value="Investment">Expat Investment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Max Budget Ceiling (LKR)</label>
                <select
                  value={prefMaxBudget}
                  onChange={(e) => setPrefMaxBudget(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-slate-100"
                >
                  <option value="300000000">Up to LKR 300 Mn</option>
                  <option value="600000000">Up to LKR 600 Mn</option>
                  <option value="900000000">Up to LKR 900 Mn</option>
                  <option value="1500000000">LKR 1.5+ Billion</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ClientDashboardLayout>
  );
}
