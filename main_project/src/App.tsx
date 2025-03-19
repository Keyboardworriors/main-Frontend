import React from "react";
import "./App.css";
import Header from "./components/common/header";
import MyTabs from "./components/common/tabs";
import Footer from "./components/common/footer";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <>
      <Header />
      <MyTabs />
      <Footer />
      <AppRoutes />
    </>
  );
}

export default App;
