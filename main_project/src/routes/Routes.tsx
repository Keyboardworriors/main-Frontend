import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/member/login";
import Introduce from "../pages/introduce";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="/main_project/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
