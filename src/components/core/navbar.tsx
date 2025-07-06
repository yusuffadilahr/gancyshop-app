"use client"
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
import { useAppSelector } from "@/redux/store"
import { Marquee, MarqueeItem, MarqueeContent } from '@/components/ui/shadcn-io/marquee'
import { Button } from "@/components/ui/button"
import { FaBox } from "react-icons/fa"
import { useDebouncedCallback } from "use-debounce"
import { getAllDataProductBySearch } from "@/app/_serverside/action"
import { IDataProduk } from "@/app/(admin)/admin/produk/_clientside/types"
import { Spinner } from "@/components/ui/spinner"
import { MdKeyboardArrowRight } from "react-icons/md"
import InputSearch from "@/components/core/inputSearch"
import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()

    const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage)

    const [tokenExist, setTokenExist] = React.useState<string>('')
    const [dataProduct, setDataProduct] = React.useState<IDataProduk[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)

    const arrayStatisNavigation = [
        { menuName: 'Beranda', href: '/' },
        {
            menuName: 'Produk',
            submenu: [
                { title: 'Semua Produk', href: '/product' },
                { title: 'Produk Populer', href: '/product/popular' },
                { title: 'Produk Terbaru', href: '/product/new' },
                { title: 'Diskon & Promo', href: '/product/discount' },
            ],
        },
        {
            menuName: 'Kategori',
            submenu: [
                { title: 'Honda Series', href: '/category/honda' },
                { title: 'Yamaha Series', href: '/category/yamaha' },
                { title: 'Suzuki Series', href: '/category/suzuki' },
                { title: 'Kawasaki Series', href: '/category/kawasaki' },
                { title: 'Custom & Aksesoris', href: '/category/custom' },
            ]
        },
        { menuName: 'Tentang', href: '/tentang-kami' },
        { menuName: 'Kontak', href: '/kontak' },
        { menuName: 'Testimonial', href: '/testimoni' },
        { menuName: 'Bantuan', href: '/faq' },
    ]

    const debounce = useDebouncedCallback((val: string) => {
        if (!!val) {
            handleGetData(val)
        }

        setLoading(false)
    }, 800)

    const handleGetData = async (val: string) => {
        try {
            const res = await getAllDataProductBySearch(val)
            if (!res.error) {
                setDataProduct(res.data)
                setLoading(false)
                return
            }

        } catch (error) {
            setDataProduct([])
            console.log(error)
        }
    }

    React.useEffect(() => {
        const token = localStorage?.getItem('_token')
        setTokenExist(token as string)
    }, [])

    return (
        <React.Fragment>
            {(!isNotFound && !pathname.startsWith('/admin')) && (
                <React.Fragment>
                    <Marquee className="bg-red-700">
                        <MarqueeContent>
                            {[
                                "Diskon Hingga 50% untuk Sparepart Pilihan!",
                                "Cover Body Motor Tersedia",
                                "Pengiriman Cepat Seluruh Indonesia",
                                "Beli Sekarang, Bayar di Tempat (COD)",
                                "Kualitas Terjamin, Harga Bersahabat",
                                "Banyak Pilihan Warna dan Model Cover Motor",
                            ].map((promo, index) => (
                                <MarqueeItem key={index}>
                                    <div className="py-2 flex items-center gap-2">
                                        {index === 3 && (<FaBox className="text-yellow-100" />)}
                                        <h1 className={`${index === 3 ? 'text-yellow-100' : 'text-white'} text-sm md:text-sm font-bold`}>{promo}</h1>
                                        <Link href={!!tokenExist ? '/product' : '/auth/login'}>
                                            <Button variant={"ghost"} size={"sm"} className="rounded-xl border text-white">
                                                Ambil sekarang
                                            </Button>
                                        </Link>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </MarqueeContent>
                    </Marquee>

                    <div className="py-4 px-5 w-full gap-2 md:flex hidden justify-between items-center">
                        <div className="md:flex hidden items-center gap-5 w-full">
                            <Link href={'/'} className="rounded-full w-fit h-12">
                                <Image alt="profile"
                                    src={'/new-logo.png'} width={500} height={500}
                                    className="w-fit h-12" />
                            </Link>
                            <div className="w-full flex relative">
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
                                                                <ListItem href={sub.href} title={sub.title} key={sub.title}>
                                                                    {sub.title}
                                                                </ListItem>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </React.Fragment>
                                            ) : (
                                                <Link href={item.href} passHref legacyBehavior>
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

                </React.Fragment>
            )}
        </React.Fragment>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"