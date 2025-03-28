import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { SocialLoginUser } from "../../models/profile";
import LoadingModal from "../common/Modal/LoadingModal";
import authApi from "../../api/Authapi";

const NaverCallback = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNaverToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      console.log("Naver code:", code);
      console.log("Naver state:", state);

      if (!code || !state) {
        alert("인증 코드를 받아오는데 실패했습니다. 다시 시도해주세요.");
        setIsLoading(false);
        return;
      }

      try {
        const user: SocialLoginUser = await authApi.socialLoginCallbackNaver(code, state);
        console.log("응답 결과", user);

        if (user.is_active) {
          const {
            access_token,
            refresh_token,
            user: loggedInUser,
          } = await authApi.login(user.email);

          if (!access_token || !refresh_token) {
            alert("토큰 정보가 누락되었습니다. 다시 로그인해주세요.");
            return;
          }

          setAuth(access_token, refresh_token, loggedInUser);
          navigate("/diary/");
        } else {
          navigate("/members/register", { state: { mode: "create", user } });
        }
      } catch (error: any) {
        console.error("네이버 로그인 실패", error);

        const errorMessage = error.response?.data?.error;

        if (errorMessage === "An account with this email already exists.") {
          alert(
            "이미 다른 소셜 계정(예: 카카오)으로 가입된 이메일입니다.\n기존에 로그인했던 방식으로 로그인해주세요.",
          );
          navigate("/login");
        } else {
          alert("네이버 로그인 중 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getNaverToken();
  }, [navigate, setAuth]);

  return <LoadingModal isOpen={isLoading} message="네이버 로그인 처리 중..." />;
};

export default NaverCallback;
