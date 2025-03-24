import { create } from "zustand";
import { User, Emotion, Song } from "../models/type";

// 모달 타입 정의
export type ModalType =
  | "loading" // 모든 로딩 모달을 하나의 타입으로 통합
  | "confirm" // 확인 모달 (withdraw, saveDiary 등 용도별 구분은 데이터로)
  | "profile" // 프로필 모달
  | "emotionSelect" // 감정 키워드 선택 모달 (추후 구현)
  | "songSelect"
  | null;

// 모달 데이터 타입 정의
export interface ModalData {
  message?: string; // 모달에 표시할 메시지
  modalPurpose?: "chart" | "emotion" | "melody" | "saving" | "withdraw" | "saveDiary"; // 모달 세부 용도
  user?: User; // 사용자 정보 (프로필 모달용)
  emotions?: Emotion[]; // 감정 정보 (감정 관련 모달용)
  songs?: Song[]; // 노래 정보 (노래 관련 모달용)
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  isDanger?: boolean; // 위험한 작업 여부 (빨간색 버튼)
  onConfirm?: () => void; // 확인 버튼 클릭 핸들러
  onCancel?: () => void; // 취소 버튼 클릭 핸들러
  onRetry?: () => void; // 재시도 버튼 클릭 핸들러
  [key: string]: any; // 추가 속성을 위한 인덱스
}

// 모달 스토어 상태 타입 정의
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

  // 모달 열기
  openModal: (type: ModalType, data: ModalData = {}) => set({ isOpen: true, type, data }),

  // 모달 닫기
  closeModal: () => set({ isOpen: false }),

  // 모달 데이터 업데이트
  updateModalData: (data: Partial<ModalData>) =>
    set((state) => ({
      data: state.data ? { ...state.data, ...data } : data,
    })),
}));
