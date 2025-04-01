import dayjs from "dayjs";
import "dayjs/locale/ko";

export const formatDate = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDateKorean = (date: Date): string => {
  return dayjs(date).locale("ko").format("YYYY년 MM월 DD일 (ddd)");
};

export const getToday = (): Date => {
  return new Date();
};

export const getTargetDateOrToday = (selectedDate: Date | null): Date => {
  return selectedDate || getToday();
};

export const isFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return target > today;
};
