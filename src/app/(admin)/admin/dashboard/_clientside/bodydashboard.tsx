'use client'

import { Button } from "@/components/ui/button";
import { useAppTools } from "@/hooks/use-app";
import Cookies from "js-cookie";
export default function BodyDashboard() {
    const { router } = useAppTools()
    const deleteCookie = () => {
        Cookies.remove('_role')
        Cookies.remove('_token')

        router.push('/auth/login')
    }
    return (
        <div>
            Enter page
            <Button onClick={deleteCookie}>delete cookie</Button>
        </div>
    );
}