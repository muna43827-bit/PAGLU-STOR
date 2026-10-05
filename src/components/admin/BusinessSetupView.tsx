import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, ArrowRight, Store, Phone, MapPin, Globe, Image as ImageIcon, Check } from 'lucide-react';
import { Business } from '../../types';

interface BusinessSetupViewProps {
  business: Business;
  onSaveBusiness: (updated: Business) => void;
  onPreviewStore: () => void;
  onNextStep: () => void;
}

const CATEGORIES = [
  'Restaurant',
  'Cafe',
  'Bakery',
  'Salon',
  'Barber',
  'Boutique',
  'Grocery',
  'Juice Shop',
  'Other',
];

export const BusinessSetupView: React.FC<BusinessSetupViewProps> = ({
  business,
  onSaveBusiness,
  onPreviewStore,
  onNextStep,
}) => {
  const [formData, setFormData] = useState<Business>({ ...business });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Business name is required';
    if (!formData.category) errs.category = 'Please select a category';
    if (!formData.whatsapp.trim()) {
      errs.whatsapp = 'WhatsApp number is required';
    } else if (formData.whatsapp.replace(/[^0-9]/g, '').length < 8) {
      errs.whatsapp = 'Please enter a valid WhatsApp phone number with country code';
    }
    if (!formData.address.trim()) errs.address = 'Store address is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent, proceedToNext = false) => {
    e.preventDefault();
    if (!validate()) return;

    onSaveBusiness(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    if (proceedToNext) {
      onNextStep();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#292E3A]/60">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNextStep}
            className="p-2 rounded-xl bg-[#151923] border border-[#292E3A] text-[#A8ADBA] hover:text-[#F7F7F7] cursor-pointer"
            title="Next Step"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F7F7F7]">
              Create New Business
            </h1>
            <p className="text-xs text-[#A8ADBA] mt-0.5">
              Fill in the details below to create your online store.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onPreviewStore}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#F7F7F7] bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/40 hover:text-[#FFDF67] transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#FFC928]" />
          <span>Preview Store</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#10131A] border border-[#FFC928]/40 text-[#FFDF67] text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-[#FFC928]" />
          <span>Business details saved successfully and synced to your live store!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={e => handleSubmit(e, false)} className="space-y-5">
        {/* Business Name */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
            Business Name <span className="text-[#FFC928]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Royal Burger"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors ${
                errors.name ? 'border-red-500' : 'border-[#292E3A]'
              }`}
            />
          </div>
          {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
            Category <span className="text-[#FFC928]">*</span>
          </label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928] transition-colors ${
              errors.category ? 'border-red-500' : 'border-[#292E3A]'
            }`}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-[#10131A] text-[#F7F7F7]">
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-[11px] text-red-400 mt-1">{errors.category}</p>}
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
            WhatsApp Number <span className="text-[#FFC928]">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+91 98765 43210"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors ${
                errors.whatsapp ? 'border-red-500' : 'border-[#292E3A]'
              }`}
            />
          </div>
          <p className="text-[10px] text-[#A8ADBA] mt-1">
            Orders from customers will directly be sent to this WhatsApp number. Include country code (e.g. +91).
          </p>
          {errors.whatsapp && <p className="text-[11px] text-red-400 mt-1">{errors.whatsapp}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
            Address <span className="text-[#FFC928]">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
            placeholder="123 Food Street, Green Park, Bhopal"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors ${
              errors.address ? 'border-red-500' : 'border-[#292E3A]'
            }`}
          />
          {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
        </div>

        {/* Google Maps Link */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
            Google Maps Link (Optional)
          </label>
          <input
            type="url"
            value={formData.mapsUrl}
            onChange={e => setFormData({ ...formData, mapsUrl: e.target.value })}
            placeholder="https://maps.google.com/..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors"
          />
          <p className="text-[10px] text-[#A8ADBA] mt-1">
            Adds a direct 📍 Maps button on your customer store for one-tap navigation.
          </p>
        </div>

        {/* Tagline / Banner Text */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-1.5">
            Store Tagline / Slogan
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={e => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="Fresh Burgers · Great Taste · Always"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors"
          />
        </div>

        {/* Upload Logo / Banner */}
        <div>
          <label className="block text-xs font-semibold text-[#F7F7F7] mb-2">
            Upload Logo / Banner
          </label>
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#10131A] border border-[#292E3A]">
            <img
              src={formData.logoUrl}
              alt="Store logo"
              className="w-16 h-16 rounded-xl object-cover border border-[#292E3A] shadow-md"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150';
              }}
            />
            <div className="flex-1">
              <p className="text-xs font-medium text-[#F7F7F7]">Store Branding Image</p>
              <p className="text-[11px] text-[#A8ADBA] mt-0.5">
                Displays in customer store header and promotional posters.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="Paste image URL or choose preset"
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-[#151923] border border-[#292E3A] text-[#F7F7F7] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#151923] hover:bg-[#1f2533] border border-[#292E3A] text-[#F7F7F7] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4 text-[#FFC928]" />
            <span>Save Business</span>
          </button>

          <button
            type="button"
            onClick={e => handleSubmit(e, true)}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FFC928]/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Next Step →</span>
          </button>
        </div>
      </form>
    </div>
  );
};
