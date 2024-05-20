import { PlayerStore } from "@/types";
import { create } from "zustand";

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined, 
    setId: (id: string) => set({activeId: id}), 
    setIds: (ids: string[]) => set({ids: ids}),
    reset: () => set({ids: [], activeId: undefined}),
}))

export default usePlayer;