import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "../components/members/login";
import Introduce from "../pages/introduce";
import NaverCallback from "../components/members/NaverCallback";
import ProfileSetup from "../pages/ProfileSetup";
import KakaoCallback from "../components/members/KakaoCallback";
import MyTabs from "../components/common/tabs";
import MyPage from "../pages/myPage";

const ProfileSetupWrapper = () => {
  const location = useLocation();
  const mode = location.state?.mode === "edit" ? "edit" : "create";

  return <ProfileSetup mode={mode} />;
};
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Introduce />} />
        <Route path="/login/" element={<Login />} />
        <Route path="oauth/naver/callback/" element={<NaverCallback />} />
        <Route path="oauth/kakao/callback/" element={<KakaoCallback />} />
        <Route path="/members/register" element={<ProfileSetupWrapper />} />
        <Route path="/diary/" element={<MyTabs />} />
        <Route path="/members/mypage/" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
