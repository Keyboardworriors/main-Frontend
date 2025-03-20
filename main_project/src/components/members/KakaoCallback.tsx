import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getKakaoToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (!code) {
        alert("인증 코드를 받아오는데 실패했습니다. 다시 시도해주세요.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.post(`${API_BASE_URL}/oauth/kakao/callback/`, {
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
        console.error("카카오 로그인 실패", error);
      }
    };
    getKakaoToken();
  }, [navigate]);
  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
