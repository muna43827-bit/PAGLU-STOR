import React from 'react';
import {
  Store,
  ShoppingBag,
  Package,
  Plus,
  ExternalLink,
  Copy,
  TrendingUp,
  Share2,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Business, Product, Order } from '../../types';
import { AdminTab } from './AdminSidebar';

interface DashboardViewProps {
  business: Business;
  products: Product[];
  orders: Order[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenStore: () => void;
  onAddProductClick: () => void;
  onCopyStoreLink: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  business,
  products,
  orders,
  onNavigateTab,
  onOpenStore,
  onAddProductClick,
  onCopyStoreLink,
}) => {
  const activeProductsCount = products.filter(p => p.isAvailable).length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#292E3A]/40">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F7F7F7] flex items-center gap-2">
            <span>Good evening</span>
            <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-[#A8ADBA] mt-1">Manage your business from one place.</p>
        </div>

        <button
          onClick={() => onNavigateTab('business')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFDF67] to-[#FFC928] text-[#07080C] font-semibold text-xs sm:text-sm shadow-lg shadow-[#FFC928]/20 hover:brightness-105 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Store className="w-4 h-4" />
          <span>Create / Edit Business</span>
        </button>
      </div>

      {/* 3 Main Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Business card */}
        <div
          onClick={() => onNavigateTab('business')}
          className="glass-card p-6 rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-[#A8ADBA] font-semibold">BUSINESS</span>
            <div className="w-9 h-9 rounded-xl bg-[#151923] flex items-center justify-center text-[#FFC928] border border-[#292E3A] group-hover:border-[#FFC928]/50 transition-colors">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-display font-bold text-xl text-[#F7F7F7] group-hover:text-[#FFDF67] transition-colors truncate">
            {business.name || 'Set Up Business'}
          </h3>
          <p className="text-xs text-[#A8ADBA] mt-1">Your online store · {business.category}</p>
          <div className="mt-4 pt-3 border-t border-[#292E3A]/60 flex items-center justify-between text-xs text-[#A8ADBA]">
            <span className="truncate">{business.address.split(',')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFC928] group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </div>

        {/* Products card */}
        <div
          onClick={() => onNavigateTab('products')}
          className="glass-card p-6 rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-[#A8ADBA] font-semibold">PRODUCTS</span>
            <div className="w-9 h-9 rounded-xl bg-[#151923] flex items-center justify-center text-[#FFC928] border border-[#292E3A] group-hover:border-[#FFC928]/50 transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-[#F7F7F7] font-mono-num">
              {activeProductsCount}
            </span>
            <span className="text-xs text-[#A8ADBA]">Active items</span>
          </div>
          <p className="text-xs text-[#A8ADBA] mt-1">In {business.category} catalog</p>
          <div className="mt-4 pt-3 border-t border-[#292E3A]/60 flex items-center justify-between text-xs text-[#A8ADBA]">
            <span>Manage Menu & Prices</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFC928] group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </div>

        {/* Orders card */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="glass-card p-6 rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-[#A8ADBA] font-semibold">ORDERS</span>
            <div className="w-9 h-9 rounded-xl bg-[#151923] flex items-center justify-center text-[#FFC928] border border-[#292E3A] group-hover:border-[#FFC928]/50 transition-colors">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-[#F7F7F7] font-mono-num">
              {totalOrdersCount}
            </span>
            <span className="text-xs text-[#A8ADBA]">Total orders</span>
          </div>
          <p className="text-xs text-[#FFC928] font-mono-num font-medium mt-1">
            Revenue: {business.currency}{totalRevenue.toLocaleString()}
          </p>
          <div className="mt-4 pt-3 border-t border-[#292E3A]/60 flex items-center justify-between text-xs text-[#A8ADBA]">
            <span>View Orders List</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFC928] group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6 rounded-2xl border border-[#292E3A]">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#A8ADBA] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={onAddProductClick}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/40 text-[#F7F7F7] hover:text-[#FFDF67] transition-all text-xs font-semibold cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFC928]/10 text-[#FFC928] flex items-center justify-center shrink-0">
              <Plus className="w-4 h-4" />
            </div>
            <span>Add Product</span>
          </button>

          <button
            onClick={onOpenStore}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/40 text-[#F7F7F7] hover:text-[#FFDF67] transition-all text-xs font-semibold cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFC928]/10 text-[#FFC928] flex items-center justify-center shrink-0">
              <ExternalLink className="w-4 h-4" />
            </div>
            <span>Open Customer Store</span>
          </button>

          <button
            onClick={onCopyStoreLink}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/40 text-[#F7F7F7] hover:text-[#FFDF67] transition-all text-xs font-semibold cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFC928]/10 text-[#FFC928] flex items-center justify-center shrink-0">
              <Copy className="w-4 h-4" />
            </div>
            <span>Generate Store Link</span>
          </button>

          <button
            onClick={() => onNavigateTab('share')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151923] border border-[#292E3A] hover:border-[#FFC928]/40 text-[#F7F7F7] hover:text-[#FFDF67] transition-all text-xs font-semibold cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFC928]/10 text-[#FFC928] flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <span>Scan & Order Poster</span>
          </button>
        </div>
      </div>

      {/* Recent Orders section */}
      <div className="glass-card p-6 rounded-2xl border border-[#292E3A]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FFC928]" />
            <h2 className="text-base font-bold text-[#F7F7F7]">Recent Orders</h2>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-[#FFC928] hover:underline font-medium cursor-pointer"
          >
            View all ({orders.length})
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-[#A8ADBA]">
            <p className="text-sm">No orders received yet.</p>
            <p className="text-xs mt-1">Open your store or scan the QR code to place a test order!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#292E3A] text-[#A8ADBA]">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Items</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292E3A]/60">
                {orders.slice(0, 4).map(order => (
                  <tr key={order.id} className="hover:bg-[#151923]/50 transition-colors">
                    <td className="py-3 font-mono-num font-bold text-[#FFDF67]">#{order.orderNumber}</td>
                    <td className="py-3">
                      <p className="font-medium text-[#F7F7F7]">{order.customerName}</p>
                      <p className="text-[11px] text-[#A8ADBA]">{order.customerPhone}</p>
                    </td>
                    <td className="py-3 text-[#A8ADBA] max-w-[200px] truncate">
                      {order.items.map(i => `${i.name} × ${i.quantity}`).join(', ')}
                    </td>
                    <td className="py-3 font-mono-num font-bold text-[#F7F7F7]">
                      {business.currency}{order.total}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          order.status === 'New'
                            ? 'bg-[#FFC928]/15 text-[#FFDF67] border border-[#FFC928]/30'
                            : order.status === 'Confirmed'
                            ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                            : order.status === 'Completed'
                            ? 'bg-green-500/15 text-green-300 border border-green-500/30'
                            : 'bg-red-500/15 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
