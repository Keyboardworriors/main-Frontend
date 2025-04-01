export interface MoodData {
  label: string;
  value: number;
  color: string;
}


export type RawEmotionStats = {
  [label: string]: number;
};

export interface ChartComponentProps {
  periodType: PeriodType;
}

export interface ChartLayoutProps {
  chartContent: React.ReactNode;
  onTabChange?: (tab: PeriodType) => void;
}

export enum PeriodType {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}
