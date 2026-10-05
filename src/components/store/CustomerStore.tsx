import React, { useState } from 'react';
import {
  MapPin,
  MessageCircle,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  X,
  ArrowLeft,
  Trash2,
  Check,
  Crown,
  Share2,
  ExternalLink,
  ChevronRight,
  Phone,
  Send,
} from 'lucide-react';
import { Business, Product, CartItem, Order, CustomerDetails } from '../../types';
import { formatWhatsAppOrderMessage, getWhatsAppOrderUrl, getDirectWhatsAppChatUrl } from '../../utils/whatsapp';

interface CustomerStoreProps {
  business: Business;
  products: Product[];
  onPlaceOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  onToast: (msg: string) => void;
  isEmbeddedMockup?: boolean;
}

export const CustomerStore: React.FC<CustomerStoreProps> = ({
  business,
  products,
  onPlaceOrder,
  onToast,
  isEmbeddedMockup = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Customer checkout form
  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [customerAddress, setCustomerAddress] = useState('Green Park, Bhopal');
  const [specialRequest, setSpecialRequest] = useState('Extra spicy');
  const [checkoutError, setCheckoutError] = useState('');

  // WhatsApp Order Confirmation Screen (Screen 8)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [showWhatsAppChatModal, setShowWhatsAppChatModal] = useState(false);

  // Categories list
  const categories = [
    { id: 'All', label: 'All', icon: '🏪' },
    { id: 'Burgers', label: 'Burgers', icon: '🍔' },
    { id: 'Pizza', label: 'Pizza', icon: '🍕' },
    { id: 'Drinks', label: 'Drinks', icon: '🥤' },
    { id: 'Sides', label: 'Sides', icon: '🍟' },
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    onToast(`Added ${quantity}× ${product.name} to cart!`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Handle Checkout / WhatsApp Order
  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setCheckoutError('Please enter your name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setCheckoutError('Please enter a valid phone number');
      return;
    }
    if (!customerAddress.trim()) {
      setCheckoutError('Please enter your delivery address or pickup note');
      return;
    }

    setCheckoutError('');

    // Create real order in system
    const newOrder = onPlaceOrder({
      businessId: business.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      specialRequest: specialRequest.trim(),
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: cartSubtotal,
    });

    setPlacedOrder(newOrder);
    setCart([]);
    setCartOpen(false);
    setShowWhatsAppChatModal(true);
  };

  return (
    <div className={`min-h-screen bg-[#07080C] text-[#F7F7F7] relative pb-28 select-none ${isEmbeddedMockup ? 'max-w-md mx-auto rounded-3xl overflow-hidden border border-[#292E3A] shadow-2xl' : ''}`}>
      {/* Store Header matching Reference Screen 5 */}
      <header className="sticky top-0 z-30 bg-[#07080C]/95 backdrop-blur-md border-b border-[#292E3A] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] shadow-md shadow-[#FFC928]/20">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-base text-[#F7F7F7] tracking-tight leading-tight">
                {business.name}
              </h1>
              <p className="text-[10px] text-[#A8ADBA] tracking-wide">
                {business.tagline || 'Fresh Burgers · Great Taste · Always'}
              </p>
            </div>
          </div>

          {/* Header Action Buttons: Maps & WhatsApp matching Reference */}
          <div className="flex items-center gap-2">
            <a
              href={business.mapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#151923] border border-[#292E3A] text-xs font-semibold text-[#F7F7F7] hover:border-[#FFC928]/40 hover:text-[#FFDF67] transition-all"
              title="Google Maps Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FFC928]" />
              <span className="text-[11px]">Maps</span>
            </a>

            <a
              href={getDirectWhatsAppChatUrl(business.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-all"
              title="WhatsApp Store Chat"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-[11px]">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-5">
        {/* Hero Banner matching Reference Screen 5 ("Good Food Good Mood") */}
        <div className="relative rounded-2xl overflow-hidden border border-[#292E3A] bg-gradient-to-r from-[#151923] via-[#10131A] to-[#07080C] p-5 shadow-xl flex items-center justify-between">
          <div className="space-y-2 z-10 max-w-[65%]">
            <p className="font-display font-black text-xl sm:text-2xl text-[#F7F7F7] italic leading-tight">
              Good Food<br />
              <span className="text-[#FFDF67]">Good Mood</span>
            </p>
            <p className="text-[11px] text-[#A8ADBA]">
              Handcrafted with gourmet patties, fresh toppings & secret sauces.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-1 px-3.5 py-1.5 rounded-lg bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-bold shadow-md shadow-[#FFC928]/25 transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <span>Order Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-[#FFC928]/20 shadow-lg">
            <img
              src="/src/assets/images/burger_cheese_1791181563016.jpg"
              alt="Special Burger"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Category Tabs with icons matching Reference Screen 5 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => {
            const active = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FFC928] text-[#07080C] shadow-md shadow-[#FFC928]/20 font-bold scale-[1.02]'
                    : 'bg-[#10131A] text-[#A8ADBA] border border-[#292E3A] hover:text-[#F7F7F7]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Section */}
        <div id="menu-section" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-[#F7F7F7]">
              {selectedCategory === 'All' ? 'Our Special Burgers & Menu' : `${selectedCategory} Menu`}
            </h2>
            <span className="text-xs text-[#A8ADBA] font-mono-num">
              {filteredProducts.length} items
            </span>
          </div>

          {/* Product Cards Grid matching Reference Screen 5 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="glass-card rounded-2xl border border-[#292E3A] hover:border-[#FFC928]/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Image container */}
                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    setDetailQuantity(1);
                  }}
                  className="relative aspect-[4/3] bg-[#151923] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-[#07080C]/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-[#292E3A] text-[10px] font-bold text-[#FFDF67] flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-[#FFC928] text-[#FFC928]" />
                    <span>{product.rating || '4.8'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div
                    onClick={() => {
                      setSelectedProduct(product);
                      setDetailQuantity(1);
                    }}
                    className="cursor-pointer"
                  >
                    <h3 className="font-display font-bold text-sm text-[#F7F7F7] group-hover:text-[#FFDF67] transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#A8ADBA] line-clamp-1 mt-0.5 leading-snug">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#292E3A]/60 flex items-center justify-between">
                    <div>
                      <span className="font-mono-num font-extrabold text-sm text-[#FFDF67]">
                        {business.currency}{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-mono-num text-[10px] text-[#A8ADBA] line-through ml-1">
                          {business.currency}{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-2.5 py-1 rounded-lg bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-[11px] font-bold shadow-sm shadow-[#FFC928]/20 transition-all cursor-pointer active:scale-95"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Cart Bar matching Reference Screen 7 */}
      {cartTotalItems > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 max-w-md mx-auto">
          <div className="p-3 rounded-2xl bg-[#151923]/95 backdrop-blur-xl border border-[#FFC928]/50 shadow-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFC928] text-[#07080C] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-[#F7F7F7] font-mono-num">
                  {cartTotalItems} {cartTotalItems === 1 ? 'item' : 'items'} · {business.currency}{cartSubtotal}
                </p>
                <p className="text-[10px] text-[#A8ADBA]">Ready to checkout</p>
              </div>
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFDF67] to-[#FFC928] text-[#07080C] font-extrabold text-xs shadow-md shadow-[#FFC928]/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal matching Reference Screen 6 */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card-elevated w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-[#292E3A] overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
            {/* Top bar */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-[#07080C]/80 backdrop-blur-md text-[#F7F7F7] flex items-center justify-center border border-[#292E3A] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setCartOpen(true);
                }}
                className="relative w-8 h-8 rounded-full bg-[#07080C]/80 backdrop-blur-md text-[#F7F7F7] flex items-center justify-center border border-[#292E3A] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFC928] text-[#07080C] font-bold text-[9px] flex items-center justify-center">
                    {cartTotalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Product Image */}
            <div className="w-full aspect-[4/3] bg-[#151923] relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div>
                <h2 className="font-display font-extrabold text-xl text-[#F7F7F7]">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono-num font-extrabold text-xl text-[#FFDF67]">
                    {business.currency}{selectedProduct.price}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#FFC928]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">{selectedProduct.rating || '4.8'}</span>
                    <span className="text-[#A8ADBA]">({selectedProduct.reviewCount || '124'} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#A8ADBA] leading-relaxed">
                {selectedProduct.description ||
                  'Fresh veggies, special house sauce, crispy patties, freshly toasted sesame brioche.'}
              </p>

              {/* Quantity Stepper */}
              <div className="pt-2 flex items-center justify-between border-t border-[#292E3A]/60">
                <span className="text-xs font-semibold text-[#A8ADBA]">Quantity</span>
                <div className="flex items-center gap-3 bg-[#10131A] px-3 py-1.5 rounded-xl border border-[#292E3A]">
                  <button
                    onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                    className="text-[#A8ADBA] hover:text-[#F7F7F7] p-1 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono-num font-bold text-sm text-[#F7F7F7] w-6 text-center">
                    {detailQuantity}
                  </span>
                  <button
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    className="text-[#FFC928] hover:text-[#FFDF67] p-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to cart CTA */}
              <button
                onClick={() => {
                  addToCart(selectedProduct, detailQuantity);
                  setSelectedProduct(null);
                }}
                className="w-full py-3.5 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-sm font-extrabold shadow-lg shadow-[#FFC928]/25 active:scale-95 transition-all cursor-pointer"
              >
                Add to Cart · {business.currency}{selectedProduct.price * detailQuantity}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal / Drawer matching Reference Screen 7 */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card-elevated w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-[#292E3A] overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
            {/* Cart Header */}
            <div className="p-4 border-b border-[#292E3A]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-lg text-[#A8ADBA] hover:text-[#F7F7F7] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="font-display font-bold text-base text-[#F7F7F7]">
                  Your Cart ({cartTotalItems})
                </h2>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-400 hover:text-red-300 font-medium cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Body */}
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-[#A8ADBA]">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium text-[#F7F7F7]">Your cart is empty</p>
                  <p className="text-xs mt-1">Browse the menu to add delicious items!</p>
                </div>
              ) : (
                <>
                  {/* Cart Item rows matching Reference Screen 7 */}
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div
                        key={item.product.id}
                        className="p-3 rounded-xl bg-[#10131A] border border-[#292E3A] flex items-center justify-between gap-3"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#151923] shrink-0 border border-[#292E3A]">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-[#F7F7F7] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-[#A8ADBA] font-mono-num">
                            {business.currency}{item.product.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-[#151923] px-2 py-1 rounded-lg border border-[#292E3A]">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="text-[#A8ADBA] hover:text-[#F7F7F7] p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono-num text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="text-[#FFC928] hover:text-[#FFDF67] p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono-num font-bold text-xs text-[#FFDF67] w-12 text-right">
                            {business.currency}{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal matching Reference Screen 7 */}
                  <div className="pt-2 border-t border-[#292E3A] flex items-center justify-between font-bold">
                    <span className="text-xs text-[#A8ADBA]">Subtotal</span>
                    <span className="text-base font-mono-num text-[#FFDF67]">
                      {business.currency}{cartSubtotal}
                    </span>
                  </div>

                  {/* Customer Information Form */}
                  <div className="pt-3 border-t border-[#292E3A]/60 space-y-3">
                    <p className="text-xs font-bold text-[#F7F7F7] uppercase tracking-wider">
                      Customer Delivery Details
                    </p>

                    {checkoutError && (
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                        {checkoutError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-[#A8ADBA] mb-1">Your Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A8ADBA] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A8ADBA] mb-1">Delivery Address *</label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        placeholder="Green Park, Bhopal"
                        className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A8ADBA] mb-1">
                        Special Request / Note
                      </label>
                      <input
                        type="text"
                        value={specialRequest}
                        onChange={e => setSpecialRequest(e.target.value)}
                        placeholder="Extra spicy, no onions, etc."
                        className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] focus:outline-none focus:border-[#FFC928]"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cart Footer CTA matching Reference Screen 7 */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-[#292E3A]/60 bg-[#07080C]">
                <button
                  onClick={handleProceedToWhatsApp}
                  className="w-full py-3.5 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#FFC928]/25 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Proceed to WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Order View Modal matching Reference Screen 8 */}
      {showWhatsAppChatModal && placedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-[#0B141A] border border-[#292E3A] overflow-hidden shadow-2xl flex flex-col h-[580px]">
            {/* WhatsApp Top Bar matching Screen 8 */}
            <div className="bg-[#1F2C34] px-3.5 py-3 flex items-center justify-between text-[#E9EDEF]">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowWhatsAppChatModal(false)}
                  className="text-[#8696A0] hover:text-[#E9EDEF] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] font-bold">
                  <Crown className="w-4 h-4 fill-current" />
                </div>

                <div>
                  <h3 className="font-bold text-xs text-[#E9EDEF] leading-tight flex items-center gap-1">
                    <span>{business.name}</span>
                  </h3>
                  <p className="text-[10px] text-[#25D366]">online</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#8696A0]">
                <Phone className="w-4 h-4" />
                <button
                  onClick={() => setShowWhatsAppChatModal(false)}
                  className="text-[#8696A0] hover:text-[#E9EDEF] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0B141A] text-xs font-sans">
              {/* Order Bubble matching Screen 8 */}
              <div className="ml-auto max-w-[85%] bg-[#005C4B] text-[#E9EDEF] rounded-2xl rounded-tr-none p-3 shadow-md space-y-2">
                <p className="font-bold text-sm text-[#FFDF67]">
                  New Order #{placedOrder.orderNumber} 🍔
                </p>

                <div>
                  <p className="font-semibold text-[11px] text-[#8696A0] mb-0.5">Items:</p>
                  {placedOrder.items.map((it, idx) => (
                    <p key={idx} className="text-xs">
                      • {it.name} x {it.quantity} - {business.currency}{it.price * it.quantity}
                    </p>
                  ))}
                </div>

                <div className="pt-1 border-t border-[#024a3c] font-bold text-xs text-[#FFDF67]">
                  Total: {business.currency}{placedOrder.total}
                </div>

                <div className="pt-1 text-[11px] space-y-0.5 text-[#d1d7db]">
                  <p className="font-semibold text-[#8696A0]">Customer Details:</p>
                  <p>Name: {placedOrder.customerName}</p>
                  <p>Phone: {placedOrder.customerPhone}</p>
                  <p>Address: {placedOrder.customerAddress}</p>
                  {placedOrder.specialRequest && (
                    <p className="text-[#FFDF67]">📍 Special Request: {placedOrder.specialRequest}</p>
                  )}
                </div>

                <div className="text-[9px] text-[#8696A0] text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
                </div>
              </div>

              {/* Business Automated Reply matching Screen 8 */}
              <div className="mr-auto max-w-[85%] bg-[#202C33] text-[#E9EDEF] rounded-2xl rounded-tl-none p-3 shadow-md space-y-1">
                <p className="text-xs leading-relaxed">
                  Order received! We will get back to you soon. Thank you! 🙏
                </p>
                <div className="text-[9px] text-[#8696A0] text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-[#1F2C34] space-y-2">
              <a
                href={getWhatsAppOrderUrl(placedOrder, business)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp Web / App</span>
              </a>

              <button
                onClick={() => setShowWhatsAppChatModal(false)}
                className="w-full py-2 text-center text-xs text-[#8696A0] hover:text-[#E9EDEF]"
              >
                Close & Return to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
