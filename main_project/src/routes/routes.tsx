import { BrowserRouter, Route, Routes } from "react-router-dom";
import Introduce from "../pages/introduce";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduce />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
