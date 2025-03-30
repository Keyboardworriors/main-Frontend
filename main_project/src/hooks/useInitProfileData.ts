import { useEffect } from "react";
import authApi from "../api/authApi";
import { Genre, isValidGenre, SocialLoginUser } from "../models/profile";
import { useAuthStore } from "../store/useAuthStore";

interface InitProfileParams {
  mode: "create" | "edit";
  userFromState?: SocialLoginUser;
  setEmail: (email: string) => void;
  setProfileImage: (image: string) => void;
  setUserProfile: (profile: {
    nickname: string;
    bio: string;
    selectedGenres: Genre[];
  }) => void;
}

export const useInitProfileData = ({
  mode,
  userFromState,
  setEmail,
  setProfileImage,
  setUserProfile,
}: InitProfileParams) => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (mode === "create" && userFromState) {
      setEmail(userFromState.email);
      setProfileImage(userFromState.profile_image ?? "/default-profile.png");
    } else if (mode === "edit" && user) {
      setEmail(user.email);
      setProfileImage(user.profile_image ?? "/default-profile.png");
    }
  }, [mode, userFromState, user, setEmail, setProfileImage]);

  useEffect(() => {
    if (mode === "edit") {
      const fetchProfile = async () => {
        try {
          const res = await authApi.fetchUserInfo();
          setUserProfile({
            nickname: res.nickname,
            bio: res.introduce ?? "",
            selectedGenres: (res.favorite_genre ?? []).filter(isValidGenre),
          });
        } catch (error) {
          console.error("프로필 불러오기 실패", error);
          alert("프로필 정보를 불러오는 데 실패했습니다.");
        }
      };
      fetchProfile();
    }
  }, [mode, setUserProfile]);
};
