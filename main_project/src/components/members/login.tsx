const Login = () => {
  const NAVER_CLIENT_ID = "vH4l3qQxwPO5cC9UunrF";
  const NAVER_REDIRECT_URI = "http://localhost:5173/oauth/naver/callback/";
  const NAVER_STATE = crypto.randomUUID();
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${NAVER_STATE}`;

  const KAKAO_CLIENT_ID = "cdeccf0d407161fa713d7aefb662c964";
  const KAKAO_REDIRECT_URI = "http://127.0.0.1:8000/oauth/kakao/callback/";
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}`;

  return (
    <div>
      <h3>사용하시는 소셜 버튼을 눌러 로그인 해주세요</h3>
      <button onClick={() => (window.location.href = naverLoginUrl)}>네이버 로그인</button>
      <br />
      <button onClick={() => (window.location.href = kakaoLoginUrl)}>카카오 로그인</button>
    </div>
  );
};

export default Login;
