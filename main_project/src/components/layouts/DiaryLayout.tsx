import { DiaryLayoutProps } from "../../models/type";

const DiaryLayout = ({ calendarContent, resultContent, diaryListContent }: DiaryLayoutProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-gray-100 rounded-lg w-full md:w-1/2 h-80">{calendarContent}</div>
        <div className="bg-[#D6E9FF] rounded-lg w-full md:w-1/2 min-h-80 flex items-center justify-center w-full">
          {resultContent}
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 w-full border border-gray-300 h-full">
        {diaryListContent}
      </div>
    </div>
  );
};

export default DiaryLayout;
