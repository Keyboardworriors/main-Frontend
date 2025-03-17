import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function MyTabs() {
  return (
    <Tabs defaultIndex={0} onSelect={(index) => console.log(`Selected tab: ${index}`)}>
      <TabList>
        <Tab>나의 감정일기</Tab>
        <Tab>나의 감정발자취</Tab>
      </TabList>

      <TabPanel>
        <h2>감정일기 내용</h2>
      </TabPanel>
      <TabPanel>
        <h2>감정발자취 내용</h2>
      </TabPanel>
    </Tabs>
  );
}   

export default MyTabs;