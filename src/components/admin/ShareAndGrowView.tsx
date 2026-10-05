import React, { useEffect, useState } from 'react';
import { Crown, QrCode, Download, ExternalLink, MessageCircle, Printer, Sparkles, Share2 } from 'lucide-react';
import { Business } from '../../types';
import { generateQrDataUrl, downloadQrCode } from '../../utils/qr';
import { getDirectWhatsAppChatUrl } from '../../utils/whatsapp';

interface ShareAndGrowViewProps {
  business: Business;
  onOpenStore: () => void;
  onToast: (msg: string) => void;
}

export const ShareAndGrowView: React.FC<ShareAndGrowViewProps> = ({
  business,
  onOpenStore,
  onToast,
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');

  const storeUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?store=${business.slug || 'royal-burger'}`
    : `https://quickstore.in/${business.slug || 'royal-burger'}`;

  useEffect(() => {
    generateQrDataUrl(storeUrl, 400).then(setQrUrl);
  }, [storeUrl]);

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Print not supported in this frame', err);
      onToast('Please use Download Standee QR');
    }
  };

  const handleDownloadPoster = () => {
    if (qrUrl) {
      downloadQrCode(qrUrl, `${business.slug}-table-poster.png`);
      onToast('Poster QR downloaded!');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="text-center pb-2">
        <h1 className="font-display font-extrabold text-2xl text-[#F7F7F7] flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFC928]" />
          <span>Share & Grow Your Orders</span>
        </h1>
        <p className="text-xs text-[#A8ADBA] mt-1">
          Print this luxury standee / poster for your dining tables, counter, and social media.
        </p>
      </div>

      {/* Poster Card matching Reference Screen 9 */}
      <div
        id="printable-poster"
        className="relative rounded-3xl p-8 bg-gradient-to-b from-[#151923] via-[#0E1117] to-[#07080C] border-2 border-[#FFC928]/40 shadow-2xl flex flex-col items-center text-center overflow-hidden"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FFC928]/50 rounded-tl-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#FFC928]/50 rounded-tr-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FFC928]/50 rounded-bl-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FFC928]/50 rounded-br-3xl pointer-events-none"></div>

        {/* Crown Logo */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] shadow-lg shadow-[#FFC928]/30 mb-3">
          <Crown className="w-8 h-8 fill-current" />
        </div>

        {/* Business Title */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F7F7F7] tracking-tight">
          {business.name}
        </h2>
        <p className="text-xs text-[#A8ADBA] mt-0.5">{business.category}</p>

        {/* Big Bold Headline matching Reference */}
        <div className="my-5 py-2 px-4 rounded-xl bg-[#FFC928]/10 border border-[#FFC928]/30">
          <p className="font-display font-black text-lg sm:text-xl text-[#FFDF67] tracking-wide uppercase">
            SCAN & ORDER
          </p>
          <p className="text-xs font-bold tracking-widest text-[#F7F7F7] uppercase mt-0.5">
            DIRECTLY ON WHATSAPP
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-white mb-6 relative group">
          {qrUrl ? (
            <img src={qrUrl} alt="Store QR" className="w-56 h-56 sm:w-64 sm:h-64 object-contain" />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-400">
              <QrCode className="w-16 h-16 animate-pulse" />
            </div>
          )}
        </div>

        {/* 3 Icon Buttons matching Reference */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-6">
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#10131A] border border-[#292E3A]">
            <QrCode className="w-5 h-5 text-[#FFC928] mb-1" />
            <span className="text-[11px] font-semibold text-[#F7F7F7]">Scan QR</span>
          </div>

          <button
            onClick={onOpenStore}
            className="flex flex-col items-center p-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] hover:border-[#FFC928]/50 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-5 h-5 text-[#FFDF67] mb-1" />
            <span className="text-[11px] font-semibold text-[#F7F7F7]">View Menu</span>
          </button>

          <a
            href={getDirectWhatsAppChatUrl(business.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center p-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] hover:border-[#25D366]/50 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] mb-1" />
            <span className="text-[11px] font-semibold text-[#F7F7F7]">WhatsApp</span>
          </a>
        </div>

        {/* Slogan Footer */}
        <p className="text-xs text-[#A8ADBA] font-medium tracking-wide">
          {business.tagline || 'Good Food · Great Taste · Always'}
        </p>
      </div>

      {/* Action tool buttons */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151923] hover:bg-[#1e2433] border border-[#292E3A] text-xs font-semibold text-[#F7F7F7] cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4 text-[#FFC928]" />
          <span>Print Poster</span>
        </button>

        <button
          onClick={handleDownloadPoster}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-bold shadow-lg shadow-[#FFC928]/20 cursor-pointer transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Standee QR</span>
        </button>
      </div>
    </div>
  );
};
