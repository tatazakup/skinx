import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { MainAxios } from "@configs/apis/main";
import { AxiosRequestConfig } from "axios";

export const useAuthSignin = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    {
      username: string;
      password: string;
    },
    unknown
  >
) => {
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const config: AxiosRequestConfig = {
        method: "post",
        url: "auth",
        data: {
          username: username,
          password: password,
        },
      };
      return await MainAxios(config);
    },
    ...options,
  });
};
