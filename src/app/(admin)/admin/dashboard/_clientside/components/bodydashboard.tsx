'use client'

import { ChartDashboard } from "@/app/(admin)/admin/dashboard/_clientside/components/chart";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function BodyDashboard() {
    const router = useRouter()

    const deleteCookie = () => {
        Cookies.remove('_role')
        Cookies.remove('_token')
        localStorage.clear()
        router.push('/auth/login')
    }

    return (
        <div>
            <Button onClick={deleteCookie}>delete cookie</Button>
            <div className="w-full h-20">
                <ChartDashboard />
            </div>
        </div>
    );
}