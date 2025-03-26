import { create } from "zustand";
import { User, Mood } from "../models/diary";

export type ModalType =
  | "loading" // 로딩 모달
  | "confirm" // 컨펌 모달 (간단한 컨펌)
  | "profile" // 프로필 모달
  | "moodSelect" // 감정 키워드 선택 모달
  | "songSelect" // 분석된 노래 선택 모달
  | "customConfirm" // 중요 컨펌 (일기삭제할꺼냐, 탈퇴할꺼냐)
  | null;

export interface ModalData {
  message?: string; // 모달에 표시할 메시지
  title?: string; // 컨펌 모달 타이틀
  modalPurpose?:
    | "chart"
    | "mood"
    | "melody"
    | "songAnalysisError"
    | "saving"
    | "withdraw"
    | "saveDiary"; // 모달 세부 용도 (필요한거 추가하면 됨)
  user?: User; // 사용자 정보 (프로필 모달용)
  moods?: Mood[]; // 감정 정보 (감정 선택 모달용)
  songs?: Song[]; // 노래 정보 (노래 선택 모달용)
  selectedSong?: Music; // 선택된 노래 정보 추가
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  isDanger?: boolean; // 위험한 작업 여부 (절대 되돌릴수없다 뭐 이런내용)
  onConfirm?: () => void; // 확인 버튼 클릭 핸들러
  onCancel?: () => void; // 취소 버튼 클릭 핸들러
  onRetry?: () => void; // 재시도 버튼 클릭 핸들러
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
