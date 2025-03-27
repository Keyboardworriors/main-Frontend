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
