import { create } from 'zustand'

interface MenuData {
  isOpen: boolean
}

interface MenuDataActions {
  setOpen: (isOpen: boolean) => void
}

const useMenuData  = create<MenuData & MenuDataActions>((set) => ({
  isOpen: true,
  setOpen: (isOpen: boolean) => {set({ isOpen })},
}))

export default useMenuData