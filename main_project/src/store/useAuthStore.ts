import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../models/diary";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  clearAuth: () => void;
}

let storedUser: string | null = localStorage.getItem("user");
let parsedUser: User | null = null;

try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.warn("⚠️ localStorage에 저장된 사용자 정보가 유효하지 않아 삭제했습니다.");
  localStorage.removeItem("user");
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setAuth: (accessToken, refreshToken, user) => {
        set({ accessToken, refreshToken, user });
      },
      clearAuth: () => {
        set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
