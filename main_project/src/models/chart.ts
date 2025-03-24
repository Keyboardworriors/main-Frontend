export interface MoodData {
  label: string;
  value: number;
  color: string;
}

export interface ChartComponentProps {
  periodType: PeriodType;
}

export interface ChartLayoutProps {
  chartContent: React.ReactNode;
  onTabChange?: (tab: PeriodType) => void;
}

export enum PeriodType {
  WEEKLY = "주간",
  MONTHLY = "월간",
  YEARLY = "연간",
}
