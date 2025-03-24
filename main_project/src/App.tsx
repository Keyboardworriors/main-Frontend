import "./App.css";
import Header from "./components/common/header";
import MyTabs from "./components/common/tabs";
import Footer from "./components/common/footer";
import Modal from "./components/common/Modal/Modal";

function App() {
  return (
    <>
      <Modal />
      <Header />
      <MyTabs />
      <Footer />
    </>
  );
}

export default App;
