// 회원 등록 요청 타입
export interface RegisterRequest {
  email: string;
  nickname: string;
  introduce?: string | null;
  favorite_genre?: string[] | null;
}

// 회원 등록 응답 타입
export interface RegisterResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    profile_image: string | null;
    nickname: string;
    introduce: string | null;
    favorite_genre: string[] | null;
  };
}

// 마이페이지 조회 응답 타입
export interface UserProfile {
  nickname: string;
  introduce: string | null;
  favorite_genre: string[];
  social_account: string;
}

// 모달, 뷰에 필요한 타입
export interface UserViewModel {
    nickname: string;
    email: string;
    profile_image: string;
    bio: string;
    genres: string[];
  }
  
  //프로필 뷰 타입
  export interface ProfileResponse {
    profile_image: string;
    member: {
      nickname: string;
      introduce: string;
      favorite_genre: string[];
    };
  }
  

// 회원가입, 프로필 수정 요청 시 사용 타입
export interface ProfileSetupRequest {
  email?: string; // 회원가입 시에만 필요
  nickname: string;
  introduce: string;
  favorite_genre: string[];
}

// 마이페이지 수정 요청 타입
export interface UpdateUserRequest {
  nickname?: string;
  introduce?: string | null;
  favorite_genre?: string[] | null;
  social_account?: string;
}

// 로그아웃 요청/응답 타입
export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}
