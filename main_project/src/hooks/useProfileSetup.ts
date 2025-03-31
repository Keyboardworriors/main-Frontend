import { useNavigate, useLocation } from "react-router-dom";
import { Genre } from "../models/profile";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../models/diary";
import authApi from "../api/authApi";

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
      const requestData = {
        nickname,
        favorite_genre: selectedGenres,
        introduce: bio,
      };

      if (mode === "create") {
        const email = userFromState?.email;
        if (!email) {
          alert("이메일 정보가 없습니다. 다시 로그인해주세요.");
          return;
        }

        const res = await authApi.createUser({ ...requestData, email });
        const { access_token: accessToken, refresh_token: refreshToken, user } = res;

        const parsedUser: User = {
          email: user.email,
          profile_image: user.profile_image ?? "/default-profile.png",
          nickname: user.nickname,
          introduce: user.introduce ?? "",
          favorite_genre: user.favorite_genre ?? [],
          is_active: true, // create 시 활성화된 상태
        };

        setAuth(accessToken, refreshToken, parsedUser);

        alert("회원가입이 완료되었습니다.");
        navigate("/diary/");
      } else {
        const updatedUser = await authApi.updateUser(requestData);
        const { accessToken, refreshToken, user: prevUser } = useAuthStore.getState();

        const parsedUser: User = {
          email: prevUser?.email ?? "",
          profile_image: prevUser?.profile_image ?? "/default-profile.png",
          nickname: updatedUser.nickname,
          introduce: updatedUser.introduce ?? "",
          favorite_genre: updatedUser.favorite_genre ?? [],
          is_active: prevUser?.is_active ?? true,
        };

        setAuth(accessToken!, refreshToken!, parsedUser);

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
