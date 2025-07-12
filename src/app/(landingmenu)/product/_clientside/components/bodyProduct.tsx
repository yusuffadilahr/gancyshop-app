"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { IProductPublic } from "@/app/(landingmenu)/product/_clientside/types"
import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import InputSearch from "@/components/core/inputSearch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { getAllProductPublic } from "@/app/(landingmenu)/product/_serverside/action"
import axios from "axios"
import { baseUrl } from "@/utils/axiosInstance"

interface IValueOnChange {
    tabList?: string
    searchProduct?: string
    kategoriId?: string
    minPrice?: string
}

interface ICategoryProduct {
    id: number
    categoryMotorcyleId: number
    categoryName: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export default function BodyProduct() {
    const params = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [page, setPage] = React.useState<number>(Number(params?.get('page')) || 1)
    const limit = 8

    const [loading, setLoading] = React.useState<{ loadingSearch: boolean }>({ loadingSearch: false })
    const [valueOnChange, setValueOnChange] = React.useState<IValueOnChange>({
        searchProduct: params?.get('search') || '',
        tabList: params?.get('tab') || '',
        kategoriId: params?.get('categoryId') || ''
    })

    const debounce = useDebouncedCallback((val) => {
        setValueOnChange(prev => ({ ...prev, searchProduct: val }))
        setLoading(prev => ({ ...prev, loadingSearch: false }))
    }, 800)

    const { data: dataGetProduct, refetch,
        isLoading: isLoadingGetProduct } = useQuery<{ totalPage: number; data: IProductPublic[] }>({
            queryKey: ['get-all-product', valueOnChange?.searchProduct, page, limit, valueOnChange?.kategoriId],
            queryFn: async () => {
                const response = await getAllProductPublic({
                    search: valueOnChange?.searchProduct || '',
                    page: page || 1,
                    limit: limit || 8,
                    category: valueOnChange?.kategoriId && valueOnChange?.kategoriId !== 'all' ? valueOnChange?.kategoriId : ''
                })

                const dataProduct = response?.data?.data || []
                const result = {
                    totalPage: response?.data?.totalPage || 1,
                    data: dataProduct
                };

                return result
            }
        })

    const { data: dataCategory,
        isLoading: isLoadingGetCategory } = useQuery<ICategoryProduct[]>({
            queryKey: ['get-data-category'],
            queryFn: async () => {
                const response = await axios.get(`${baseUrl}/product/all-category-product`, {
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    }
                })

                return response?.data?.data
            }
        })

    React.useEffect(() => {
        const searchParams = new URLSearchParams(params.toString())
        if (page) {
            searchParams.set('page', page.toString())
        } else {
            searchParams.delete('page')
        }

        if (limit) {
            searchParams.set('limit', limit.toString())
        } else {
            searchParams.delete('limit')
        }

        if (valueOnChange?.searchProduct) {
            searchParams.set('search', valueOnChange?.searchProduct)
        } else {
            searchParams.delete('search')
        }

        if (valueOnChange?.kategoriId && valueOnChange?.kategoriId !== 'all') {
            searchParams.set('categoryId', valueOnChange?.kategoriId)
        } else {
            searchParams.delete('categoryId')
        }

        const currentUrl = `${pathname}?${searchParams?.toString()}`
        router.replace(currentUrl)
        refetch()

    }, [valueOnChange, page, params])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Management Product</h1>
                <Button variant="secondary">Add Product</Button>
            </div>

            <div className="flex items-center justify-end gap-4 w-full">
                <Button variant="secondary">Add Product</Button>

                <div className="w-[400px]">
                    <InputSearch loadingSearch={loading.loadingSearch} placeholder="Search Product"
                        onChange={(e) => {
                            setLoading(prev => ({ ...prev, loadingSearch: true }))
                            debounce(e.target.value)
                        }} />
                </div>
            </div>

            <div className="w-full h-fit flex justify-center gap-2">
                <div className="hidden md:block w-full md:max-w-xs bg-white rounded-xl shadow-md p-4 space-y-4 h-fit
                sticky top-0">
                    <h2 className="text-lg font-bold">Filter Produk</h2>

                    <div className="space-y-1">
                        <Label>Kategori</Label>
                        <Select onValueChange={(val) => setValueOnChange(prev => ({ ...prev, kategoriId: val }))}
                            disabled={isLoadingGetCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                {dataCategory?.map(item => (
                                    <SelectItem value={`${item.id}`} key={item?.id}>{item?.categoryName}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    <div className="space-y-1">
                        <Label>Harga</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Min" className="w-1/2" />
                            <Input type="number" placeholder="Max" className="w-1/2" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Berat (gram)</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Min" className="w-1/2" />
                            <Input type="number" placeholder="Max" className="w-1/2" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Status Produk</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="true">Aktif</SelectItem>
                                <SelectItem value="false">Tidak Aktif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Stok</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Ketersediaan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="ready">Tersedia</SelectItem>
                                <SelectItem value="empty">Stok Habis</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Tanggal Dibuat</Label>
                        <Input type="date" />
                    </div>

                </div>

                {(isLoadingGetProduct) ?
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card className="overflow-hidden flex flex-col h-fit animate-pulse" key={i}>
                                <CardHeader className="p-0 relative h-60 w-full bg-gray-200" />
                                <CardContent className="p-4 flex flex-col justify-between space-y-2">
                                    <div>
                                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="space-y-1 mt-2">
                                        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-2 bg-gray-100 rounded w-2/4"></div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    <div className="h-8 bg-gray-300 rounded w-16" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    : !isLoadingGetProduct && dataGetProduct &&
                        dataGetProduct?.data?.length > 0 ?
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {dataGetProduct?.data?.map((product) => (
                                <Card key={product.id} className="overflow-hidden flex flex-col h-fit">
                                    <CardHeader className="p-0 relative h-60 w-full">
                                        <Image src={product.imageUrl} alt={product.name}
                                            fill className="object-cover w-full h-full" />

                                        {!product.isActive && (
                                            <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                                Tidak Aktif
                                            </span>
                                        )}
                                    </CardHeader>

                                    <CardContent className="p-4 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-semibold leading-tight line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <p className="text-xs text-blue-600 font-medium">
                                                {product.category.name}
                                            </p>
                                        </div>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-base font-bold text-slate-800">
                                                Rp{product.price.toLocaleString("id-ID")}
                                            </p>
                                            <p className="text-xs text-gray-600">Stok: {product.stock}</p>
                                            <p className="text-xs text-gray-600">Gramasi Pengiriman: {product.weightGram} kilogram</p>
                                            <p className="text-[10px] text-gray-400">
                                                Dibuat: {new Date(product.createdAt).toLocaleDateString("id-ID")}
                                            </p>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                        <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                            {product.stock > 0 ? 'Tersedia' : 'Stok Habis'}
                                        </span>
                                        <Button variant='default' size="sm" className="bg-red-500 hover:bg-red-400 text-white"
                                            disabled={!product.isActive || product.stock === 0}
                                        >
                                            Beli
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        : !isLoadingGetProduct && dataGetProduct && dataGetProduct?.data?.length === 0 && (
                            <div className="w-full">
                                <h1>tidak ada data</h1>
                            </div>
                        )}
            </div>

            <div className="flex justify-end items-center gap-2 pt-4">
                <Button variant="ghost" size="sm" disabled={page === 1}
                    onClick={(() => setPage(page + 1))}>Prev</Button>
                {Array.from({ length: Number(dataGetProduct?.totalPage || 1) }).map((_, i) => (
                    <Button key={i} variant='ghost' size="sm">
                        {i + 1}
                    </Button>
                ))}
                <Button variant="ghost" size="sm" disabled={page === dataGetProduct?.totalPage}
                    onClick={(() => setPage(page + 1))}>Next</Button>
            </div>
        </div>
    )
}