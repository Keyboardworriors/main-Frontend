import { ReactNode } from "react";

export interface HomeLayoutProps {
  children: ReactNode;
}

export type DiaryLayoutProps = {
  calendarContent: ReactNode;
  resultContent: ReactNode;
};
