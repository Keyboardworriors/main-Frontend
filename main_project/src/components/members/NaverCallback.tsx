import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getNaverToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code"); //네이버에서 전달된 인증 코드

      console.log(code);

      if (code) {
        try {
          const response = await axios.post("http://localhost:8000/oauth/naver/callback/", {
            //임시
            code,
          });

          const { accessToken, user } = response.data;
          localStorage.setItem("accessToken", accessToken); //JWT 토큰
          localStorage.setItem("user", JSON.stringify(user)); //유저 정보

          if (user.isFirstLogin) {
            //응답데이터 수정해야함
            navigate("/ProfileSetup"); //첫 로그인시 회원 정보 작성페이지로
          } else {
            navigate("/DiaryHome"); //첫 로그인 아니라면 다이어리 홈화면으로
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
