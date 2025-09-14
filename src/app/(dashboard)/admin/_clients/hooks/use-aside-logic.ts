import { setProfileAdmin } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import Cookies from "js-cookie";
import { handleGetProfile } from "@/app/_servers/services";
import { useEffect, useState } from "react";
import { IProfileUser } from "@/app/_clients/types";

export const useAsideLogic = () => {
  const [dataProfil, setDataProfil] = useState<IProfileUser | null>(null);
  const dispatch = useAppDispatch();

  const handleGetProfilAdmin = async () => {
    try {
      const token = Cookies.get("_token");
      const res = await handleGetProfile(String(token));
      if (res.error) throw res;

      setDataProfil(res?.data);
      dispatch(setProfileAdmin(res?.data));
    } catch (error) {
      console.log(error);
      setDataProfil(null);
    }
  };

  useEffect(() => {
    handleGetProfilAdmin();
  }, []);

  return {
    dataProfil,
  };
};
