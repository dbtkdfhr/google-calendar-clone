import { StateCreator } from 'zustand'

export interface MenuDataSlice {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const createMenuDataSlice: StateCreator<MenuDataSlice> = ((set) => ({
  isOpen: true,
  setOpen: (isOpen: boolean) => {set({ isOpen })},
}))