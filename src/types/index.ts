export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Review {
  id: number;
  userId: string;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  shippingDetails: ShippingDetails;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  createdAt: string;
}

export interface WishlistItem extends Product {
  addedAt: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating';

export type PaymentMethodType = 'credit_card' | 'paypal' | 'mobile_money' | 'cash';

export type OrderInput = Omit<Order, 'id' | 'createdAt'>;
