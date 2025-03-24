import dayjs from "dayjs";

export const formatDate = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getToday = (): Date => {
  return new Date();
};

export const getTargetDateOrToday = (selectedDate: Date | null): Date => {
  return selectedDate || getToday();
};
