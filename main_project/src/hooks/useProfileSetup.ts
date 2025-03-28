import { useNavigate, useLocation } from "react-router-dom";
import { Genre } from "../models/profile";
import { axiosFetcher } from "../api/axiosFetcher";
import { useAuthStore } from "../store/useAuthStore";

const useProfileSetup = (
  nickname: string,
  selectedGenres: Genre[],
  bio: string,
  mode: "create" | "edit",
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();

  const userFromState = location.state?.user;

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      if (mode === "create") {
        const email = userFromState?.email;
        if (!email) {
          alert("이메일 정보가 없습니다. 다시 로그인해주세요.");
          return;
        }

        const requestData = {
          email,
          nickname,
          favorite_genre: selectedGenres,
          introduce: bio,
        };

        const res = await axiosFetcher.post("/api/members/register/", requestData);
        const { access_token: accessToken, refresh_token: refreshToken, user } = res;

        setAuth(accessToken, refreshToken, user);

        alert("회원가입이 완료되었습니다.");
        navigate("/diary/");
      } else {
        const requestData = {
          nickname,
          favorite_genre: selectedGenres,
          introduce: bio,
        };

        await axiosFetcher.patch("/api/members/mypage/", requestData);
        alert("프로필이 수정되었습니다.");
        navigate("/members/mypage/");
      }
    } catch (error: any) {
      console.error("프로필 저장 실패", error);
      if (error.response) {
        console.error("상태 코드:", error.response.status);
        console.error("응답 데이터:", error.response.data);
      }
      alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return { handleSubmit };
};

export default useProfileSetup;
