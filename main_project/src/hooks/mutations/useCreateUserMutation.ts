import { useMutation } from "@tanstack/react-query";
import { RegisterRequest, RegisterResponse } from "../../models/user";
import authApi from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useCreateUserMutation = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: authApi.createUser,
    onSuccess: ({ access_token, refresh_token, user }) => {
      setAuth(access_token, refresh_token, {
        email: user.email,
        nickname: user.nickname,
        introduce: user.introduce,
        profile_image: user.profile_image ?? "/default-profile.png",
        favorite_genre: user.favorite_genre ?? [],
        is_active: true,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/diary/");
    },
    onError: () => alert("프로필 저장 중 오류가 발생했습니다."),
  });
};
