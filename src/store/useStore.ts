import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalAmount: 0,
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
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
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
          totalAmount: state.totalAmount - (state.cart.find((item) => item.id === productId)?.price ?? 0),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const item = state.cart.find((item) => item.id === productId);
          if (!item) return state;
          const priceDiff = (quantity - item.quantity) * item.price;
          return {
            cart: state.cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
            totalAmount: state.totalAmount + priceDiff,
          };
        }),
      clearCart: () => set({ cart: [], totalAmount: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);