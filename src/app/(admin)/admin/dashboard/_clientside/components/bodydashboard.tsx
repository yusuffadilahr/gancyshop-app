'use client'

import { ChartDashboard } from "@/app/(admin)/admin/dashboard/_clientside/components/chart";
import { Button } from "@/components/ui/button";
import { useAppTools } from "@/hooks/use-app";
import Cookies from "js-cookie";
export default function BodyDashboard() {
    const { router } = useAppTools()
    const deleteCookie = () => {
        Cookies.remove('_role')
        Cookies.remove('_token')
        localStorage.clear()
        router.push('/auth/login')
    }
    return (
        <div>
            Enter page
            <Button onClick={deleteCookie}>delete cookie</Button>
            <div className="w-full h-20">
                <ChartDashboard />
            </div>
        </div>
    );
}