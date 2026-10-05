/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AdminSidebar, AdminTab } from './components/admin/AdminSidebar';
import { DashboardView } from './components/admin/DashboardView';
import { BusinessSetupView } from './components/admin/BusinessSetupView';
import { ProductManagementView } from './components/admin/ProductManagementView';
import { QRGeneratorView } from './components/admin/QRGeneratorView';
import { OrdersAdminView } from './components/admin/OrdersAdminView';
import { ShareAndGrowView } from './components/admin/ShareAndGrowView';
import { SettingsView } from './components/admin/SettingsView';
import { LoginModal } from './components/admin/LoginModal';
import { CustomerStore } from './components/store/CustomerStore';
import { VisualBoard } from './components/showcase/VisualBoard';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import {
  Business,
  Product,
  Order,
  OrderStatus,
} from './types';
import {
  getStoredBusiness,
  saveStoredBusiness,
  getStoredProducts,
  saveStoredProducts,
  getStoredOrders,
  createNewOrder,
  updateOrderStatusInStorage,
  resetAllStorage,
} from './utils/storage';

export default function App() {
  // App views: 'admin' | 'store' | 'showcase'
  const [currentView, setCurrentView] = useState<'admin' | 'store' | 'showcase'>('admin');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Core persisted business states
  const [business, setBusiness] = useState<Business>(getStoredBusiness());
  const [products, setProducts] = useState<Product[]>(getStoredProducts());
  const [orders, setOrders] = useState<Order[]>(getStoredOrders());

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Inspect URL parameters on load for GitHub Pages and direct shareable store links
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const storeParam = params.get('store');
      const viewParam = params.get('view');
      const hash = window.location.hash;

      if (storeParam || viewParam === 'store' || hash === '#store') {
        setCurrentView('store');
      } else if (viewParam === 'showcase' || hash === '#showcase') {
        setCurrentView('showcase');
      }
    } catch (err) {
      console.error('URL inspection error:', err);
    }
  }, []);

  // Update business handler
  const handleSaveBusiness = (updated: Business) => {
    setBusiness(updated);
    saveStoredBusiness(updated);
    addToast('Business details updated successfully!');
  };

  // Product management handlers
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `prod_${Date.now()}`,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    addToast(`Added "${newProduct.name}" to menu!`);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    saveStoredProducts(updated);
    addToast(`Updated "${updatedProduct.name}"!`);
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    saveStoredProducts(updated);
    addToast(`Deleted "${product?.name || 'item'}" from catalog`);
  };

  // Order management handlers
  const handlePlaceOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const order = createNewOrder(orderData);
    setOrders(prev => [order, ...prev]);
    addToast(`Order #${order.orderNumber} created! Opening WhatsApp...`, 'success');
    return order;
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = updateOrderStatusInStorage(orderId, status);
    setOrders(updated);
    addToast(`Order status updated to ${status}`);
  };

  // Reset demo data handler
  const handleResetData = () => {
    resetAllStorage();
    setBusiness(getStoredBusiness());
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    addToast('Reset to default Royal Burger demo catalog!');
  };

  // Copy Store Link helper
  const handleCopyStoreLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?store=${business.slug || 'royal-burger'}`;
    navigator.clipboard.writeText(link);
    addToast('Store link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-[#F7F7F7] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#FFC928]/30 selection:text-[#FFDF67]">
      {/* Background ambient glowing orbs */}
      <div className="fixed top-12 left-1/4 w-96 h-96 rounded-full bg-[#FFC928]/5 blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-20 right-1/4 w-96 h-96 rounded-full bg-[#FFDF67]/5 blur-3xl pointer-events-none -z-10"></div>

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={view => {
          setCurrentView(view);
          // Sync URL query without page reload
          const url = new URL(window.location.href);
          if (view === 'store') {
            url.searchParams.set('store', business.slug || 'royal-burger');
          } else {
            url.searchParams.delete('store');
            url.searchParams.delete('view');
          }
          window.history.replaceState({}, '', url.toString());
        }}
        business={business}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={() => {
          setIsLoggedIn(false);
          addToast('Logged out of admin panel', 'info');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentView === 'store' ? (
          /* Live Customer-Facing Store */
          <div className="flex-1 py-4 sm:py-6">
            <CustomerStore
              business={business}
              products={products}
              onPlaceOrder={handlePlaceOrder}
              onToast={addToast}
            />
          </div>
        ) : currentView === 'showcase' ? (
          /* 9-Screen Reference Showcase Board matching graphic */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
            <VisualBoard
              business={business}
              products={products}
              orders={orders}
              onSelectAdminTab={tab => {
                setAdminTab(tab);
                setCurrentView('admin');
              }}
              onOpenStore={() => setCurrentView('store')}
              onOpenLogin={() => setLoginModalOpen(true)}
            />
          </div>
        ) : (
          /* Admin Panel Layout */
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Left Sidebar */}
            <AdminSidebar
              currentTab={adminTab}
              onTabChange={setAdminTab}
              onOpenStore={() => setCurrentView('store')}
              business={business}
              orderCount={orders.filter(o => o.status === 'New').length}
            />

            {/* Admin Content Area */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl overflow-y-auto">
              {adminTab === 'dashboard' && (
                <DashboardView
                  business={business}
                  products={products}
                  orders={orders}
                  onNavigateTab={setAdminTab}
                  onOpenStore={() => setCurrentView('store')}
                  onAddProductClick={() => setAdminTab('products')}
                  onCopyStoreLink={handleCopyStoreLink}
                />
              )}

              {adminTab === 'business' && (
                <BusinessSetupView
                  business={business}
                  onSaveBusiness={handleSaveBusiness}
                  onPreviewStore={() => setCurrentView('store')}
                  onNextStep={() => setAdminTab('products')}
                />
              )}

              {adminTab === 'products' && (
                <ProductManagementView
                  products={products}
                  business={business}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onNextStep={() => setAdminTab('qr')}
                />
              )}

              {adminTab === 'orders' && (
                <OrdersAdminView
                  orders={orders}
                  business={business}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              )}

              {adminTab === 'qr' && (
                <QRGeneratorView
                  business={business}
                  onOpenStore={() => setCurrentView('store')}
                  onToast={addToast}
                />
              )}

              {adminTab === 'share' && (
                <ShareAndGrowView
                  business={business}
                  onOpenStore={() => setCurrentView('store')}
                  onToast={addToast}
                />
              )}

              {adminTab === 'settings' && (
                <SettingsView
                  business={business}
                  onSaveBusiness={handleSaveBusiness}
                  onResetData={handleResetData}
                  onToast={addToast}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={email => {
          setIsLoggedIn(true);
          addToast(`Logged in as ${email}`, 'success');
        }}
      />

      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
