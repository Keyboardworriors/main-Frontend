import "./App.css";
// import Header from "./components/common/header";
// import MyTabs from "./components/common/tabs";
// import Footer from "./components/common/footer";
import Modal from "./components/common/Modal/Modal";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <>
      <Modal />
      {/* <Header />
      <MyTabs />
      <Footer /> */}
      <AppRoutes />
    </>
  );
}

export default App;
