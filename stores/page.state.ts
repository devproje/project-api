import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PageState {
	name: string;
	setName: (str: string) => void;
}

export const usePageStats = create<PageState>()(
	devtools(
		persist(
			(set) => ({
				name: "home",
				setName: (str: string) => set(() => ({ name: str }))
			}),
			{
				name: "page-state"
			}
		)
	)
);
