export interface RegisterRequest {
  email: string;
  nickname: string;
  introduce?: string | null;
  favorite_genre?: string[] | null;
}

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

export interface UserProfile {
  nickname: string;
  introduce: string | null;
  favorite_genre: string[];
  social_account: string;
}

export interface UserViewModel {
    nickname: string;
    email: string;
    profile_image: string;
    bio: string;
    genres: string[];
  }
  
  export interface ProfileResponse {
    profile_image: string;
    member: {
      nickname: string;
      introduce: string;
      favorite_genre: string[];
    };
  }
  

export interface ProfileSetupRequest {
  email?: string; 
  nickname: string;
  introduce: string;
  favorite_genre: string[];
}

export interface UpdateUserRequest {
  nickname?: string;
  introduce?: string | null;
  favorite_genre?: string[] | null;
  social_account?: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}
