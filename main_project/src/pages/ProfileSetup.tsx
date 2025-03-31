import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileLayout from "../components/layouts/ProfileLayout";
import ProfileImageUploader from "../components/Profile/ProfileImageUploader";
import InputField from "../components/Profile/InputField";
import GenreSelector from "../components/Profile/GenreSelector";
import { SocialLoginUser } from "../models/profile";
import { useUserProfileForm } from "../hooks/useUserProfileForm";
import { useInitProfileData } from "../hooks/useInitProfileData";
import { useCreateUserMutation } from "../hooks/mutations/useCreateUserMutation";
import { useUpdateUserMutation } from "../hooks/mutations/useUpdateUserMutation";

type ProfileSetupProps = {
  mode: "create" | "edit";
};

const ProfileSetup = ({ mode }: ProfileSetupProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userFromState = location.state?.user as SocialLoginUser | undefined;

  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const { userProfile, setUserProfile, nicknameError, bioError, validate, handleGenreClick } =
    useUserProfileForm();

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();

  useInitProfileData({
    mode,
    userFromState,
    setEmail,
    setProfileImage,
    setUserProfile,
  });

  const handleSubmit = () => {
    if (!validate()) return;

    const requestData = {
      email,
      nickname: userProfile.nickname,
      introduce: userProfile.bio,
      favorite_genre: userProfile.selectedGenres,
    };

    if (mode === "create") {
      createUserMutation.mutate(requestData);
    } else {
      const { email: _, ...updateData } = requestData;
      updateUserMutation.mutate(updateData);
    }
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

        {nicknameError && (
          <p className="text-red-500 text-sm w-full mt-2 mb-[-15px] text-left">
            닉네임은 15자 이내로 가능합니다.
          </p>
        )}
        <InputField
          type="text"
          value={userProfile.nickname}
          onChange={(e) => setUserProfile((prev) => ({ ...prev, nickname: e.target.value }))}
          placeholder="닉네임 (필수)"
          isError={nicknameError}
        />

        <p className="mt-10 font-semibold text-gray-700">관심있는 음악 장르 선택</p>
        <GenreSelector
          selectedGenres={userProfile.selectedGenres}
          onGenreClick={handleGenreClick}
        />

        {bioError && (
          <p className="text-red-500 text-sm w-full mt-10 mb-[-15px] text-left">
            한 줄 소개는 25자 이내로 작성해주세요.
          </p>
        )}
        <InputField
          type="text"
          value={userProfile.bio}
          onChange={(e) => setUserProfile((prev) => ({ ...prev, bio: e.target.value }))}
          placeholder="한 줄 소개"
          isError={bioError}
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
