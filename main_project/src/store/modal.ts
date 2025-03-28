import { create } from "zustand";
import { User, Mood, Music } from "../models/diary";

export type ModalType =
  | "loading"
  | "confirm"
  | "profile"
  | "moodSelect"
  | "songSelect"
  | "songAnalysisError"
  | "customConfirm"
  | null;

export interface ModalData {
  message?: string;
  title?: string;
  modalPurpose?:
    | "chart"
    | "mood"
    | "melody"
    | "songAnalysisError"
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
  onSaveWithoutMusic?: () => void; // 음악 없이 저장하기 콜백 추가
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
