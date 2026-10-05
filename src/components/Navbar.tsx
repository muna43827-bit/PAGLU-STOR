import React from 'react';
import { ExternalLink, Crown, ShoppingBag, LayoutDashboard, Grid, LogOut, User } from 'lucide-react';
import { Business } from '../types';

interface NavbarProps {
  currentView: 'admin' | 'store' | 'showcase';
  onViewChange: (view: 'admin' | 'store' | 'showcase') => void;
  business: Business;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  business,
  isLoggedIn,
  onOpenLogin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080C]/90 backdrop-blur-md border-b border-[#292E3A]/80 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onViewChange('admin')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] shadow-md shadow-[#FFC928]/20 group-hover:scale-105 transition-transform">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-[#F7F7F7] tracking-tight flex items-center gap-1.5">
                QuickStore
              </span>
              <span className="text-[10px] text-[#A8ADBA] block tracking-wide -mt-0.5">Your Business Online</span>
            </div>
          </button>

          {/* Navigation view tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#10131A] p-1 rounded-xl border border-[#292E3A]/60">
            <button
              onClick={() => onViewChange('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'admin'
                  ? 'bg-[#151923] text-[#FFC928] border border-[#FFC928]/30 shadow-sm'
                  : 'text-[#A8ADBA] hover:text-[#F7F7F7] hover:bg-[#151923]/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>

            <button
              onClick={() => onViewChange('store')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'store'
                  ? 'bg-[#151923] text-[#FFC928] border border-[#FFC928]/30 shadow-sm'
                  : 'text-[#A8ADBA] hover:text-[#F7F7F7] hover:bg-[#151923]/50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer Store</span>
            </button>

            <button
              onClick={() => onViewChange('showcase')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'showcase'
                  ? 'bg-[#151923] text-[#FFC928] border border-[#FFC928]/30 shadow-sm'
                  : 'text-[#A8ADBA] hover:text-[#F7F7F7] hover:bg-[#151923]/50'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Reference Showcase</span>
            </button>
          </nav>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* Mobile view switcher */}
          <div className="flex md:hidden items-center gap-1 bg-[#10131A] p-1 rounded-lg border border-[#292E3A]/60">
            <button
              onClick={() => onViewChange('admin')}
              title="Admin"
              className={`p-1.5 rounded-md text-xs ${
                currentView === 'admin' ? 'bg-[#151923] text-[#FFC928]' : 'text-[#A8ADBA]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange('store')}
              title="Customer Store"
              className={`p-1.5 rounded-md text-xs ${
                currentView === 'store' ? 'bg-[#151923] text-[#FFC928]' : 'text-[#A8ADBA]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange('showcase')}
              title="Showcase Board"
              className={`p-1.5 rounded-md text-xs ${
                currentView === 'showcase' ? 'bg-[#151923] text-[#FFC928]' : 'text-[#A8ADBA]'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onViewChange('store')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10131A] text-[#F7F7F7] border border-[#292E3A] hover:border-[#FFC928]/50 hover:text-[#FFC928] transition-all cursor-pointer"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3 h-3 text-[#FFC928]" />
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden xl:inline text-xs text-[#A8ADBA] px-2 py-1 rounded bg-[#10131A] border border-[#292E3A]/50">
                {business.name}
              </span>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#A8ADBA] hover:text-[#F7F7F7] hover:bg-[#151923] border border-transparent hover:border-[#292E3A] transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#FFC928] text-[#07080C] hover:bg-[#FFDF67] transition-all shadow-md shadow-[#FFC928]/20 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
