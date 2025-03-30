import { create } from "zustand";
import { User, Mood, Music } from "../models/diary";

export type ModalType =
  | "loading"
  | "confirm"
  | "profile"
  | "moodSelect"
  | "songSelect"
  | "customConfirm"
  | null;

export interface ModalData {
  message?: string;
  title?: string;
  modalPurpose?:
    | "chart"
    | "mood"
    | "melody"
    | "saving"
    | "withdraw"
    | "profileLoading"
    | "saveDiary";
  user?: User;
  moods?: Mood[];
  songs?: Music[];
  selectedSong?: Music;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  hideCloseButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
  onSaveWithoutMusic?: () => void;
}

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  data: ModalData | null;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
  updateModalData: (data: Partial<ModalData>) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: null,

  openModal: (type: ModalType, data: ModalData = {}) => set({ isOpen: true, type, data }),

  closeModal: () => set({ isOpen: false }),

  updateModalData: (data: Partial<ModalData>) =>
    set((state) => ({
      data: state.data ? { ...state.data, ...data } : data,
    })),
}));
