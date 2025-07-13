import Link from "next/link"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import * as React from 'react'

interface INavigationItem {
    menuName: string;
    href?: string;
    submenu?: {
        title: string,
        href: string,
        titleCaption: string
    }[]
}

interface IMobileMenuProps {
    activeSideBarMobile: boolean
    setActiveSideBarMobile: React.Dispatch<React.SetStateAction<boolean>>
    arrayStatisNavigation: INavigationItem[]
}

export default function MobileMenu({
    activeSideBarMobile,
    setActiveSideBarMobile,
    arrayStatisNavigation
}: IMobileMenuProps) {
    return (
        <div>
            {activeSideBarMobile && (
                <div className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setActiveSideBarMobile(false)} />
            )}

            <div className="w-full md:hidden flex border-b items-center px-2 justify-between py-4 relative">
                <div>
                    <Image alt="profile" src="/new-logo.png"
                        width={500} height={500} className="w-fit h-8" />
                </div>
                <div>
                    <Button variant="outline" size="sm" onClick={() => setActiveSideBarMobile(!activeSideBarMobile)}>
                        <RxHamburgerMenu />
                    </Button>
                </div>

                {activeSideBarMobile && (
                    <div className="fixed z-50 inset-0 md:hidden bg-white py-6 px-2 overflow-y-auto w-9/12">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-lg">Menu</h2>
                            <Button variant="ghost" size="sm" onClick={() => setActiveSideBarMobile(false)}>
                                <IoMdClose className="text-xl" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {arrayStatisNavigation.map((item, idx) => {
                                if (!item.submenu) {
                                    return (
                                        <Link key={idx} href={item.href as string}
                                            className="font-medium text-sm px-3 py-2 rounded hover:bg-neutral-100 text-neutral-700"
                                            onClick={() => setActiveSideBarMobile(false)}>
                                            {item.menuName}
                                        </Link>
                                    )
                                }

                                return null
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}