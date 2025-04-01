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
  fetchKakaoUser: async (code: string): Promise<SocialLoginUser> => {
    return await axiosFetcher.get(`/api/oauth/kakao/callback/?code=${code}`);
  },

  fetchNaverUser: async (code: string, state: string): Promise<SocialLoginUser> => {
    return await axiosFetcher.get(`/api/oauth/naver/callback/?code=${code}&state=${state}`);
  },

  loginUser: async (
    email: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
  }> => {
    return await axiosFetcher.post("/api/members/login/", { email });
  },

  createUser: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return await axiosFetcher.post("/api/members/register/", data);
  },

  fetchUserInfo: async (): Promise<UserProfile> => {
    return await axiosFetcher.get("/api/members/mypage/");
  },

  fetchUserProfile: async (): Promise<ProfileResponse> => {
    return await axiosFetcher.get("/api/members/profile/");
  },

  updateUser: async (data: UpdateUserRequest): Promise<UserProfile> => {
    return await axiosFetcher.patch("/api/members/mypage/", data);
  },

  deleteUser: async (data: LogoutRequest): Promise<LogoutResponse> => {
    return await axiosFetcher.delete("/api/members/mypage/", {
      data,
    });
  },

  logoutUser: async (data: LogoutRequest): Promise<LogoutResponse> => {
    return await axiosFetcher.post("/api/members/logout/", data);
  },
};

export default authApi;
