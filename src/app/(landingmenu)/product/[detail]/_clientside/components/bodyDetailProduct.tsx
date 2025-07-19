'use client'

import { getDataProductById } from "@/app/(landingmenu)/product/[detail]/_serverside/action"
import { IProductPublic } from "@/app/(landingmenu)/product/_clientside/types"
import { decryptParams } from "@/utils/secureParams"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import {
    FaBoxOpen,
    FaHeart,
    FaFilePdf,
    FaShareAlt,
    FaInfoCircle,
    FaTags,
    FaWeight,
    // FaCalendarAlt,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { formatRupiah } from "@/utils/formatConverter"

export default function BodyDetailProduct({ idProduct }: { idProduct: string }) {
    const idProductDecrypted = decryptParams(idProduct) || undefined

    const { data: dataProduct, isLoading: isLoadingGetProduct } = useQuery<IProductPublic>({
        queryKey: ['get-product'],
        queryFn: async () => {
            return (await getDataProductById(idProductDecrypted))?.data
        }
    })

    if (isLoadingGetProduct) return null
    return (
        <div className="px-2 py-6 min-h-screen w-full space-y-10">
            <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 space-y-2">
                    <div className="bg-white overflow-hidden flex justify-center items-center aspect-square">
                        <Image
                            src={dataProduct?.imageUrl || '/no-data.png'}
                            alt={dataProduct?.name || "Gambar Produk"}
                            width={500}
                            height={500}
                            className="object-contain w-full max-h-[400px]"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <Card className="shadow-md w-full">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl text-red-600">
                                        {dataProduct?.name || <Skeleton className="h-6 w-32" />}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500 mt-1">Kode Produk #{dataProduct?.id}</p>
                                </div>
                                <Badge className={`text-white flex items-center gap-1 ${dataProduct?.isActive ? 'bg-green-600' : 'bg-gray-400'}`}>
                                    {dataProduct?.isActive ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
                                    {dataProduct?.isActive ? 'Tersedia' : 'Tidak Aktif'}
                                </Badge>
                            </div>
                            {dataProduct?.category?.categoryName && (
                                <Badge variant="outline" className="text-red-600 border-red-400 mt-2 w-fit">
                                    {dataProduct.category.categoryName}
                                </Badge>
                            )}
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600">Harga mulai dari</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {formatRupiah(dataProduct?.price ?? 0)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Berat: <strong>{dataProduct?.weightGram} gram</strong> • Estimasi Ongkir: <strong>{Math.ceil((dataProduct?.weightGram || 0) / 1000)} kg</strong>
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-sm font-semibold shadow-md transition-all duration-200">
                                    🚀 Ajukan Penawaran Sekarang
                                </Button>
                                <Button variant="outline" className="w-full border-red-600 text-red-600 text-sm font-semibold hover:bg-red-50 transition-all duration-200">
                                    ♻️ Tukar Tambah Produk
                                </Button>
                            </div>

                            <div className="flex justify-between text-sm text-gray-700">
                                <span className="flex items-center gap-1"><FaBoxOpen /> Stok: {dataProduct?.stock ?? 0} pcs</span>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 flex items-center gap-1">
                                    <FaHeart /> Favoritkan
                                </Button>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-700 border-t pt-2">
                                <Button variant="ghost" size="sm" className="hover:text-blue-600 flex items-center gap-1">
                                    <FaFilePdf /> Unduh Info Produk
                                </Button>
                                <Button variant="ghost" size="sm" className="hover:text-blue-500 flex items-center gap-1">
                                    <FaShareAlt /> Bagikan
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Accordion type="single" collapsible className="mt-6">
                        <AccordionItem value="desc">
                            <AccordionTrigger className="flex items-center gap-2">
                                <FaInfoCircle /> Deskripsi Produk
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm text-gray-700 whitespace-pre-line">
                                    {dataProduct?.description || "Tidak ada deskripsi tersedia."}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Tabs defaultValue="tipe" className="mt-6">
                        <TabsList className="grid grid-cols-4 w-full bg-white shadow-sm border rounded-md">
                            <TabsTrigger value="tipe">Tipe</TabsTrigger>
                            <TabsTrigger value="berat">Berat</TabsTrigger>
                            <TabsTrigger value="status">Status</TabsTrigger>
                            <TabsTrigger value="tanggal">Tanggal</TabsTrigger>
                        </TabsList>

                        <TabsContent value="tipe" className="p-4 text-sm bg-white border rounded-md mt-2 space-y-1">
                            <div className="flex items-center gap-2"><FaTags /> ID Produk: <strong>{dataProduct?.id}</strong></div>
                            <div className="flex items-center gap-2"><MdCategory /> Kategori: <strong>{dataProduct?.category?.categoryName}</strong></div>
                        </TabsContent>

                        <TabsContent value="berat" className="p-4 text-sm bg-white border rounded-md mt-2">
                            <div className="flex items-center gap-2"><FaWeight /> Berat bersih: <strong>{dataProduct?.weightGram} gram</strong></div>
                        </TabsContent>

                        <TabsContent value="status" className="p-4 text-sm bg-white border rounded-md mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                                {dataProduct?.isActive ? <AiOutlineCheckCircle className="text-green-600" /> : <AiOutlineCloseCircle className="text-gray-500" />}
                                Status: <strong>{dataProduct?.isActive ? 'Aktif' : 'Tidak Aktif'}</strong>
                            </div>
                            <div className="flex items-center gap-2"><FaBoxOpen /> Stok: <strong>{dataProduct?.stock} pcs</strong></div>
                        </TabsContent>
                        {/* 
                        <TabsContent value="tanggal" className="p-4 text-sm bg-white border rounded-md mt-2">
                            <div className="flex items-center gap-2"><FaCalendarAlt /> Dibuat: <strong>{new Date(dataProduct?.createdAt).toLocaleDateString("id-ID")}</strong></div>
                        </TabsContent> */}
                    </Tabs>

                    {/* Promo Info */}
                    <div className="mt-6 bg-orange-50 border border-orange-200 text-sm p-4 rounded-xl shadow-inner text-orange-800 flex items-center gap-2">
                        <FaInfoCircle className="text-orange-500" />
                        Cocok digunakan untuk berbagai kebutuhan kendaraan. Jika Anda ragu, hubungi tim kami untuk konsultasi gratis!
                    </div>
                </div>
            </div>
        </div>
    )
}
