import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Copy, Download, ExternalLink, QrCode, Check } from 'lucide-react';
import { Business } from '../../types';
import { generateQrDataUrl, downloadQrCode } from '../../utils/qr';

interface QRGeneratorViewProps {
  business: Business;
  onOpenStore: () => void;
  onToast: (msg: string) => void;
}

export const QRGeneratorView: React.FC<QRGeneratorViewProps> = ({
  business,
  onOpenStore,
  onToast,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Generate robust shareable store URL
  // Uses window.location.origin + query param ?store=slug for static GitHub Pages compatibility
  const storeUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?store=${business.slug || 'royal-burger'}`
    : `https://quickstore.in/${business.slug || 'royal-burger'}`;

  useEffect(() => {
    let isMounted = true;
    generateQrDataUrl(storeUrl, 380).then(url => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [storeUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    onToast('Store link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (qrDataUrl) {
      downloadQrCode(qrDataUrl, `${business.slug || 'store'}-qr-code.png`);
      onToast('QR code downloaded successfully!');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-fadeIn py-4 pb-12 text-center">
      {/* Success Banner matching Reference Screen 4 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-[#F7F7F7]">
          Business Created Successfully!
        </h1>
        <p className="text-xs text-[#A8ADBA] mt-1">Your store is ready to go live.</p>
      </div>

      {/* Store URL Box with Copy button */}
      <div className="glass-card p-2 sm:p-2.5 rounded-2xl border border-[#292E3A] flex items-center justify-between gap-2 shadow-lg">
        <div className="px-3 py-1.5 overflow-hidden text-left flex-1">
          <p className="text-[10px] uppercase font-semibold text-[#A8ADBA] tracking-wider">Public Store URL</p>
          <p className="text-xs font-mono text-[#FFDF67] truncate select-all">{storeUrl}</p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-[#151923] hover:bg-[#1f2533] border border-[#292E3A] hover:border-[#FFC928]/40 text-[#F7F7F7] hover:text-[#FFC928] transition-all cursor-pointer shrink-0"
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* QR Code Container matching Reference Screen 4 */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#292E3A] flex flex-col items-center shadow-2xl relative overflow-hidden">
        {/* Glow backdrop orb */}
        <div className="absolute w-44 h-44 rounded-full bg-[#FFC928]/10 blur-3xl pointer-events-none -top-10 -right-10"></div>

        <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-white mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`${business.name} QR Code`}
              className="w-52 h-52 sm:w-56 sm:h-56 object-contain"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-slate-400">
              <QrCode className="w-12 h-12 animate-pulse" />
            </div>
          )}
        </div>

        <p className="text-xs font-medium text-[#A8ADBA]">
          Scan this QR code to open your store
        </p>
        <p className="text-[11px] text-[#A8ADBA]/70 mt-0.5">
          Customers can order directly on WhatsApp with zero app download
        </p>
      </div>

      {/* Action Buttons matching Reference Screen 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs sm:text-sm font-bold shadow-lg shadow-[#FFC928]/20 active:scale-95 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download QR</span>
        </button>

        <button
          onClick={onOpenStore}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#151923] hover:bg-[#1c2230] border border-[#292E3A] hover:border-[#FFC928]/40 text-[#F7F7F7] hover:text-[#FFDF67] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 text-[#FFC928]" />
          <span>View Store</span>
        </button>
      </div>
    </div>
  );
};
