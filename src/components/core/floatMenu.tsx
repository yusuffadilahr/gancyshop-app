'use client'

import { useAppSelector } from "@/redux/store"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RiWhatsappFill } from "react-icons/ri"
import { PackageCheck, Wrench, Sparkles } from "lucide-react"
import Link from "next/link"

export default function FloatMenu() {
    const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage)
    const pathname = usePathname()

    const isHidden =
        pathname.startsWith('/admin') ||
        pathname.startsWith('/auth') ||
        isNotFound

    return (
        <div className={`fixed ${isHidden ? 'hidden' : 'flex'}
      bottom-5 right-5 w-fit py-3 px-4 gap-2 bg-white/90 backdrop-blur-md border border-neutral-200
      rounded-xl shadow-xl items-center`}>
            <Link href="https://wa.me/6281234567890" target="_blank">
                <Button size="icon" variant="ghost"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm">
                    <RiWhatsappFill className="w-5 h-5" />
                </Button>
            </Link>

            <Button size="icon" variant="ghost"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
                <PackageCheck className="w-5 h-5" />
            </Button>

            <Button size="icon" variant="ghost"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
                <Wrench className="w-5 h-5" />
            </Button>

            <Button size="icon" variant="ghost"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
                <Sparkles className="w-5 h-5" />
            </Button>
        </div>
    )
}
