import React, { useState, useCallback } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import ChartLayout from "../components/layouts/ChartLayout";
import ChartComponent from "../components/common/Chart";
import { PeriodType } from "../models/type";

const MoodChart = () => {
  const [activeTab, setActiveTab] = useState<PeriodType>(PeriodType.WEEKLY);

  const handleTabChange = useCallback((tab: PeriodType) => {
    setActiveTab(tab);
  }, []);

  return (
    <HomeLayout>
      <ChartLayout
        onTabChange={handleTabChange}
        chartContent={<ChartComponent periodType={activeTab} />}
      />
    </HomeLayout>
  );
};

export default MoodChart;
