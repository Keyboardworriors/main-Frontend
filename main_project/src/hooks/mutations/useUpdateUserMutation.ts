import { useMutation } from "@tanstack/react-query";
import { UpdateUserRequest, UserProfile } from "../../models/user";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export const useUpdateUserMutation = () => {
  const navigate = useNavigate();

  return useMutation<UserProfile, Error, UpdateUserRequest>({
    mutationFn: authApi.updateUser,
    onSuccess: () => {
      alert("프로필이 수정되었습니다.");
      navigate("/members/mypage/");
    },
    onError: () => alert("프로필 저장 중 오류가 발생했습니다."),
  });
};
