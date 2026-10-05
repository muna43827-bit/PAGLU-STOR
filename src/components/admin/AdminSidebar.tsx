import React from 'react';
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Package,
  QrCode,
  Settings,
  HelpCircle,
  ExternalLink,
  Crown,
} from 'lucide-react';
import { Business } from '../../types';

export type AdminTab =
  | 'dashboard'
  | 'business'
  | 'products'
  | 'orders'
  | 'qr'
  | 'share'
  | 'settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onOpenStore: () => void;
  business: Business;
  orderCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onTabChange,
  onOpenStore,
  business,
  orderCount,
}) => {
  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'business' as AdminTab, label: 'My Business', icon: Store },
    { id: 'products' as AdminTab, label: 'Products', icon: ShoppingBag },
    {
      id: 'orders' as AdminTab,
      label: 'Orders',
      icon: Package,
      badge: orderCount > 0 ? orderCount : undefined,
    },
    { id: 'qr' as AdminTab, label: 'QR Generator', icon: QrCode },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#07080C] border-b lg:border-b-0 lg:border-r border-[#292E3A] flex flex-col shrink-0">
      {/* Brand Header */}
      <div className="p-5 hidden lg:flex items-center gap-3 border-b border-[#292E3A]/60">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] shadow-lg shadow-[#FFC928]/20">
          <Crown className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h2 className="font-display font-bold text-base text-[#F7F7F7] tracking-tight">QuickStore</h2>
          <p className="text-[11px] text-[#A8ADBA] truncate max-w-[140px]">{business.name}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible no-scrollbar">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#151923] text-[#FFC928] border border-[#FFC928]/30 shadow-md shadow-black/40'
                  : 'text-[#A8ADBA] hover:text-[#F7F7F7] hover:bg-[#10131A] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFC928]' : 'text-[#A8ADBA]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="ml-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FFC928] text-[#07080C]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* View Store Direct Button */}
        <button
          onClick={onOpenStore}
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#F7F7F7] bg-[#10131A]/80 hover:bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/40 transition-all whitespace-nowrap cursor-pointer mt-0 lg:mt-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-base">🌐</span>
            <span>View Store</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#FFC928]" />
        </button>
      </nav>

      {/* Sidebar Footer info */}
      <div className="mt-auto p-4 hidden lg:block border-t border-[#292E3A]/60">
        <div className="p-3 rounded-xl bg-[#10131A] border border-[#292E3A]/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></div>
            <div>
              <p className="text-[11px] font-medium text-[#F7F7F7]">WhatsApp Live</p>
              <p className="text-[10px] text-[#A8ADBA]">Ready to receive orders</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#25D366] hover:underline"
            title="Test WhatsApp Number"
          >
            Test
          </a>
        </div>
      </div>
    </aside>
  );
};
