import { DiaryLayoutProps } from "../../models/type";

const DiaryLayout = ({ calendarContent, resultContent }: DiaryLayoutProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-gray-100 rounded-lg w-full md:w-1/2 h-80">{calendarContent}</div>
        <div className="bg-[#D6E9FF] rounded-lg w-full md:w-1/2 h-[374px] flex items-center justify-center">
          {resultContent}
        </div>
      </div>
    </div>
  );
};

export default DiaryLayout;
