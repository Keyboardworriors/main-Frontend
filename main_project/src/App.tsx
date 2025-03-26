import "./App.css";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Modal from "./components/common/Modal/Modal";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <>
      <Modal />
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
