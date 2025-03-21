import { create } from "zustand";

// 모달 타입 정의
export type ModalType = "loading" | "confirm" | "keywords" | "songRecommendation" | "alert";

// 모달 상태 인터페이스
interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data: any; // 실제로는 더 구체적인 타입을 정의하는 것이 좋습니다
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

// 모달 스토어 생성
export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openModal: (type, data = null) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
}));
