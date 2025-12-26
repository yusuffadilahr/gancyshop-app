"use client";

import { AppSidebar } from "@/app/_clients/components/appSideBar";
import { AppBreadcrumb } from "@/app/_clients/components/breadCrumbs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSideBarHelper } from "../hooks/use-aside";
import { ISideBarLayoutAdminProps } from "../types";
import { IProfileUser } from "@/app/_clients/types";
import { useAsideLogic } from "../hooks/use-aside-logic";

export default function SideBarLayout({ children }: ISideBarLayoutAdminProps) {
  const { dataProfil } = useAsideLogic();
  const { items } = useSideBarHelper();

  return (
    <SidebarProvider>
      <AppSidebar
        role="ADMIN"
        dataProfil={dataProfil as IProfileUser}
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
