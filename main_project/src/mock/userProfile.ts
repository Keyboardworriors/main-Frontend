import { Genre } from "../models/profile";

export interface UserProfile {
  nickname: string;
  email: string;
  profile_image: string;
  genres: Genre[];
  bio: string;
}

const mockUserProfile: UserProfile = {
  nickname: "닉네임",
  email: "user001@naver.com",
  profile_image: "", // 필요 시 기본 이미지 URL 넣어도 됨
  genres: ["K-pop", "Jazz"], // 정확한 타입 값 사용
  bio: "안녕하세요, 저는 사용자입니다. 많은 이야기를 기록하고 싶어요 :-)",
};

export default mockUserProfile;

