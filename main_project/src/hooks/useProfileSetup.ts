import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Genre } from "../models/type";

const useProfileSetup = (
  profileImage: string,
  nickname: string,
  selectedGenres: Genre[],
  bio: string,
) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    const requestData = {
      profile_image: profileImage,
      nickname,
      genres: selectedGenres,
      bio,
    };

    try {
      const response = await axios.post("/api/profile-setup", requestData);
      if (response.status === 200) {
        alert("프로필 설정이 완료되었습니다.");
        navigate("/diary");
      }
    } catch (error) {
      console.error("프로필 설정에 실패했습니다.", error);
      alert("프로필 설정 중 오류가 발생했습니다.");
    }
  };

  return { handleSubmit };
};

export default useProfileSetup;
