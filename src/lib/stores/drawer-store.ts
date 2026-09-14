import { create } from 'zustand';

interface DrawerState {
  isNavOpen: boolean;
  isCartOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isNavOpen: false,
  isCartOpen: false,
  openNav: () => set({ isNavOpen: true, isCartOpen: false }),
  closeNav: () => set({ isNavOpen: false }),
  openCart: () => set({ isCartOpen: true, isNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
}));
