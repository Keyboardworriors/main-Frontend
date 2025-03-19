import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverCallback = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  useEffect(() => {
    const getNaverToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await axios.post(`${API_BASE_URL}/oauth/naver/callback/`, {
            code,
          });

          const { accessToken, user } = response.data;
          localStorage.setItem("accessToken", accessToken); 
          localStorage.setItem("user", JSON.stringify(user));

          if (user.isRegistered) {
            navigate("/ProfileSetup"); 
          } else {
            navigate("/DiaryHome"); 
          }
        } catch (error) {
          console.error("네이버 로그인 실패", error);
        }
      }
    };
    getNaverToken();
  }, [navigate]);
  return <div> 네이버 로그인 처리중...</div>;
};

export default NaverCallback;
