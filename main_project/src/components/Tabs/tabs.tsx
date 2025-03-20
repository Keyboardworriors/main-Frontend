import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";

function MyTabs() {
  const DEFAULT_TAB_INDEX = 0;

  return (
    <Tabs
      className="bg-[#A6CCF2] min-h-screen pt-0 pr-4 pb-4 pl-4"
      defaultIndex={DEFAULT_TAB_INDEX}
      onSelect={(index) => console.log(`Selected tab: ${index}`)}
    >
      <TabList className="flex w-full justify-center gap-2">
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

      <TabPanel>
        <DiaryHome />
      </TabPanel>
      <TabPanel>
        <MoodChart />
      </TabPanel>
    </Tabs>
  );
}

export default MyTabs;
