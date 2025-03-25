import { useNavigate } from "react-router-dom";
import { Genre } from "../models/profile";
import { axiosFetcher } from "../api/axiosFetcher";

const useProfileSetup = (
  profileImage: string,
  nickname: string,
  selectedGenres: Genre[],
  bio: string,
  mode: "create" | "edit",
) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const requestData = {
        profile_image: profileImage,
        nickname,
        favorite_genre: selectedGenres,
        introduce: bio,
      };

      if (mode === "create") {
        await axiosFetcher.post("/members/mypage/", requestData);
        alert("프로필 설정이 완료되었습니다.");
        navigate("/diary");
      } else {
        await axiosFetcher.patch("/members/mypage/", requestData);
        alert("프로필이 수정되었습니다.");
        navigate("/members/mypage/");
      }
    } catch (error) {
      console.error("프로필 저장 실패", error);
      alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return { handleSubmit };
};

export default useProfileSetup;
