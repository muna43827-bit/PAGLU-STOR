import React, { useState } from 'react';
import { Settings, RefreshCw, Save, Check, ShieldCheck, Database, Smartphone } from 'lucide-react';
import { Business } from '../../types';

interface SettingsViewProps {
  business: Business;
  onSaveBusiness: (updated: Business) => void;
  onResetData: () => void;
  onToast: (msg: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  business,
  onSaveBusiness,
  onResetData,
  onToast,
}) => {
  const [currency, setCurrency] = useState(business.currency || '₹');
  const [slug, setSlug] = useState(business.slug || 'royal-burger');
  const [reviewUrl, setReviewUrl] = useState(business.reviewUrl || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBusiness({
      ...business,
      currency,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      reviewUrl,
    });
    setSaved(true);
    onToast('Settings saved successfully!');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="pb-3 border-b border-[#292E3A]/60">
        <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F7F7F7] flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#FFC928]" />
          <span>Store Settings & Configuration</span>
        </h1>
        <p className="text-xs text-[#A8ADBA] mt-0.5">
          Customize currency, store URLs, and data controls.
        </p>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-[#10131A] border border-[#FFC928]/40 text-[#FFDF67] text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-[#FFC928]" />
          <span>Settings saved!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="glass-card p-5 rounded-2xl border border-[#292E3A] space-y-4">
          <h2 className="text-sm font-bold text-[#F7F7F7]">General Preferences</h2>

          <div>
            <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
              Store Currency Symbol
            </label>
            <div className="flex gap-2">
              {['₹', '$', '€', '£', 'AED', 'SAR'].map(curr => (
                <button
                  type="button"
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currency === curr
                      ? 'bg-[#FFC928] text-[#07080C]'
                      : 'bg-[#151923] text-[#A8ADBA] border border-[#292E3A]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
              Store Identifier (Slug)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A8ADBA] font-mono">quickstore.in/</span>
              <input
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#FFDF67] font-mono focus:outline-none focus:border-[#FFC928]"
              />
            </div>
            <p className="text-[10px] text-[#A8ADBA] mt-1">
              Used in QR code links and social sharing.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F7F7F7] mb-1">
              Google Review URL (Optional)
            </label>
            <input
              type="url"
              value={reviewUrl}
              onChange={e => setReviewUrl(e.target.value)}
              placeholder="https://g.page/r/..."
              className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
            />
            <p className="text-[10px] text-[#A8ADBA] mt-1">
              Prompt happy customers to rate your business on Google after successful orders.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-bold shadow-md shadow-[#FFC928]/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* Deployment & Architecture info */}
      <div className="glass-card p-5 rounded-2xl border border-[#292E3A] space-y-3">
        <h2 className="text-sm font-bold text-[#F7F7F7] flex items-center gap-2">
          <Database className="w-4 h-4 text-[#FFC928]" />
          <span>Local Storage & Zero Backend Dependency</span>
        </h2>
        <p className="text-xs text-[#A8ADBA] leading-relaxed">
          QuickStore operates directly client-side with instant persistence in browser localStorage, making it 100% compatible with GitHub Pages, Cloudflare Pages, Netlify, and custom domains without recurring database server costs.
        </p>

        <div className="pt-2 border-t border-[#292E3A]/60 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-red-400">Reset Demo Data</p>
            <p className="text-[10px] text-[#A8ADBA]">Reverts to Royal Burger initial menu & orders</p>
          </div>
          <button
            onClick={() => {
              onResetData();
              onToast('Data restored to initial demo defaults!');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
