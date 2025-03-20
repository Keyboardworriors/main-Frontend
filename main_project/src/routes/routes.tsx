import { BrowserRouter, Route, Routes } from "react-router-dom";
import Introduce from "../pages/introduce";
import ProfileSetup from "../pages/ProfileSetup";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="api/members/register" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
