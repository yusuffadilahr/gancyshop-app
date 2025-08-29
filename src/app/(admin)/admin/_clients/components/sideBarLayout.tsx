'use client';
import { AppSidebar } from "@/app/(admin)/admin/_clients/components/appSideBar";
import { AppBreadcrumb } from "@/app/(admin)/admin/_clients/components/breadCrumbs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { setProfileAdmin } from "@/redux/slice/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
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
    const dispatch = useAppDispatch()
    const profileAdmin = useAppSelector((state) => state.globaltheme.profileAdmin)

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