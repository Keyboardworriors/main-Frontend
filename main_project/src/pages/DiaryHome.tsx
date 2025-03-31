import { useState, useEffect } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyCalendar from "../components/Calendar/Calendar";
import DiaryView from "./DiaryView";
import { SearchResult } from "../models/search";
import DiaryControl from "./DiaryControl";
import { useQuery } from "@tanstack/react-query";
import diaryApi from "../api/diaryApi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface DiaryHomeProps {
  searchQuery: string;
  searchResults: SearchResult[];
  onClearSearch: () => void;
}

const DiaryHome = ({ searchQuery = "", searchResults = [], onClearSearch }: DiaryHomeProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedDiaryId(null);
    onClearSearch();
  };

  const handleWriteClick = () => {
    setIsWriteMode(true);
  };

  const handleCancelWrite = () => {
    setIsWriteMode(false);
  };

  useEffect(() => {
    if (searchQuery !== "") {
      setSelectedDiaryId(null);
    }
  }, [searchQuery]);

  const { data: diaryData } = useQuery({
    queryKey: ["diaryDates"],
    queryFn: async () => {
      const res = await diaryApi.getDiaries();
      return res.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const diaryDates = diaryData?.map((item) => item.date) || [];

  const diaryIdMap: Record<string, string> = {};
  diaryData?.forEach((item) => {
    diaryIdMap[item.date] = item.diary_id;
  });

  return (
    <HomeLayout>
      {isWriteMode && selectedDate ? (
        <DiaryControl selectedDate={selectedDate} onCancel={handleCancelWrite} />
      ) : (
        <DiaryLayout
          calendarContent={
            <MyCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              diaryDates={diaryDates}
            />
          }
          resultContent={
            <DiaryView
              selectedDate={selectedDate}
              isSearchMode={searchQuery !== ""}
              searchResults={searchResults}
              onWriteClick={handleWriteClick}
              diaryIdMap={diaryIdMap}
              selectedDiaryId={selectedDiaryId}
              onDiarySelect={(id, date) => {
                setSelectedDiaryId(id);
                setSelectedDate(new Date(date));
              }}
              onBackToList={() => setSelectedDiaryId(null)}
            />
          }
        />
      )}
    </HomeLayout>
  );
};

export default DiaryHome;
