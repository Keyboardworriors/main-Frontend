import HomeLayout from "../layouts/HomeLayout";
import KakaoLogo from "../../assets/logo/KakaoLogo.png";
import { useScrollToTop } from "../../hooks/useScrollTopOnMount";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useScrollToTop();

  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [showNotice, setShowNotice] = useState(false);

  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const NAVER_STATE = crypto.randomUUID();
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    NAVER_REDIRECT_URI,
  )}&state=${NAVER_STATE}`;

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    KAKAO_REDIRECT_URI,
  )}&prompt=login`;

  useEffect(() => {
    if (accessToken) {
      setShowNotice(true);
    }
  }, [accessToken]);

  return (
    <HomeLayout>
      <div className="min-h-[400px] flex flex-col items-center justify-center py-16 gap-6">
        {showNotice ? (
          <>
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              이미 로그인된 상태입니다 😊
            </h3>
            <button
              onClick={() => navigate("/diary")}
              className="mt-5 px-6 py-2.5 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition"
            >
              다이어리로 이동
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 text-center">
              사용하시는 소셜 버튼을 눌러
              <br />
              로그인을 해주세요
            </h3>

            <div className="w-0.5 h-10 bg-gray-400 my-4" />

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                onClick={() => (window.location.href = naverLoginUrl)}
                className="bg-[#03C75A] text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition"
              >
                <span className="mr-2 font-extrabold text-white">N</span> 네이버 로그인
              </button>
              <button
                onClick={() => (window.location.href = kakaoLoginUrl)}
                className="flex items-center justify-center gap-2 bg-[#FEE500] text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition"
              >
                <img src={KakaoLogo} alt="카카오 아이콘" className="w-4 h-4" />
                카카오 로그인
              </button>
            </div>
          </>
        )}
      </div>
    </HomeLayout>
  );
};

export default Login;
