import { registerAction } from "@/app/(auth)/auth/register/_servers/services";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useMutateRegister = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState<{
    pass: boolean;
    confPass: boolean;
  }>({ pass: false, confPass: false });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "+62",
    password: "",
    confPassword: "",
  };

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: async (fd: FormData) => {
      return await registerAction(fd);
    },
    onSuccess: (res) => {
      if (res?.error) throw res;

      toast({
        title: res.message || "Berhasil melakukan registrasi",
        description: new Date().toDateString(),
      });
    },
    onError: (err) => {
      if ("error" in err && err?.error) {
        toast({
          title: err?.message || "",
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
    initialValues,
    handleRegister,
    isPending,
  };
};
