import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/members/Login";
import Introduce from "../pages/introduce";
import NaverCallback from "../components/members/NaverCallback";
import ProfileSetup from "../pages/ProfileSetup";
import DiaryHome from "../pages/DiaryHome";
import KakaoCallback from "../components/members/KakaoCallback";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/naver/callback" element={<NaverCallback />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/api/members/register" element={<ProfileSetup />} />
        <Route path="/api/diary" element={<DiaryHome />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
