"use client";

import { AppSidebar } from "@/app/_clients/components/appSideBar";
import { AppBreadcrumb } from "@/app/_clients/components/breadCrumbs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { setProfileAdmin } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import Cookies from "js-cookie";
import { handleGetProfile } from "@/app/_servers/services";
import { useSideBarHelper } from "../hooks/use-aside";
import { useEffect, useState } from "react";

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataProfil, setDataProfil] = useState<{
    fullname: string;
    phoneNumber: string;
    email: string;
  } | null>(null);
  const dispatch = useAppDispatch();

  const handleGetProfilUser = async () => {
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

  const { items } = useSideBarHelper();

  useEffect(() => {
    handleGetProfilUser();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        role="USER"
        dataProfil={
          dataProfil as {
            fullname: string;
            phoneNumber: string;
            email: string;
          }
        }
        dataMenu={items}
      />
      <main className="w-full min-h-screen">
        <div className="px-2 py-2 gap-5 rounded-lg flex items-center">
          <SidebarTrigger />
          <AppBreadcrumb />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
