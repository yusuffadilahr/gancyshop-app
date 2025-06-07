'use client'

import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";

export default function Footer() {
    const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage)
    const pathname = usePathname()
    return (
        <div className={`bottom-0 justify-center items-center ${!isNotFound && pathname.startsWith('/admin') ?
            'hidden' : 'flex'}`}>
            Footer
        </div>
    );
}