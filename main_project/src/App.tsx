import React from "react";
import "./App.css";
import Header from "./components/common/header";
import MyTabs from "./components/common/tabs";
import DiaryHome from "./pages/DiaryHome";
import Footer from "./components/common/footer";

function App() {
  return (
    <>
      <Header />
      <DiaryHome />
      <Footer />
    </>
  );
}

export default App;
