'use client'

import { useAppSelector } from "@/redux/store"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    if ((!isNotFound && pathname.startsWith("/admin")) || isNotFound) return null

    return (
        <footer className="bg-white text-slate-800 border-t border-slate-200">
            <div className="w-full flex flex-col items-center py-12 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="col-span-1">
                        <h2 className="text-xl font-bold text-red-600 mb-1">Stay informed</h2>
                        <p className="text-sm text-slate-500 mb-4">Sign up for our newsletter.</p>
                        <div className="flex items-center gap-2">
                            <Input placeholder="Your Email Address" className="bg-slate-100 text-slate-800" />
                            <Button variant="secondary" className="bg-red-500 hover:bg-red-400 text-white">
                                Subscribe →
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm space-y-2">
                        <h4 className="font-semibold">Explore</h4>
                        <p className="text-slate-600"><strong>Stories:</strong> Discover what makes us unique.</p>
                        <p className="text-slate-600"><strong>Events:</strong> Turn empathy into action.</p>
                        <p className="text-slate-600"><strong>Where to Give:</strong> Make a difference.</p>
                        <p className="text-slate-600"><strong>How to Give:</strong> Your impact. Your way.</p>
                    </div>

                    <div className="text-sm space-y-2">
                        <h4 className="font-semibold">About</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:text-red-600">FAQs</a></li>
                            <li><a href="#" className="hover:text-red-600">Our Mission</a></li>
                            <li><a href="#" className="hover:text-red-600">Our Team</a></li>
                            <li><a href="#" className="hover:text-red-600">Press</a></li>
                        </ul>
                    </div>

                    <div className="text-sm space-y-2">
                        <h4 className="font-semibold text-red-600">Privacy & Security</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:text-red-600">Pledge to Donors</a></li>
                            <li><a href="#" className="hover:text-red-600">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-red-600">Social Media Policy</a></li>
                            <li><a href="#" className="hover:text-red-600">Copyright Notice</a></li>
                        </ul>
                    </div>
                </div>

                <Separator className="bg-slate-200" />

                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-2">
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    <div className="flex gap-4 text-red-600">
                        <a href="#"><Facebook size={16} /></a>
                        <a href="#"><Twitter size={16} /></a>
                        <a href="#"><Instagram size={16} /></a>
                        <a href="#"><Youtube size={16} /></a>
                        <a href="mailto:you@example.com"><Mail size={16} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
