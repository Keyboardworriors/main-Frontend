import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";

function MyTabs() {
  return (
    <Tabs
      className="bg-[#A6CCF2] min-h-screen flex flex-col"
      defaultIndex={0}
      onSelect={(index) => console.log(`Selected tab: ${index}`)}
    >
      <TabList className="flex max-w-[1130px] w-full mx-auto pt-0 pr-4 pl-7">
        <Tab
          className="px-4 py-2 text-gray-700 hover:text-black focus:outline-none"
          selectedClassName="text-black font-bold bg-white rounded-t-lg"
        >
          나의 감정일기
        </Tab>
        <Tab
          className="px-4 py-2 text-gray-700 hover:text-black focus:outline-none"
          selectedClassName="text-black font-bold bg-white rounded-t-lg"
        >
          나의 감정발자취
        </Tab>
      </TabList>

      <div className="w-full max-w-[1130px] mx-auto">
        <TabPanel>
          <DiaryHome />
        </TabPanel>
        <TabPanel>
          <MoodChart />
        </TabPanel>
      </div>
    </Tabs>
  );
}

export default MyTabs;
