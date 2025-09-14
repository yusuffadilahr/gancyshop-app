import { setNotFoundPage } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import * as React from "react";
import { useRouter } from "next/navigation";

export const useNotFound = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(setNotFoundPage(true));
    setIsClient(true);

    return () => {
      dispatch(setNotFoundPage(false));
    };
  }, []);

  return {
    router,
    isClient,
  };
};
