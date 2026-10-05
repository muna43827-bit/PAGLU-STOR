import { Business, Product, Order } from '../types';

export const DEFAULT_BUSINESS: Business = {
  id: 'biz_royal_burger',
  name: 'Royal Burger',
  slug: 'royal-burger',
  tagline: 'Fresh Burgers · Great Taste · Always',
  category: 'Restaurant',
  whatsapp: '919876543210',
  address: '123 Food Street, Green Park, Bhopal',
  mapsUrl: 'https://maps.google.com/?q=Royal+Burger+Bhopal',
  reviewUrl: 'https://maps.google.com/?q=Royal+Burger+Bhopal&review=1',
  logoUrl: '/src/assets/images/burger_classic_1791181550274.jpg',
  bannerText: 'Good Food Good Mood',
  currency: '₹',
  createdAt: new Date().toISOString(),
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    businessId: 'biz_royal_burger',
    name: 'Classic Burger',
    price: 80,
    originalPrice: 90,
    category: 'Burgers',
    image: '/src/assets/images/burger_classic_1791181550274.jpg',
    description: 'Fresh veggies, special sauce, crispy and delicious.',
    rating: 4.8,
    reviewCount: 124,
    isAvailable: true,
  },
  {
    id: 'prod_2',
    businessId: 'biz_royal_burger',
    name: 'Cheese Burger',
    price: 120,
    originalPrice: 140,
    category: 'Burgers',
    image: '/src/assets/images/burger_cheese_1791181563016.jpg',
    description: 'Extra cheese, more flavor, grilled onions on toasted bun.',
    rating: 4.9,
    reviewCount: 198,
    isAvailable: true,
  },
  {
    id: 'prod_3',
    businessId: 'biz_royal_burger',
    name: 'Chicken Burger',
    price: 150,
    originalPrice: 180,
    category: 'Burgers',
    image: '/src/assets/images/burger_chicken_1791181574716.jpg',
    description: 'Juicy buttermilk fried chicken, signature spicy sauce.',
    rating: 4.7,
    reviewCount: 86,
    isAvailable: true,
  },
  {
    id: 'prod_4',
    businessId: 'biz_royal_burger',
    name: 'French Fries',
    price: 60,
    originalPrice: 70,
    category: 'Sides',
    image: '/src/assets/images/french_fries_1791181584573.jpg',
    description: 'Crispy & tasty golden potato fries with sea salt.',
    rating: 4.6,
    reviewCount: 112,
    isAvailable: true,
  },
  {
    id: 'prod_5',
    businessId: 'biz_royal_burger',
    name: 'Cold Drink',
    price: 40,
    originalPrice: 50,
    category: 'Drinks',
    image: '/src/assets/images/cold_drink_1791181596019.jpg',
    description: 'Chilled & refreshing iced cola beverage.',
    rating: 4.8,
    reviewCount: 65,
    isAvailable: true,
  },
];

export const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord_1024',
    orderNumber: 1024,
    businessId: 'biz_royal_burger',
    customerName: 'Rahul Sharma',
    customerPhone: '9876543210',
    customerAddress: 'Green Park, Bhopal',
    specialRequest: 'Extra spicy',
    items: [
      { productId: 'prod_1', name: 'Classic Burger', price: 80, quantity: 1 },
      { productId: 'prod_2', name: 'Cheese Burger', price: 120, quantity: 1 },
      { productId: 'prod_5', name: 'Cold Drink', price: 40, quantity: 1 },
    ],
    total: 240,
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
];

const STORAGE_KEYS = {
  BUSINESS: 'quickstore_business',
  PRODUCTS: 'quickstore_products',
  ORDERS: 'quickstore_orders',
  AUTH: 'quickstore_auth',
};

// Safe storage utilities
export function getStoredBusiness(): Business {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BUSINESS);
    if (data) {
      return { ...DEFAULT_BUSINESS, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error loading business from storage', err);
  }
  return DEFAULT_BUSINESS;
}

export function saveStoredBusiness(business: Business): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(business));
  } catch (err) {
    console.error('Error saving business to storage', err);
  }
}

export function getStoredProducts(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading products from storage', err);
  }
  return DEFAULT_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products to storage', err);
  }
}

export function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading orders from storage', err);
  }
  return DEFAULT_ORDERS;
}

export function saveStoredOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (err) {
    console.error('Error saving orders to storage', err);
  }
}

export function createNewOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order {
  const currentOrders = getStoredOrders();
  const nextNumber = currentOrders.length > 0 ? Math.max(...currentOrders.map(o => o.orderNumber)) + 1 : 1025;
  const newOrder: Order = {
    ...orderData,
    id: `ord_${nextNumber}_${Date.now()}`,
    orderNumber: nextNumber,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  const updated = [newOrder, ...currentOrders];
  saveStoredOrders(updated);
  return newOrder;
}

export function updateOrderStatusInStorage(orderId: string, status: Order['status']): Order[] {
  const orders = getStoredOrders().map(o => (o.id === orderId ? { ...o, status } : o));
  saveStoredOrders(orders);
  return orders;
}

export function resetAllStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(DEFAULT_BUSINESS));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
  } catch (err) {
    console.error('Failed to reset storage', err);
  }
}
