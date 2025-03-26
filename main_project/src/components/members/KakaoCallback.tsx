import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosFetcher } from "../../api/axiosFetcher";
import { useAuthStore } from "../../store/useAuthStore";
import { SocialLoginUser } from "../../models/profile";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const getKakaoToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log("Kakao code:", code);

      if (!code) {
        alert("인증 코드를 받아오는데 실패했습니다. 다시 시도해주세요.");
        return;
      }

      try {
        // 1차: 유저 정보만 받음
        const res = await axiosFetcher.get(`api/oauth/kakao/callback/?code=${code}`);
        const user: SocialLoginUser = res;

        console.log("응답 결과", res);

        if (user.is_active) {
          // 2차: 토큰 요청
          const tokenRes = await axiosFetcher.post("api/members/login/", {
            email: user.email,
          });

          const {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: loggedInUser,
          } = tokenRes;

          if (!accessToken || !refreshToken) {
            alert("토큰 정보가 누락되었습니다. 다시 로그인해주세요.");
            return;
          }

          setAuth(accessToken, refreshToken, loggedInUser);
          navigate("/diary/");
        } else {
          navigate("/members/register", { state: { mode: "create", user } });
        }
      } catch (error) {
        console.error("카카오 로그인 실패", error);
        alert("카카오 로그인 중 오류가 발생했습니다.");
      }
    };

    getKakaoToken();
  }, [navigate, setAuth]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
