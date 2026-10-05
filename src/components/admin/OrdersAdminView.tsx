import React, { useState } from 'react';
import {
  Package,
  Clock,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
} from 'lucide-react';
import { Order, OrderStatus, Business } from '../../types';
import { cleanWhatsAppNumber } from '../../utils/whatsapp';

interface OrdersAdminViewProps {
  orders: Order[];
  business: Business;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrdersAdminView: React.FC<OrdersAdminViewProps> = ({
  orders,
  business,
  onUpdateStatus,
}) => {
  const [filter, setFilter] = useState<'All' | OrderStatus>('All');

  const filteredOrders =
    filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-[#FFC928]/15 text-[#FFDF67] border-[#FFC928]/30';
      case 'Confirmed':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Cancelled':
        return 'bg-red-500/15 text-red-300 border-red-500/30';
    }
  };

  const getCustomerWhatsAppUrl = (phone: string, orderNumber: number) => {
    const cleaned = cleanWhatsAppNumber(phone);
    const msg = `Hi! Regarding your order #${orderNumber} at ${business.name}, we are preparing your fresh food right away!`;
    return `https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#292E3A]/60">
        <div>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F7F7F7] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FFC928]" />
            <span>Orders Management</span>
          </h1>
          <p className="text-xs text-[#A8ADBA] mt-0.5">
            Real-time incoming customer orders and fulfillment statuses.
          </p>
        </div>

        {/* Filter segment tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#10131A] rounded-xl border border-[#292E3A] overflow-x-auto no-scrollbar">
          {(['All', 'New', 'Confirmed', 'Completed', 'Cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                filter === tab
                  ? 'bg-[#151923] text-[#FFC928] border border-[#FFC928]/30 shadow-sm'
                  : 'text-[#A8ADBA] hover:text-[#F7F7F7]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-[#292E3A]">
          <Package className="w-12 h-12 text-[#A8ADBA] mx-auto mb-2 opacity-40" />
          <h3 className="font-display font-bold text-base text-[#F7F7F7]">No orders found</h3>
          <p className="text-xs text-[#A8ADBA] mt-1 max-w-sm mx-auto">
            {filter === 'All'
              ? 'When customers place orders from your online store or WhatsApp, they will appear right here!'
              : `No orders currently matching "${filter}" status.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="glass-card p-5 rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/30 transition-all shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#292E3A]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#151923] border border-[#292E3A] flex items-center justify-center font-mono-num font-bold text-sm text-[#FFDF67]">
                    #{order.orderNumber}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#F7F7F7]">
                      {order.customerName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#A8ADBA] mt-0.5">
                      <span className="flex items-center gap-1 font-mono-num">
                        <Phone className="w-3 h-3 text-[#FFC928]" />
                        {order.customerPhone}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#A8ADBA]" />
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#A8ADBA]">Status:</span>
                    <select
                      value={order.status}
                      onChange={e => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border bg-[#10131A] focus:outline-none transition-all cursor-pointer ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option value="New" className="bg-[#10131A] text-[#FFDF67]">New</option>
                      <option value="Confirmed" className="bg-[#10131A] text-blue-300">Confirmed</option>
                      <option value="Completed" className="bg-[#10131A] text-emerald-300">Completed</option>
                      <option value="Cancelled" className="bg-[#10131A] text-red-300">Cancelled</option>
                    </select>
                  </div>

                  {/* Customer WhatsApp contact */}
                  <a
                    href={getCustomerWhatsAppUrl(order.customerPhone, order.orderNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] transition-all cursor-pointer inline-flex items-center justify-center"
                    title="Chat with Customer on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Order Items & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
                <div>
                  <p className="font-semibold text-[#A8ADBA] uppercase tracking-wider text-[10px] mb-2">
                    Ordered Items
                  </p>
                  <ul className="space-y-1.5">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between text-[#F7F7F7]">
                        <span>
                          {item.name} <span className="text-[#A8ADBA]">× {item.quantity}</span>
                        </span>
                        <span className="font-mono-num font-medium text-[#FFDF67]">
                          {business.currency}{item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 pt-2 border-t border-[#292E3A]/60 flex items-center justify-between font-bold text-sm">
                    <span className="text-[#F7F7F7]">Total Amount:</span>
                    <span className="font-mono-num text-[#FFDF67] text-base">
                      {business.currency}{order.total}
                    </span>
                  </div>
                </div>

                <div className="bg-[#10131A] p-3.5 rounded-xl border border-[#292E3A]/60 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-[#A8ADBA] uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FFC928]" />
                      <span>Delivery Address</span>
                    </p>
                    <p className="text-xs text-[#F7F7F7] leading-relaxed">
                      {order.customerAddress || 'Direct pickup from restaurant'}
                    </p>
                  </div>

                  {order.specialRequest && (
                    <div className="mt-2.5 pt-2 border-t border-[#292E3A]/60">
                      <p className="text-[10px] text-[#A8ADBA] uppercase tracking-wider font-semibold">
                        Special Request / Note:
                      </p>
                      <p className="text-xs text-[#FFDF67] italic mt-0.5">
                        "{order.specialRequest}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
