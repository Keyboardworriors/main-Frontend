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
  // 카카오 콜백
  socialLoginCallback: async (code: string): Promise<SocialLoginUser> => {
    return await axiosFetcher.get(`/api/oauth/kakao/callback/?code=${code}`);
  },

  // 네이버 콜백
  socialLoginCallbackNaver: async (code: string, state: string): Promise<SocialLoginUser> => {
    return await axiosFetcher.get(`/api/oauth/naver/callback/?code=${code}&state=${state}`);
  },

  // 로그인 (is_active: true)
  login: async (
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

  // 회원 조회 (마이페이지)
  getUser: async (): Promise<UserProfile> => {
    return await axiosFetcher.get("/api/members/mypage/");
  },

  // 회원 프로필 조회
  getProfile: async (): Promise<ProfileResponse> => {
    return await axiosFetcher.get("/api/members/profile/");
  },

  // 회원 수정
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
  logout: async (data: LogoutRequest): Promise<LogoutResponse> => {
    return await axiosFetcher.post("/api/members/logout/", data);
  },
};

export default authApi;
