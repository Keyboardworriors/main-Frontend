const Login = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const NAVER_STATE = crypto.randomUUID();
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${NAVER_STATE}`;

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h3>사용하시는 소셜 버튼을 눌러 로그인 해주세요</h3>
      <br />
      <button onClick={() => (window.location.href = naverLoginUrl)}>네이버 로그인</button>
      <br />
      <button onClick={() => (window.location.href = kakaoLoginUrl)}>카카오 로그인</button>
    </div>
  );
};

export default Login;
