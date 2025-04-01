import { create } from "zustand";

interface DiaryState {
  isWriting: boolean;
  setIsWriting: (value: boolean) => void;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  isWriting: false,
  setIsWriting: (value) => set({ isWriting: value }),
}));
