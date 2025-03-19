import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";

function MyTabs() {
  return (
    <Tabs
      className="bg-[#A6CCF2] min-h-screen pt-0 pr-4 pb-4 pl-4"
      defaultIndex={0}
      onSelect={(index) => console.log(`Selected tab: ${index}`)}
    >
      <TabList className="flex space-x-4 max-w-6xl mx-auto">
        <Tab>나의 감정일기</Tab>
        <Tab>나의 감정발자취</Tab>
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
