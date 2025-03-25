import { useNavigate } from "react-router-dom";
import { Genre } from "../models/profile";
import { axiosFetcher } from "../api/axiosFetcher";

const useProfileSetup = (
  profileImage: string,
  nickname: string,
  selectedGenres: Genre[],
  bio: string,
  mode: "create" | "edit"
) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      if (mode === "create") {
        // 최초 회원 정보 등록
        const createData = {
          profile_image: profileImage,
          nickname,
          genres: selectedGenres,
          bio,
        };

        await axiosFetcher.post("/members/mypage/", createData);
        alert("프로필 설정이 완료되었습니다.");
        navigate("/diary");
      } else {
        // 회원 정보 수정 (API 명세서 기준)
        const patchData = {
          nickname,
          introduce: bio,
          favorite_genre: selectedGenres,
        };

        await axiosFetcher.patch("/members/mypage/", patchData);
        alert("프로필이 수정되었습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("프로필 저장 실패", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
      navigate("/members/mypage/")
    }
  };

  return { handleSubmit };
};

export default useProfileSetup;

