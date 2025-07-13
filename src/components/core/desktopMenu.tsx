import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { MdKeyboardArrowRight } from "react-icons/md"
import InputSearch from "@/components/core/inputSearch"
import { IDataProduk } from "@/app/(admin)/admin/produk/_clientside/types"

interface INavigationItem {
    menuName: string;
    href?: string;
    submenu?: {
        title: string,
        href: string,
        titleCaption: string
    }[]
}

interface IDesktopMenuProps {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    dataProduct: IDataProduk[]
    setDataProduct: React.Dispatch<React.SetStateAction<IDataProduk[]>>
    debounce: (value: string) => void;
    arrayStatisNavigation: INavigationItem[];
    tokenExist: string
}

export default function DesktopMenu({
    setLoading, loading,
    debounce,
    setDataProduct,
    dataProduct,
    arrayStatisNavigation,
    tokenExist
}: IDesktopMenuProps) {
    return (
        <div className="py-4 px-5 w-full gap-2 md:flex hidden justify-between items-center">
            <div className="md:flex hidden items-center gap-5 w-full">
                <Link href={'/'} className="rounded-full w-fit h-12">
                    <Image alt="profile"
                        src={'/new-logo.png'} width={500} height={500}
                        className="w-fit h-12" />
                </Link>
                <div className="w-full hidden lg:flex relative">
                    <InputSearch loadingSearch={loading} onChange={(e) => {
                        setLoading(true)
                        debounce(e.target.value)
                        setDataProduct([])
                    }} />

                    {dataProduct.length > 0 ? (
                        <div className="absolute bg-white top-12 z-20 rounded-b-xl max-h-[250px] overflow-auto">
                            <ul className="grid gap-2 p-4 md:w-[200px] lg:w-[650px] space-y-2">
                                {dataProduct.map((sub) => (
                                    <Link href={`/product/${sub.id}`} key={sub.id}>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <div className="flex items-center gap-2">
                                                <Image alt="photo" src={sub.imageUrl} className="w-14 h-1w-14 object-cover"
                                                    height={500} width={500} />
                                                <div>
                                                    <li title={sub.name} onClick={() => setDataProduct([])}>
                                                        {sub.name}
                                                    </li>
                                                    <p className="text-sm text-neutral-500">{sub.category.categoryName}</p>
                                                </div>
                                            </div>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ) : loading && (
                        <ul className="grid gap-2 p-4 md:w-[200px] lg:w-[650px] absolute bg-white rounded-b-xl top-12 z-20">
                            <li className="w-full flex justify-center items-center gap-2">
                                <Spinner size={"small"} /> Loading..
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    {arrayStatisNavigation.map(item => {
                        return (
                            <NavigationMenuItem key={item.menuName}>
                                {item.submenu ? (
                                    <React.Fragment>
                                        <NavigationMenuTrigger className="font-semibold">{item.menuName}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-2 p-4 md:w-[200px] lg:w-[300px]">
                                                {item.submenu.map((sub) => (
                                                    <li key={sub.href}>
                                                        <NavigationMenuLink asChild>
                                                            <Link href={sub.href}
                                                                className={cn(
                                                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                )}>
                                                                <div className="text-sm font-medium leading-none">{sub.title}</div>
                                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                    {sub.titleCaption}
                                                                </p>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </React.Fragment>
                                ) : (
                                    <Link href={item.href as string} passHref legacyBehavior>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {item.menuName}
                                        </NavigationMenuLink>
                                    </Link>
                                )}
                            </NavigationMenuItem>
                        )
                    })}

                    {!tokenExist && (
                        <React.Fragment>
                            <NavigationMenuItem>
                                <Link href="/auth/register" legacyBehavior passHref>
                                    <Button variant={"outline"}>Daftar</Button>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/auth/login" legacyBehavior passHref>
                                    <Button variant={"outline"}>Masuk</Button>
                                </Link>
                            </NavigationMenuItem>
                        </React.Fragment>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}