// Core types for SAFINA CARPETS Admin Panel

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  lastLogin?: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory?: string;
  size: string;
  material: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  description: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'draft';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  banner?: string;
  parentId?: string;
  subcategories?: Category[];
  productCount: number;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  orders: Order[];
  wishlist: string[];
  isBlocked: boolean;
  registeredAt: Date;
  lastOrderAt?: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  shippingAddress: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface CustomCarpetRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  size: string;
  color: string;
  material: string;
  pattern?: string;
  customMessage: string;
  images?: string[];
  budget?: number;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-review' | 'quoted' | 'approved' | 'in-production' | 'completed' | 'rejected';
  createdAt: Date;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'general' | 'product' | 'support' | 'complaint';
  status: 'unread' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  repliedAt?: Date;
}

export interface InternationalClient {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  requiredQuantity: number;
  productInterest: string[];
  message: string;
  status: 'new' | 'contacted' | 'negotiating' | 'converted' | 'lost';
  createdAt: Date;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  customRequests: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  percentage: number;
}

export interface AppSettings {
  companyName: string;
  currency: string;
  taxRate: number;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    orderUpdates: boolean;
    lowStock: boolean;
  };
}