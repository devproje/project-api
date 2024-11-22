import { create } from "zustand";

interface MenuState {
	open: boolean
	setOpen: (ret: boolean) => void;
}

export const useMenu = create<MenuState>((set) => ({
	open: false,
	setOpen: () => set((state) => ({ open: !state.open }))
}));
