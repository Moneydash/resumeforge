import { create } from 'zustand';

interface MainState {
  editIndex: boolean;
  setEditIndex: (editIndex: boolean) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const useMainStore = create<MainState>((set) => ({
  editIndex: false,
  setEditIndex: (bool) => set({ editIndex: bool }),
  userId: null,
  setUserId: (id) => set({ userId: id }),
}));