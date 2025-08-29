"use client"
import * as React from "react"
import Link from "next/link"

import { useAppSelector } from "@/redux/store"
import { Marquee, MarqueeItem, MarqueeContent } from '@/components/ui/shadcn-io/marquee'
import { Button } from "@/components/ui/button"
import { FaBox } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce"
import { getAllDataProductBySearch } from "@/app/_servers/services"
import { IDataProduk } from "@/app/(admin)/admin/produk/_clients/types"
import { usePathname } from "next/navigation"
import DesktopMenu from "@/components/core/desktopMenu"
import MobileMenu from "@/components/core/mobileMenu"
import Cookies from "js-cookie"

export function Navbar() {
    const pathname = usePathname()
    const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage)

    const [tokenExist, setTokenExist] = React.useState<string>('')
    const [dataProduct, setDataProduct] = React.useState<IDataProduk[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [activeSideBarMobile, setActiveSideBarMobile] = React.useState<boolean>(false)

    const arrayStatisNavigation = [
        { menuName: 'Beranda', href: '/' },
        { menuName: 'Produk', href: '/product' },
        {
            menuName: 'Kategori',
            submenu: [
                { title: 'Honda Series', href: '/category/honda', titleCaption: 'Sparepart & aksesoris Honda' },
                { title: 'Yamaha Series', href: '/category/yamaha', titleCaption: 'Sparepart & aksesoris Yamaha' },
                { title: 'Suzuki Series', href: '/category/suzuki', titleCaption: 'Sparepart & aksesoris Suzuki' },
                { title: 'Kawasaki Series', href: '/category/kawasaki', titleCaption: 'Sparepart & aksesoris Kawasaki' },
                { title: 'Custom & Aksesoris', href: '/category/custom', titleCaption: 'Khusus aksesoris dan modifikasi' },
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
                setDataProduct(res?.data?.data)
                setLoading(false)
                return
            }

        } catch (error) {
            setDataProduct([])
            console.log(error)
        }
    }

    React.useEffect(() => {
        const token = Cookies.get('_token')
        if (token) setTokenExist(token as string)
    }, [])

    return (
        <React.Fragment>
            {(!isNotFound && !pathname.startsWith('/admin')) && (
                <React.Fragment>
                    <Marquee className="bg-red-700 md:block hidden">
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

                    <DesktopMenu arrayStatisNavigation={arrayStatisNavigation}
                        dataProduct={dataProduct} debounce={debounce}
                        loading={loading} setDataProduct={setDataProduct}
                        setLoading={setLoading} tokenExist={tokenExist} />

                    <MobileMenu activeSideBarMobile={activeSideBarMobile}
                        arrayStatisNavigation={arrayStatisNavigation}
                        setActiveSideBarMobile={setActiveSideBarMobile} />

                </React.Fragment>
            )}
        </React.Fragment>
    )
}