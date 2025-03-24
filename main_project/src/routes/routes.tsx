import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/members/login";
import Introduce from "../pages/introduce";
import NaverCallback from "../components/members/NaverCallback";
import ProfileSetup from "../pages/ProfileSetup";
import KakaoCallback from "../components/members/KakaoCallback";
import MyTabs from "../components/common/tabs";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/naver/callback" element={<NaverCallback />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/members/register" element={<ProfileSetup />} />
        <Route path="/diary" element={<MyTabs />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
