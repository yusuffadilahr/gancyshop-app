// 'use client'

// import { getDataProductById } from "@/app/(landingmenu)/product/[detail]/_servers/services"
// import { IProductPublic } from "@/app/(landingmenu)/product/_clients/types"
// import { decryptParams } from "@/app/_clients/utils/secureParams"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { useQuery } from "@tanstack/react-query"
// import Image from "next/image"

// import {
//     FaBoxOpen,
//     FaHeart,
//     FaFilePdf,
//     FaShareAlt,
//     FaInfoCircle,
//     FaTags,
//     FaWeight,
//     // FaCalendarAlt,
// } from "react-icons/fa";
// import { MdCategory } from "react-icons/md"
// import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
// import { formatRupiah } from "@/app/_clients/utils/formatConverter"

// export default function BodyDetailProduct({ idProduct }: { idProduct: string }) {
//     const idProductDecrypted = decryptParams(idProduct) || undefined

//     const { data: dataProduct, isLoading: isLoadingGetProduct } = useQuery<IProductPublic>({
//         queryKey: ['get-product'],
//         queryFn: async () => {
//             return (await getDataProductById(idProductDecrypted))?.data
//         }
//     })

//     if (isLoadingGetProduct) return null
//     return (
//         <div className="px-2 py-6 min-h-screen w-full space-y-10">
//             <div className="w-full flex flex-col lg:flex-row gap-4">
//                 <div className="w-full lg:w-1/2 space-y-2">
//                     <div className="bg-white overflow-hidden flex justify-center items-center aspect-square">
//                         <Image
//                             src={dataProduct?.imageUrl || '/no-data.png'}
//                             alt={dataProduct?.name || "Gambar Produk"}
//                             width={500}
//                             height={500}
//                             className="object-contain w-full max-h-[400px]"
//                         />
//                     </div>
//                 </div>

//                 <div className="w-full lg:w-1/2">
//                     <Card className="shadow-md w-full">
//                         <CardHeader>
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <CardTitle className="text-2xl text-red-600">
//                                         {dataProduct?.name || <Skeleton className="h-6 w-32" />}
//                                     </CardTitle>
//                                     <p className="text-sm text-gray-500 mt-1">Kode Produk #{dataProduct?.id}</p>
//                                 </div>
//                                 <Badge className={`text-white flex items-center gap-1 ${dataProduct?.isActive ? 'bg-green-600' : 'bg-gray-400'}`}>
//                                     {dataProduct?.isActive ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
//                                     {dataProduct?.isActive ? 'Tersedia' : 'Tidak Aktif'}
//                                 </Badge>
//                             </div>
//                             {dataProduct?.category?.categoryName && (
//                                 <Badge variant="outline" className="text-red-600 border-red-400 mt-2 w-fit">
//                                     {dataProduct.category.categoryName}
//                                 </Badge>
//                             )}
//                         </CardHeader>

//                         <CardContent className="space-y-4">
//                             <div>
//                                 <p className="text-sm text-gray-600">Harga mulai dari</p>
//                                 <p className="text-2xl font-bold text-gray-800">
//                                     {formatRupiah(dataProduct?.price ?? 0)}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                     Berat: <strong>{dataProduct?.weightGram} gram</strong> • Estimasi Ongkir: <strong>{Math.ceil((dataProduct?.weightGram || 0) / 1000)} kg</strong>
//                                 </p>
//                             </div>

//                             <div className="grid gap-2">
//                                 <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-sm font-semibold shadow-md transition-all duration-200">
//                                     🚀 Ajukan Penawaran Sekarang
//                                 </Button>
//                                 <Button variant="outline" className="w-full border-red-600 text-red-600 text-sm font-semibold hover:bg-red-50 transition-all duration-200">
//                                     ♻️ Tukar Tambah Produk
//                                 </Button>
//                             </div>

//                             <div className="flex justify-between text-sm text-gray-700">
//                                 <span className="flex items-center gap-1"><FaBoxOpen /> Stok: {dataProduct?.stock ?? 0} pcs</span>
//                                 <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 flex items-center gap-1">
//                                     <FaHeart /> Favoritkan
//                                 </Button>
//                             </div>

//                             <div className="flex justify-between items-center text-sm text-gray-700 border-t pt-2">
//                                 <Button variant="ghost" size="sm" className="hover:text-blue-600 flex items-center gap-1">
//                                     <FaFilePdf /> Unduh Info Produk
//                                 </Button>
//                                 <Button variant="ghost" size="sm" className="hover:text-blue-500 flex items-center gap-1">
//                                     <FaShareAlt /> Bagikan
//                                 </Button>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Accordion type="single" collapsible className="mt-6">
//                         <AccordionItem value="desc">
//                             <AccordionTrigger className="flex items-center gap-2">
//                                 <FaInfoCircle /> Deskripsi Produk
//                             </AccordionTrigger>
//                             <AccordionContent>
//                                 <p className="text-sm text-gray-700 whitespace-pre-line">
//                                     {dataProduct?.description || "Tidak ada deskripsi tersedia."}
//                                 </p>
//                             </AccordionContent>
//                         </AccordionItem>
//                     </Accordion>

//                     <Tabs defaultValue="tipe" className="mt-6">
//                         <TabsList className="grid grid-cols-4 w-full bg-white shadow-sm border rounded-md">
//                             <TabsTrigger value="tipe">Tipe</TabsTrigger>
//                             <TabsTrigger value="berat">Berat</TabsTrigger>
//                             <TabsTrigger value="status">Status</TabsTrigger>
//                             <TabsTrigger value="tanggal">Tanggal</TabsTrigger>
//                         </TabsList>

//                         <TabsContent value="tipe" className="p-4 text-sm bg-white border rounded-md mt-2 space-y-1">
//                             <div className="flex items-center gap-2"><FaTags /> ID Produk: <strong>{dataProduct?.id}</strong></div>
//                             <div className="flex items-center gap-2"><MdCategory /> Kategori: <strong>{dataProduct?.category?.categoryName}</strong></div>
//                         </TabsContent>

//                         <TabsContent value="berat" className="p-4 text-sm bg-white border rounded-md mt-2">
//                             <div className="flex items-center gap-2"><FaWeight /> Berat bersih: <strong>{dataProduct?.weightGram} gram</strong></div>
//                         </TabsContent>

//                         <TabsContent value="status" className="p-4 text-sm bg-white border rounded-md mt-2 space-y-1">
//                             <div className="flex items-center gap-2">
//                                 {dataProduct?.isActive ? <AiOutlineCheckCircle className="text-green-600" /> : <AiOutlineCloseCircle className="text-gray-500" />}
//                                 Status: <strong>{dataProduct?.isActive ? 'Aktif' : 'Tidak Aktif'}</strong>
//                             </div>
//                             <div className="flex items-center gap-2"><FaBoxOpen /> Stok: <strong>{dataProduct?.stock} pcs</strong></div>
//                         </TabsContent>
//                         {/* 
//                         <TabsContent value="tanggal" className="p-4 text-sm bg-white border rounded-md mt-2">
//                             <div className="flex items-center gap-2"><FaCalendarAlt /> Dibuat: <strong>{new Date(dataProduct?.createdAt).toLocaleDateString("id-ID")}</strong></div>
//                         </TabsContent> */}
//                     </Tabs>

//                     {/* Promo Info */}
//                     <div className="mt-6 bg-orange-50 border border-orange-200 text-sm p-4 rounded-xl shadow-inner text-orange-800 flex items-center gap-2">
//                         <FaInfoCircle className="text-orange-500" />
//                         Cocok digunakan untuk berbagai kebutuhan kendaraan. Jika Anda ragu, hubungi tim kami untuk konsultasi gratis!
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'

import { useState } from 'react';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    Share2,
    Download,
    ShoppingCart,
    RefreshCw,
    Package,
    Tag,
    CheckCircle,
    XCircle,
    Star,
    Truck,
    Shield,
    Award,
    Eye,
    Plus,
    Minus,
    Info,
} from 'lucide-react';
import Image from 'next/image'
import { decryptParams } from '@/app/_clients/utils/secureParams';
import { useQuery } from '@tanstack/react-query';
import { getDataProductById } from '@/app/(landingmenu)/product/[detail]/_servers/services';

export interface IProductPublic {
    id: number
    name: string
    description: string
    price: number
    stock: number
    imageUrl: string
    fileId: string | null
    weightGram: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    categoryId: number
    ownerId: number
    category: {
        id: number
        categoryName: string
        createdAt: string
        updatedAt: string
        deletedAt: string | null
    }
}

export default function ProfessionalProductDetail({ idProduct }: { idProduct: string }) {

    const idProductDecrypted = decryptParams(idProduct) || undefined
    const { data: dataProduct,
        // isLoading: isLoadingGetProduct
    } = useQuery<IProductPublic>({
        queryKey: ['get-product'],
        queryFn: async () => {
            return (await getDataProductById(idProductDecrypted))?.data
        }
    })
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState("overview")

    const images = [
        dataProduct?.imageUrl || "/no-data.png",
        dataProduct?.imageUrl || "/no-data.png",
        dataProduct?.imageUrl || "/no-data.png",
        dataProduct?.imageUrl || "/no-data.png"
    ]

    const mockEnhancements = {
        rating: 4.8,
        totalReviews: 156,
        sold: 1240,
        views: 1247,
        discount: 15, // percentage
        originalPrice: Math.round((dataProduct?.price || 0) * 1.15) // calculated based on discount
    }

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            {/* <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="text-sm text-gray-600">
                        <span>Home</span> <span className="mx-2">/</span>
                        <span>Products</span> <span className="mx-2">/</span>
                        <span>{dataProduct?.category?.categoryName}</span> <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">{dataProduct?.name}</span>
                    </nav>
                </div>
            </div> */}

            <div className="px-2 sm:px-6 mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-2xl shadow-sm border overflow-hidden">
                            <Image width={500} height={500}
                                src={images[0]}
                                alt={dataProduct?.name || ''}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Badge className={`text-white flex items-center gap-1 ${dataProduct?.isActive ? 'bg-green-600 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-400'
                                    }`}>
                                    {dataProduct?.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {dataProduct?.isActive ? 'In Stock' : 'Not Available'}
                                </Badge>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                    {dataProduct?.name}
                                </h1>
                                <p className="text-gray-600 mt-1">Product ID: #{dataProduct?.id}</p>
                            </div>

                            {/* Rating & Reviews */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(mockEnhancements.rating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-medium text-gray-900">{mockEnhancements.rating}</span>
                                    <span className="text-gray-600">({mockEnhancements.totalReviews} reviews)</span>
                                </div>
                                <Separator orientation="vertical" className="h-4" />
                                <span className="text-sm text-gray-600">{mockEnhancements.sold} sold</span>
                            </div>

                            {/* Category */}
                            <Badge variant="outline" className="text-red-600 border-red-300 w-fit">
                                <Tag className="w-3 h-3 mr-1" />
                                {dataProduct?.category?.categoryName}
                            </Badge>
                        </div>

                        {/* Pricing */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {formatRupiah(dataProduct?.price || 0)}
                                    </span>
                                    {mockEnhancements.discount > 0 && (
                                        <>
                                            <span className="text-lg text-gray-500 line-through">
                                                {formatRupiah(mockEnhancements.originalPrice)}
                                            </span>
                                            <Badge className="bg-red-500 hover:bg-red-500">
                                                -{mockEnhancements.discount}%
                                            </Badge>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Weight: <strong>{dataProduct?.weightGram}g</strong> •
                                    Shipping estimate: <strong>{Math.ceil((dataProduct?.weightGram || 0) / 1000)}kg</strong>
                                </p>
                            </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-900">Quantity:</span>
                                <div className="flex items-center border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="hover:bg-gray-100"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 font-medium">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <span className="text-sm text-gray-600">
                                    {dataProduct?.stock} pieces available
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Request Quote
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Trade In
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-lg bg-blue-50">
                                <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-blue-800">Free Shipping</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-green-50">
                                <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-green-800">Warranty</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-purple-50">
                                <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-purple-800">Premium Quality</p>
                            </div>
                        </div>

                        {/* Download & Share */}
                        <div className="flex justify-between items-center pt-4 border-t">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                                <Download className="w-4 h-4 mr-2" />
                                Download Product Info
                            </Button>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Eye className="w-4 h-4" />
                                <span>{mockEnhancements.views} views</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-16">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border rounded-lg h-12">
                            <TabsTrigger value="overview" className="font-medium">Overview</TabsTrigger>
                            <TabsTrigger value="specifications" className="font-medium">Specifications</TabsTrigger>
                            <TabsTrigger value="reviews" className="font-medium">Reviews</TabsTrigger>
                            <TabsTrigger value="shipping" className="font-medium">Shipping</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-8">
                            <Card className="shadow-sm">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Product Description</h3>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {dataProduct?.description || "No description available for this dataProduct?."}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="specifications" className="mt-8">
                            <Card className="shadow-sm">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-semibold mb-6 text-gray-900">Product Specifications</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Product ID</span>
                                                <span className="text-gray-600">#{dataProduct?.id}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Category</span>
                                                <span className="text-gray-600">{dataProduct?.category?.categoryName}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Weight</span>
                                                <span className="text-gray-600">{dataProduct?.weightGram}g</span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Created Date</span>
                                                <span className="text-gray-600">{formatDate(dataProduct?.createdAt || '')}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Stock</span>
                                                <span className="text-gray-600">{dataProduct?.stock} pieces</span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Status</span>
                                                <Badge className={dataProduct?.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                                    {dataProduct?.isActive ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                                                    {dataProduct?.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Rating</span>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-gray-600">{mockEnhancements.rating}/5</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-900">Last Updated</span>
                                                <span className="text-gray-600">{formatDate(dataProduct?.updatedAt || '')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-8">
                            <Card className="shadow-sm">
                                <CardContent className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                    // className={`w-5 h-5 ${i < Math.floor(mockdataProduct?.rating)
                                                    //         ? 'text-yellow-400 fill-current'
                                                    //         : 'text-gray-300'
                                                    //     }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-lg font-semibold">{mockEnhancements.rating}</span>
                                            <span className="text-gray-600">({mockEnhancements.totalReviews} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="text-center py-12 text-gray-500">
                                        <Info className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>Reviews will be displayed here</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="shipping" className="mt-8">
                            <Card className="shadow-sm">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-semibold mb-6 text-gray-900">Shipping Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                                            <Truck className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                            <h4 className="font-semibold text-blue-900 mb-2">Standard Shipping</h4>
                                            <p className="text-sm text-blue-700">3-7 business days</p>
                                            <p className="text-sm text-blue-700">Free for orders over Rp 500,000</p>
                                        </div>
                                        <div className="text-center p-6 bg-green-50 rounded-xl">
                                            <Package className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                            <h4 className="font-semibold text-green-900 mb-2">Express Shipping</h4>
                                            <p className="text-sm text-green-700">1-2 business days</p>
                                            <p className="text-sm text-green-700">Additional charges apply</p>
                                        </div>
                                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                                            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                            <h4 className="font-semibold text-purple-900 mb-2">Secure Packaging</h4>
                                            <p className="text-sm text-purple-700">Protected delivery</p>
                                            <p className="text-sm text-purple-700">Insurance included</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* CTA Banner */}
                <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white text-center shadow-xl">
                    <h3 className="text-2xl font-bold mb-2">Need Help Choosing the Right Product?</h3>
                    <p className="text-red-100 mb-6">Our experts are here to help you find the perfect solution for your needs.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
                        >
                            Contact Our Experts
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-red-600 font-semibold"
                        >
                            Browse Similar Products
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}