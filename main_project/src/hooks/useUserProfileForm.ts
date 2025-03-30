import { useState } from "react";
import { Genre } from "../models/profile";

export const useUserProfileForm = () => {
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    bio: string;
    selectedGenres: Genre[];
  }>({
    nickname: "",
    bio: "",
    selectedGenres: [],
  });

  const [nicknameError, setNicknameError] = useState(false);
  const [bioError, setBioError] = useState(false);

  const getCharLength = (str: string) => [...str].length;

  const validate = () => {
    const isNicknameTooLong = getCharLength(userProfile.nickname) > 15;
    const isBioTooLong = getCharLength(userProfile.bio) > 25;

    setNicknameError(isNicknameTooLong);
    setBioError(isBioTooLong);

    return !(isNicknameTooLong || isBioTooLong);
  };

  const handleGenreClick = (genre: Genre) => {
    setUserProfile((prev) => ({
      ...prev,
      selectedGenres: prev.selectedGenres.includes(genre)
        ? prev.selectedGenres.filter((g) => g !== genre)
        : [...prev.selectedGenres, genre],
    }));
  };

  return {
    userProfile,
    setUserProfile,
    nicknameError,
    bioError,
    validate,
    setNicknameError,
    setBioError,
    handleGenreClick,
  };
};
