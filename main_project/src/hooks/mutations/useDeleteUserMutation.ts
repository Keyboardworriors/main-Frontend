import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/authApi";

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.deleteUser({ refresh_token: refreshToken }),
  });
};
