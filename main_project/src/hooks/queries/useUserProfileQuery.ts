import { useQuery } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await authApi.fetchUserInfo();
      const { user } = useAuthStore.getState();

      return {
        nickname: res.nickname,
        bio: res.introduce ?? "",
        genres: res.favorite_genre ?? [],
        email: user?.email ?? "",
        profile_image: user?.profile_image ?? "/default-profile.png",
      };
    },
    staleTime:0
  });
};
