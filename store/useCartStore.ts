import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  variation?: string;
}
interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variation?: string) => void;
  updateQuantity: (id: string, quantity: number, variation?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.variation === item.variation
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.variation === item.variation
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeFromCart: (id, variation) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variation === variation)
          ),
        }));
      },
      updateQuantity: (id, quantity, variation) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.variation === variation ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'buyzo-cart',
    }
  )
);
