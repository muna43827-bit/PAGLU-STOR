export interface Business {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  whatsapp: string;
  address: string;
  mapsUrl: string;
  reviewUrl?: string;
  logoUrl: string;
  bannerText: string;
  currency: string;
  createdAt: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'All' | 'Burgers' | 'Pizza' | 'Drinks' | 'Sides' | string;
  image: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  businessId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  specialRequest?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  specialRequest?: string;
}
