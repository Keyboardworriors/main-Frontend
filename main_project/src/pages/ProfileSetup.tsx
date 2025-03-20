import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../components/layouts/HomeLayout";
import { Genre } from "../models/type";
import ProfileImageUploader from "../components/Profile/ProfileImageUploader";
import GenreSelector from "../components/Profile/GenreSelector";
import InputField from "../components/Profile/InputField";
import useFetchUserData from "../hooks/useFetchUserData";
import useProfileSetup from "../hooks/useProfileSetup";

const ProfileSetup = () => {
  const { email, profileImage, setProfileImage } = useFetchUserData();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const { handleSubmit } = useProfileSetup(profileImage, nickname, selectedGenres, bio);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  return (
    <HomeLayout>
      <div className="flex flex-col items-center bg-white p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-700 mt-5">회원 정보를 작성해주세요</h1>
        <p className="text-gray-500 text-sm mt-2">필수 입력 값은 반드시 작성해주세요</p>

        <div className="w-0.5 h-20 bg-gray-400 my-4"></div>

        <ProfileImageUploader profileImage={profileImage} onImageChange={handleImageChange} />

        <InputField type="email" value={email} disabled />

        <InputField
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 (필수)"
        />

        <p className="mt-10 font-semibold text-gray-700">관심있는 음악 장르 선택</p>
        <GenreSelector selectedGenres={selectedGenres} onGenreClick={handleGenreClick} />

        <InputField
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="한 줄 소개"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
          >
            작성 완료
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-3xl hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProfileSetup;
