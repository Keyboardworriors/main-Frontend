import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileImageUploader from "../components/Profile/ProfileImageUploader";
import GenreSelector from "../components/Profile/GenreSelector";
import InputField from "../components/Profile/InputField";
import useProfileSetup from "../hooks/useProfileSetup";
import { Genre, SocialLoginUser } from "../models/profile";
import ProfileLayout from "../components/layouts/ProfileLayout";
import authApi from "../api/Authapi";
import { useAuthStore } from "../store/useAuthStore";

type ProfileSetupProps = {
  mode: "create" | "edit";
};

const ProfileSetup = ({ mode }: ProfileSetupProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userFromState = location.state?.user as SocialLoginUser | undefined;

  const { user } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (mode === "create" && userFromState) {
      setEmail(userFromState.email);
      setProfileImage(userFromState.profile_image ?? "/default-profile.png");
    } else if (mode === "edit" && user) {
      setEmail(user.email);
      setProfileImage(user.profile_image ?? "/default-profile.png");
    }
  }, [mode, userFromState, user]);

  useEffect(() => {
    if (mode === "edit") {
      const fetchProfile = async () => {
        try {
          const res = await authApi.getUser();
          setNickname(res.nickname);
          setBio(res.introduce ?? "");
          setSelectedGenres((res.favorite_genre ?? []).filter(isValidGenre));
        } catch (error) {
          console.error("프로필 불러오기 실패", error);
          alert("프로필 정보를 불러오는 데 실패했습니다.");
        }
      };
      fetchProfile();
    }
  }, [mode]);

  const isValidGenre = (genre: string): genre is Genre => {
    return [
      "Electronic",
      "Pop",
      "Ballad",
      "K-pop",
      "Jazz",
      "Rock",
      "Classic",
      "Hip-hop",
      "Country",
    ].includes(genre);
  };

  const { handleSubmit } = useProfileSetup(nickname, selectedGenres, bio, mode);

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  return (
    <ProfileLayout>
      <div className="min-h-full flex flex-col items-center p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-700 mt-5">
          {mode === "edit" ? "회원 정보를 수정해주세요" : "회원 정보를 작성해주세요"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">필수 입력 값은 반드시 작성해주세요</p>

        <div className="w-0.5 h-20 bg-gray-400 my-4"></div>

        <ProfileImageUploader profileImage={profileImage} disabled />

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

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
          >
            {mode === "edit" ? "수정 완료" : "작성 완료"}
          </button>
          <button
            onClick={() => navigate(mode === "edit" ? "/members/mypage" : "/")}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-3xl hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileSetup;
