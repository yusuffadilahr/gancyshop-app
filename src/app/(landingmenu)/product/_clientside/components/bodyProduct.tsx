"use client";;
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { IProductPublic } from "@/app/(landingmenu)/product/_clientside/types"
import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { getAllProductPublic } from "@/app/(landingmenu)/product/_serverside/action"
import axios from "axios"
import { baseUrl } from "@/utils/axiosInstance"
import SkeletonCardProduct from "@/components/core/skeletonCardProduct";
import { GrPowerReset } from "react-icons/gr";
import DatePicker from "@/components/core/datePickerInput";

interface IValueOnChange {
    searchProduct?: string
    kategoriId?: string
    minPrice?: string
    maxPrice?: string
    minWeight?: string
    maxWeight?: string
    stock?: string
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
    const [datePicker, setDatePicker] = React.useState<Date | undefined>(undefined)
    const [valueOnChange, setValueOnChange] = React.useState<IValueOnChange>({
        searchProduct: '', kategoriId: params?.get('category-id') || '',
        minPrice: '', maxPrice: '',
        minWeight: '', maxWeight: '',
        stock: ''
    })

    const debounceMinPrice = useDebouncedCallback(val => {
        setValueOnChange(prev => ({ ...prev, minPrice: val }))
    }, 800)

    const debounceMaxPrice = useDebouncedCallback(val => {
        setValueOnChange(prev => ({ ...prev, maxPrice: val }))
    }, 800)

    const debounceMinWeight = useDebouncedCallback(val => {
        setValueOnChange(prev => ({ ...prev, minWeight: val }))
    }, 800)

    const debounceMaxWeight = useDebouncedCallback(val => {
        setValueOnChange(prev => ({ ...prev, maxWeight: val }))
    }, 800)

    const { data: dataGetProduct, refetch,
        isLoading: isLoadingGetProduct } = useQuery<{ totalPage: number; data: IProductPublic[] }>({
            queryKey: ['get-all-product', valueOnChange?.searchProduct, page, limit, valueOnChange?.kategoriId],
            queryFn: async () => {
                const dataArgs = {
                    search: valueOnChange?.searchProduct || '',
                    page: page || 1,
                    limit: limit || 8,
                    category: valueOnChange?.kategoriId && valueOnChange?.kategoriId !== 'all' ? valueOnChange?.kategoriId : '',
                    tanggal: datePicker?.toLocaleDateString() || '',
                    minPrice: (valueOnChange?.minPrice && valueOnChange?.minPrice !== '0') ? valueOnChange?.minPrice : '',
                    maxPrice: (valueOnChange?.maxPrice && valueOnChange?.maxPrice !== '0') ? valueOnChange?.maxPrice : '',
                    minWeight: (valueOnChange?.minWeight && valueOnChange?.minWeight !== '0') ? valueOnChange?.minWeight : '',
                    maxWeight: (valueOnChange?.maxWeight && valueOnChange?.maxWeight !== '0') ? valueOnChange?.maxWeight : '',
                    stock: (valueOnChange?.stock && valueOnChange?.stock !== 'all') ? valueOnChange?.stock : '',
                }

                const response = await getAllProductPublic(dataArgs)

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
            searchParams.set('category-id', valueOnChange?.kategoriId)
        } else {
            searchParams.delete('category-id')
        }

        if (valueOnChange?.stock && valueOnChange?.stock !== 'all') {
            searchParams.set('stok', valueOnChange?.stock)
        } else {
            searchParams.delete('stok')
        }

        if (datePicker) {
            searchParams.set('tanggal', datePicker.toLocaleDateString())
        } else {
            searchParams.delete('tanggal')
        }

        if (valueOnChange?.minPrice && valueOnChange.minPrice !== '0') {
            searchParams.set('min-price', valueOnChange?.minPrice)
        } else {
            searchParams.delete('min-price')
        }

        if (valueOnChange?.maxPrice && valueOnChange.maxPrice !== '0') {
            searchParams.set('max-price', valueOnChange?.maxPrice)
        } else {
            searchParams.delete('max-price')
        }

        if (valueOnChange?.minWeight && valueOnChange.minWeight !== '0') {
            searchParams.set('min-weight', valueOnChange?.minWeight)
        } else {
            searchParams.delete('min-weight')
        }

        if (valueOnChange?.maxWeight && valueOnChange.maxWeight !== '0') {
            searchParams.set('max-weight', valueOnChange?.maxWeight)
        } else {
            searchParams.delete('max-weight')
        }

        const currentUrl = `${pathname}?${searchParams?.toString()}`
        router.replace(currentUrl)
        refetch()

    }, [valueOnChange, page, params, datePicker])

    console.log(dataGetProduct, '<<')

    return (
        <div className="p-6 space-y-6">

            <div className="w-full h-fit flex justify-center gap-2">
                <div className="hidden md:block w-full md:max-w-xs bg-white rounded-xl shadow-md p-4 space-y-4 h-fit
                sticky top-2 border">
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
                            <Input type="number" placeholder="Min" className="w-1/2" min={0}
                                onChange={(e) => debounceMinPrice(e.target.value)} />
                            <Input type="number" placeholder="Max" className="w-1/2" min={0}
                                onChange={(e) => debounceMaxPrice(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Berat (gram)</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Min" className="w-1/2" min={0}
                                onChange={(e) => debounceMinWeight(e.target.value)} />

                            <Input type="number" placeholder="Max" className="w-1/2" min={0}
                                onChange={(e) => debounceMaxWeight(e.target.value)} />

                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Stok</Label>
                        <Select onValueChange={(val) => setValueOnChange(prev => ({ ...prev, stock: val }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Ketersediaan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="tersedia">Tersedia Banyak</SelectItem>
                                <SelectItem value="hampir-habis">Stok Hampir Habis</SelectItem>
                                <SelectItem value="stok-habis">Stok Habis</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Tanggal Dibuat</Label>
                        <DatePicker date={datePicker} setDate={setDatePicker} />
                    </div>

                    <Button className="w-full flex items-center">
                        <GrPowerReset /> Reset Filter</Button>
                </div>

                {(isLoadingGetProduct) ?
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCardProduct key={i} />)}
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
                                                {product.category.categoryName}
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
                    onClick={(() => setPage(page - 1))}>Prev</Button>
                {Array.from({ length: Number(dataGetProduct?.totalPage || 1) }).map((_, i) => (
                    <Button key={i} variant={((i + 1) === page) ? 'default' :'ghost'} size="sm">
                {i + 1}
            </Button>
                ))}
            <Button variant="ghost" size="sm" disabled={page === dataGetProduct?.totalPage}
                onClick={(() => setPage(page + 1))}>Next</Button>
        </div>
        </div >
    )
}