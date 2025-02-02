import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ShippingDetails, WishlistItem, Order, Review, SortOption } from '@/types';

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  shippingDetails: ShippingDetails;
  setShippingDetails: (details: ShippingDetails) => void;
  isCartOpen: boolean;
  closeCart: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isDesktopSidebarOpen: boolean;
  toggleDesktopSidebar: () => void;
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalAmount: 0,
      shippingDetails: {
        name: '',
        address: '',
        phone: '',
        email: '',
      },
      isCartOpen: false,
      isSidebarOpen: true,
      isDesktopSidebarOpen: true,
      wishlist: [],
      orders: [],
      reviews: [],
      sortOption: 'name-asc',
      selectedCategory: 'all',
      addToCart: (product) =>
        set((state) => {
          const existingItem = get().cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              totalAmount: state.totalAmount + product.price,
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
            totalAmount: state.totalAmount + product.price,
          };
        }),
      removeFromCart: (productId) =>
        set((state) => {
          const item = get().cart.find((item) => item.id === productId);
          if (!item) return state;
          return {
            cart: state.cart.filter((item) => item.id !== productId),
            totalAmount: state.totalAmount - item.price * item.quantity,
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const item = get().cart.find((item) => item.id === productId);
          if (!item) return state;
          const priceDiff = (quantity - item.quantity) * item.price;
          return {
            cart: state.cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
            totalAmount: state.totalAmount + priceDiff,
          };
        }),
      clearCart: () => set({ cart: [], totalAmount: 0, shippingDetails: { name: '', address: '', phone: '', email: '' }, isCartOpen: false }),
      setShippingDetails: (details) => set({ shippingDetails: details }),
      closeCart: () => set({ isCartOpen: false }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleDesktopSidebar: () => set((state) => ({ isDesktopSidebarOpen: !state.isDesktopSidebarOpen })),
      addToWishlist: (product) =>
        set((state) => ({
          wishlist: [
            ...state.wishlist,
            { ...product, addedAt: new Date().toISOString() },
          ],
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      addReview: (review) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              ...review,
              id: Date.now(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      setSortOption: (option) => set({ sortOption: option }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    {
      name: 'cart-storage',
    }
  )
);