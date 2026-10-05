import React from 'react';
import {
  Crown,
  Check,
  Star,
  ExternalLink,
  ShoppingBag,
  QrCode,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  Phone,
  MapPin,
  Flame,
} from 'lucide-react';
import { Business, Product, Order } from '../../types';

interface VisualBoardProps {
  business: Business;
  products: Product[];
  orders: Order[];
  onSelectAdminTab: (tab: 'dashboard' | 'business' | 'products' | 'orders' | 'qr' | 'share' | 'settings') => void;
  onOpenStore: () => void;
  onOpenLogin: () => void;
}

export const VisualBoard: React.FC<VisualBoardProps> = ({
  business,
  products,
  orders,
  onSelectAdminTab,
  onOpenStore,
  onOpenLogin,
}) => {
  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Visual Showcase Header Banner */}
      <div className="text-center space-y-2 py-4 border-b border-[#292E3A]/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC928]/10 border border-[#FFC928]/30 text-[#FFDF67] text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Working Concept & Visual Architecture</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#F7F7F7] tracking-tight">
          QuickStore System Reference
        </h1>
        <p className="text-xs sm:text-sm text-[#A8ADBA] max-w-xl mx-auto">
          Every screen below is fully functional. Click any card to launch its live interactive state or view the customer store.
        </p>
      </div>

      {/* 9-Panel Showcase Grid matching file_000000001fec82088badf6163977be0b.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Main Website Login */}
        <div
          onClick={onOpenLogin}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Main Website (Admin Panel)</h3>
                <p className="text-[10px] text-[#A8ADBA]">Login / Sign Up</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-4 rounded-xl bg-[#0B0D13] border border-[#292E3A] flex flex-col items-center text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] shadow-md">
              <Crown className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#F7F7F7]">QuickStore</p>
              <p className="text-[10px] text-[#A8ADBA]">Your Business, Online.</p>
            </div>
            <div className="w-full space-y-2 text-left">
              <div className="p-2 rounded-lg bg-[#151923] border border-[#292E3A] text-[10px] text-[#A8ADBA]">
                you@example.com
              </div>
              <div className="p-2 rounded-lg bg-[#151923] border border-[#292E3A] text-[10px] text-[#A8ADBA]">
                ••••••••
              </div>
              <div className="py-2 rounded-lg bg-[#FFC928] text-[#07080C] text-center font-bold text-xs">
                Login
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Click to open interactive login modal</p>
        </div>

        {/* 2. Create Business */}
        <div
          onClick={() => onSelectAdminTab('business')}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Create Business</h3>
                <p className="text-[10px] text-[#A8ADBA]">Add your business details</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-3.5 rounded-xl bg-[#0B0D13] border border-[#292E3A] space-y-2 text-[10px]">
            <div className="flex items-center justify-between text-[#FFDF67] font-bold">
              <span>{business.name}</span>
              <span className="text-[#A8ADBA] font-normal">{business.category}</span>
            </div>
            <div className="p-2 rounded bg-[#151923] text-[#F7F7F7] flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#25D366]" />
              <span>+{business.whatsapp}</span>
            </div>
            <div className="p-2 rounded bg-[#151923] text-[#A8ADBA] truncate">
              {business.address}
            </div>
            <div className="py-1.5 px-3 rounded bg-[#FFC928] text-[#07080C] font-bold text-center">
              Next Step →
            </div>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Click to edit live business information</p>
        </div>

        {/* 3. Add Products */}
        <div
          onClick={() => onSelectAdminTab('products')}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Add Products</h3>
                <p className="text-[10px] text-[#A8ADBA]">Menu, prices, photos etc.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 space-y-1.5">
            {products.slice(0, 3).map(p => (
              <div key={p.id} className="p-2 rounded-xl bg-[#0B0D13] border border-[#292E3A] flex items-center gap-2">
                <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[11px] text-[#F7F7F7] truncate">{p.name}</p>
                  <p className="text-[10px] text-[#FFDF67] font-mono-num font-bold">₹{p.price}</p>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#151923] text-[#A8ADBA]">Edit</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Click to manage products & prices</p>
        </div>

        {/* 4. Generate Store */}
        <div
          onClick={() => onSelectAdminTab('qr')}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                4
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Generate Store</h3>
                <p className="text-[10px] text-[#A8ADBA]">Get your unique link & QR code</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-3 rounded-xl bg-[#0B0D13] border border-[#292E3A] flex flex-col items-center text-center space-y-2">
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              ✓ Business Created Successfully!
            </span>
            <div className="w-20 h-20 bg-white p-1 rounded-lg">
              <QrCode className="w-full h-full text-black" />
            </div>
            <div className="flex gap-2 w-full pt-1">
              <div className="flex-1 py-1 rounded bg-[#FFC928] text-[#07080C] font-bold text-[10px]">
                Download QR
              </div>
              <div className="flex-1 py-1 rounded bg-[#151923] text-[#F7F7F7] border border-[#292E3A] text-[10px]">
                View Store
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Click to view QR & download</p>
        </div>

        {/* 5. Customer Store (Menu) */}
        <div
          onClick={onOpenStore}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                5
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Customer Store (Menu)</h3>
                <p className="text-[10px] text-[#A8ADBA]">Beautiful & mobile responsive</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#FFC928]" />
          </div>

          <div className="my-4 p-3 rounded-xl bg-[#0B0D13] border border-[#292E3A] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#F7F7F7]">👑 {business.name}</span>
              <div className="flex gap-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#151923] text-[#FFDF67]">📍 Maps</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#25D366]/20 text-[#25D366]">💬 WhatsApp</span>
              </div>
            </div>
            <div className="p-2 rounded bg-gradient-to-r from-[#151923] to-[#07080C] border border-[#292E3A] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#F7F7F7]">Good Food Good Mood</span>
              <span className="text-[9px] bg-[#FFC928] text-[#07080C] px-1.5 py-0.5 rounded font-bold">Order Now</span>
            </div>
          </div>
          <p className="text-[10px] text-[#FFC928] text-center font-semibold">Click to open full customer store</p>
        </div>

        {/* 6. Product Detail */}
        <div
          onClick={onOpenStore}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                6
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Product Detail</h3>
                <p className="text-[10px] text-[#A8ADBA]">Add to cart easily</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-3 rounded-xl bg-[#0B0D13] border border-[#292E3A] flex items-center gap-3">
            <img
              src="/src/assets/images/burger_classic_1791181550274.jpg"
              alt="Classic Burger"
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-[#F7F7F7]">Classic Burger</p>
              <p className="text-xs font-mono-num font-bold text-[#FFDF67]">₹80</p>
              <div className="flex items-center gap-1 text-[9px] text-[#FFC928] mt-0.5">
                <span>★ 4.8</span>
                <span className="text-[#A8ADBA]">(124 reviews)</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Interactive detail modal with [- 1 +] stepper</p>
        </div>

        {/* 7. Cart */}
        <div
          onClick={onOpenStore}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                7
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Cart</h3>
                <p className="text-[10px] text-[#A8ADBA]">Review & place order</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-3 rounded-xl bg-[#0B0D13] border border-[#292E3A] space-y-2 text-xs">
            <div className="flex justify-between font-bold text-[#F7F7F7]">
              <span>Your Cart (3 items)</span>
              <span className="text-[#FFDF67] font-mono-num">₹240</span>
            </div>
            <div className="py-2 px-3 rounded-lg bg-[#25D366] text-white font-bold text-center flex items-center justify-center gap-1.5 text-[11px]">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Proceed to WhatsApp</span>
            </div>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Calculates line items and totals accurately</p>
        </div>

        {/* 8. WhatsApp Order */}
        <div
          onClick={onOpenStore}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                8
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">WhatsApp Order</h3>
                <p className="text-[10px] text-[#A8ADBA]">Customer's order goes directly to shop</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-3 rounded-xl bg-[#0B141A] border border-[#292E3A] text-[10px] space-y-1.5 font-sans">
            <div className="bg-[#005C4B] text-white p-2 rounded-xl rounded-tr-none">
              <p className="font-bold text-[#FFDF67]">New Order #1024 🍔</p>
              <p className="text-[9px] text-white/90">• Classic Burger x 1 - ₹80</p>
              <p className="text-[9px] text-white/90">• Cheese Burger x 1 - ₹120</p>
              <p className="text-[9px] text-[#FFDF67] font-bold pt-1">Total: ₹240</p>
            </div>
            <div className="bg-[#202C33] text-white p-1.5 rounded-xl rounded-tl-none text-[9px]">
              Order received! Preparing now. 🙏
            </div>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Generates live wa.me link directly</p>
        </div>

        {/* 9. Share & Grow */}
        <div
          onClick={() => onSelectAdminTab('share')}
          className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/50 p-4 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292E3A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC928] text-[#07080C] font-black text-xs flex items-center justify-center">
                9
              </span>
              <div>
                <h3 className="font-bold text-xs text-[#F7F7F7]">Share & Grow</h3>
                <p className="text-[10px] text-[#A8ADBA]">Use QR, link or social media</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A8ADBA] group-hover:text-[#FFC928] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="my-4 p-3 rounded-xl bg-[#0B0D13] border border-[#FFC928]/30 text-center space-y-1">
            <p className="font-display font-black text-[11px] text-[#FFDF67] tracking-wider">
              SCAN & ORDER DIRECTLY ON WHATSAPP
            </p>
            <div className="w-14 h-14 bg-white mx-auto rounded p-0.5">
              <QrCode className="w-full h-full text-black" />
            </div>
            <p className="text-[9px] text-[#A8ADBA]">Good Food · Great Taste · Always</p>
          </div>
          <p className="text-[10px] text-[#A8ADBA] text-center">Click to view printable table standee</p>
        </div>
      </div>

      {/* Key Features matching Reference */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#292E3A]">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-[#FFC928] fill-current" />
          <h2 className="font-display font-bold text-xl text-[#F7F7F7]">Key Features</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            'Beautiful & mobile responsive store',
            'Unlimited products & categories',
            'WhatsApp ordering (direct)',
            'Google Maps integration',
            'QR code for store & ordering',
            'Custom logo, banner & branding',
            'Easy to use admin panel',
            'Fast & secure hosting',
            'Multi-business support (one panel)',
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#10131A] border border-[#292E3A]/70">
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs font-medium text-[#F7F7F7]">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Packages & Pricing matching Reference */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#FFC928]" />
          <h2 className="font-display font-bold text-xl text-[#F7F7F7]">Packages & Pricing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="glass-card p-6 rounded-3xl border border-[#292E3A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#A8ADBA] uppercase tracking-wider">STARTER</span>
              <div className="mt-2 mb-4">
                <span className="font-display font-extrabold text-3xl text-[#F7F7F7] font-mono-num">₹999</span>
                <span className="text-xs text-[#A8ADBA] ml-1">one-time</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#A8ADBA] mb-6">
                {['Digital menu', 'WhatsApp ordering', 'QR code', 'Basic setup'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC928]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onSelectAdminTab('business')}
              className="w-full py-2.5 rounded-xl bg-[#151923] hover:bg-[#1e2433] border border-[#292E3A] text-xs font-bold text-[#F7F7F7] transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Pro (Most Popular) */}
          <div className="relative glass-card-elevated p-6 rounded-3xl border-2 border-[#FFC928] shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FFC928] text-[#07080C] text-[10px] font-black uppercase tracking-wider shadow-md">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold text-[#FFDF67] uppercase tracking-wider">PRO</span>
              <div className="mt-2 mb-4">
                <span className="font-display font-extrabold text-3xl text-[#FFDF67] font-mono-num">₹2,999</span>
                <span className="text-xs text-[#A8ADBA] ml-1">one-time</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#F7F7F7] mb-6">
                {[
                  'Complete order system',
                  'Categories + photos',
                  'Cart + WhatsApp',
                  'Google Maps',
                  'Review QR',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC928] stroke-[3]" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onSelectAdminTab('business')}
              className="w-full py-3 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-extrabold shadow-lg shadow-[#FFC928]/30 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Premium */}
          <div className="glass-card p-6 rounded-3xl border border-[#292E3A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#A8ADBA] uppercase tracking-wider">PREMIUM</span>
              <div className="mt-2 mb-4">
                <span className="font-display font-extrabold text-3xl text-[#F7F7F7] font-mono-num">₹5,999</span>
                <span className="text-xs text-[#A8ADBA] ml-1">one-time</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#A8ADBA] mb-6">
                {[
                  'Everything in Pro',
                  'Custom domain',
                  'Offers / coupons',
                  'Order dashboard',
                  'Monthly updates',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC928]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onSelectAdminTab('business')}
              className="w-full py-2.5 rounded-xl bg-[#151923] hover:bg-[#1e2433] border border-[#292E3A] text-xs font-bold text-[#F7F7F7] transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Maintenance & Why Choose QuickStore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Maintenance */}
        <div className="glass-card p-6 rounded-3xl border border-[#292E3A] space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFC928]" />
            <h3 className="font-display font-bold text-lg text-[#F7F7F7]">Monthly Maintenance</h3>
          </div>
          <p className="text-xs text-[#A8ADBA]">
            Keep your store always online with our affordable optional plans:
          </p>
          <div className="p-3.5 rounded-2xl bg-[#151923] border border-[#292E3A] flex items-center justify-between">
            <span className="text-xs font-medium text-[#A8ADBA]">Service Tier</span>
            <span className="font-display font-bold text-lg text-[#FFDF67] font-mono-num">
              ₹199 – ₹499 <span className="text-xs font-normal text-[#A8ADBA]">/ month</span>
            </span>
          </div>
          <ul className="space-y-2 text-xs text-[#F7F7F7]">
            {['Hosting & security', 'Updates & support', 'New features'].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC928]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Choose QuickStore? */}
        <div className="glass-card p-6 rounded-3xl border border-[#292E3A] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-[#FFC928]" />
              <h3 className="font-display font-bold text-lg text-[#F7F7F7]">Why Choose QuickStore?</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-[#F7F7F7]">
              {[
                'Low investment, high returns',
                'Perfect for restaurants, cafes, salons, shops, etc.',
                'Easy to manage with zero technical skills',
                'Helps get more direct customer orders',
                'Build your digital brand on WhatsApp',
                'Complete solution under one roof',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FFC928]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-[#A8ADBA] font-medium pt-2 border-t border-[#292E3A]/60">
            Your Business, Our Technology ❤️
          </p>
        </div>
      </div>

      {/* Bottom Banner matching Reference graphic footer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#10131A] via-[#151923] to-[#10131A] border border-[#292E3A] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFC928] text-[#07080C] flex items-center justify-center font-bold">
            <Crown className="w-5 h-5 fill-current" />
          </div>
          <div>
            <p className="font-display font-bold text-sm text-[#F7F7F7]">QuickStore</p>
            <p className="text-xs text-[#A8ADBA]">Start your digital journey today!</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-[#FFDF67] bg-[#07080C] px-4 py-2 rounded-xl border border-[#292E3A]">
          <span>More Orders</span>
          <span>•</span>
          <span>More Customers</span>
          <span>•</span>
          <span>More Growth</span>
        </div>
      </div>
    </div>
  );
};
