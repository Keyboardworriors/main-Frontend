import { User } from "../models/diary";
import { SocialLoginUser } from "../models/profile";
import {
  RegisterRequest,
  RegisterResponse,
  UserProfile,
  UpdateUserRequest,
  LogoutRequest,
  LogoutResponse,
  ProfileResponse,
} from "../models/user";
import { axiosFetcher } from "./axiosFetcher";

const authApi = {
  // 카카오 소셜 로그인 콜백 → 동사형 네이밍
  fetchKakaoUser: async (code: string): Promise<SocialLoginUser> => {
    return await axiosFetcher.get(`/api/oauth/kakao/callback/?code=${code}`);
  },

  // 네이버 소셜 로그인 콜백
  fetchNaverUser: async (code: string, state: string): Promise<SocialLoginUser> => {
    return await axiosFetcher.get(`/api/oauth/naver/callback/?code=${code}&state=${state}`);
  },

  // 로그인
  loginUser: async (
    email: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
  }> => {
    return await axiosFetcher.post("/api/members/login/", { email });
  },

  // 회원 등록
  createUser: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return await axiosFetcher.post("/api/members/register/", data);
  },

  // 마이페이지 정보 조회
  fetchUserInfo: async (): Promise<UserProfile> => {
    return await axiosFetcher.get("/api/members/mypage/");
  },

  // 프로필 조회
  fetchUserProfile: async (): Promise<ProfileResponse> => {
    return await axiosFetcher.get("/api/members/profile/");
  },

  // 회원 정보 수정
  updateUser: async (data: UpdateUserRequest): Promise<UserProfile> => {
    return await axiosFetcher.patch("/api/members/mypage/", data);
  },

  // 회원 탈퇴
  deleteUser: async (data: LogoutRequest): Promise<LogoutResponse> => {
    return await axiosFetcher.delete("/api/members/mypage/", {
      data,
    });
  },

  // 로그아웃
  logoutUser: async (data: LogoutRequest): Promise<LogoutResponse> => {
    return await axiosFetcher.post("/api/members/logout/", data);
  },
};

export default authApi;
