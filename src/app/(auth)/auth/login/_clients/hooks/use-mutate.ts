import { setCookie } from "@/app/_servers/utils/setCookies";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/app/_clients/utils/axiosInstance";
import { AxiosError } from "axios";
import { encryptCrypto } from "@/app/_clients/utils/cryptoJs";
import { useState } from "react";

export const useLoginHooks = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      return await axiosInstance.post("/user/login-user", values, {
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      const token = res.data.data.token;
      const role = res.data.data.role;

      const isLogin = encryptCrypto({
        val: "true",
        key: process.env.NEXT_PUBLIC_SECRET_KEY as string,
      });

      setCookie({ data: token, expires: 7, cookieName: "_token" });
      setCookie({
        data: isLogin.toString(),
        expires: 30,
        cookieName: "_loggedIn",
      });
      setCookie({
        data: encryptCrypto({
          val: role,
          key: process.env.NEXT_PUBLIC_SECRET_KEY as string,
        }).toString(),
        expires: 30,
        cookieName: "_rl",
      });

      toast({
        title: res.data.message || "Berhasil Login",
        description: new Date().toDateString(),
      });

      window.location.href = role === "ADMIN" ? "/admin/dashboard" : "/";
    },
    onError: (err) => {
      const axiosError = err as AxiosError;

      if (axiosError.response) {
        toast({
          title:
            (axiosError?.response?.data as Error)?.message ||
            "Ada kesalahan dari server!",
          description: new Date().toDateString(),
        });
      } else {
        toast({
          title: "Ada kesalahan dari server!",
          description: new Date().toDateString(),
        });
      }
    },
  });
  return {
    isHiddenPassword,
    setIsHiddenPassword,
    handleLogin,
    isPending,
    initialValues,
  };
};
