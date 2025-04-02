import { useModalStore } from "../store/modal";
import { useDiaryStore } from "../store/diary";

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
};

export const useConfirmDiaryExit = <T = void>(
  onConfirmExit: (payload?: T) => void,
  options?: ConfirmOptions,
) => {
  const openModal = useModalStore((state) => state.openModal);
  const setIsWriting = useDiaryStore((state) => state.setIsWriting);

  const handleTryClose = (payload?: T) => {
    openModal("customConfirm", {
      title: options?.title ?? "작성 중인 감정기록이 있어요!",
      message: options?.message ?? "작성 중인 내용은 저장되지 않습니다.\n작성을 중단하시겠어요?",
      onConfirm: () => {
        setIsWriting(false);
        onConfirmExit(payload);
      },
      onCancel: () => {},
      confirmText: options?.confirmText ?? "중단하기",
      cancelText: options?.cancelText ?? "취소",
      isDanger: options?.isDanger ?? true,
    });
  };

  return handleTryClose;
};
