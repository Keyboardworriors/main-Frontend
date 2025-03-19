import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getKakaoToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      console.log(code);

      if (code) {
        try {
          const response = await axios.post("http://localhost:8000/oauth/kakao/callback/", {
            code,
          });
          const { accessToken, user } = response.data;
          localStorage.setItem("accessToken", accessToken); //JWT 토큰
          localStorage.setItem("user", JSON.stringify(user)); //유저 정보

          if (user.isFirstLogin) {
            //응답데이터 수정
            navigate("/ProfileSetup");
          } else {
            navigate("/DiaryHome");
          }
        } catch (error) {
          console.error("카카오 로그인 실패", error);
        }
      }
    };
    getKakaoToken();
  }, [navigate]);
  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
