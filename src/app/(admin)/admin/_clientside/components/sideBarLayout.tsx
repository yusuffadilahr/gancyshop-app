'use client'

import { AppSidebar } from "@/app/(admin)/admin/_clientside/components/appSideBar";
import { AppBreadcrumb } from "@/app/(admin)/admin/_clientside/components/breadCrumbs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppTools } from "@/hooks/use-app";
import { setProfileAdmin } from "@/redux/slice/globalSlice";
import * as React from "react";

export default function SideBarLayout({
    children,
    dataProfil
}: {
    children: React.ReactNode,
    dataProfil: {
        fullname: string,
        phoneNumber: string,
        email: string
    }
}) {
    const { dispatch, profileAdmin } = useAppTools()
    const setToGlobalState = () => {
        dispatch(setProfileAdmin(dataProfil))
    }

    React.useEffect(() => {
        setToGlobalState()
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar dataProfil={profileAdmin} />
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