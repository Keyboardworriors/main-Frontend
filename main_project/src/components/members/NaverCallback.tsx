import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosFetcher } from "../../api/axiosFetcher";
import { useAuthStore } from "../../store/useAuthStore";
import { axiosFetcher } from "../../api/axiosFetcher";
import { useAuthStore } from "../../store/useAuthStore";

const NaverCallback = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { setAuth } = useAuthStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getNaverToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const state = urlParams.get("state");

      if (!code || !state) {
      if (!code || !state) {
        alert("인증 코드를 받아오는데 실패했습니다. 다시 시도해주세요.");
        navigate("/login");
        return;
      }


      try {
        const res = await axiosFetcher.post(`${API_BASE_URL}/oauth/naver/callback/`, {
          code,
          state,
        });

        const { access_token: accessToken, refresh_token: refreshToken, user } = res;

        setAuth(accessToken, refreshToken, user);
        const res = await axiosFetcher.post(`${API_BASE_URL}/oauth/naver/callback/`, {
          code,
          state,
        });

        const { access_token: accessToken, refresh_token: refreshToken, user } = res;

        setAuth(accessToken, refreshToken, user);

        if (user.is_active) {
          navigate("/diary/");
        } else {
          navigate("/profile-setup", { state: { mode: "create" } });
        }
      } catch (error) {
        console.error("네이버 로그인 실패", error);
        alert("네이버 로그인 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    getNaverToken();
  }, [navigate, setAuth]);

  return <div>네이버 로그인 처리 중...</div>;
  }, [navigate, setAuth]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;
