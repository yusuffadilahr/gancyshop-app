'use client'

import { AppSidebar } from "@/app/(admin)/admin/_clients/components/appSideBar";
import { AppBreadcrumb } from "@/app/(admin)/admin/_clients/components/breadCrumbs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { setProfileAdmin } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import * as React from "react";
import Cookies from "js-cookie";
import { handleGetDataProfileAdmin } from "@/app/(admin)/admin/_servers/services";

export default function SideBarLayout({ children }: { children: React.ReactNode }) {
    const [dataProfil, setDataProfil] = React.useState<{
        fullname: string,
        phoneNumber: string,
        email: string
    } | null>(null)
    const dispatch = useAppDispatch()

    const handleGetProfil = async () => {
        try {
            const token = Cookies.get('_token')
            const res = await handleGetDataProfileAdmin(String(token))
            if (res.error) throw res

            setDataProfil(res?.data)
            dispatch(setProfileAdmin(res?.data))
        } catch (error) {
            console.log(error)
            setDataProfil(null)
        }
    }

    React.useEffect(() => {
        handleGetProfil()
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar dataProfil={dataProfil as {
                fullname: string;
                phoneNumber: string;
                email: string;
            }} />
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