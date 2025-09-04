'use client'

import InputSearch from "@/components/core/inputSearch"
import TitleDashboardSection from "@/components/core/titleDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Edit, Eye, Filter, MoreHorizontal, Trash2 } from "lucide-react"
import { getDataAllUser } from "../services"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PaginationTable } from "@/components/core/paginationTable"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout"

interface IDataAllUser {
    address: string | null
    createdAt: string
    email: string
    firstName: string
    id: number
    lastName: string
    phoneNumber: string
    role: "ADMIN" | "USER"
}

interface IResponseGetUser { data: IDataAllUser[]; totalPage: number }

export default function BodyPengguna() {
    const [page, setPage] = useState<number>(1)
    const [searchData, setSearchData] = useState<{ display: string; debounce: string; loading: boolean }>({
        debounce: '', display: '', loading: false
    })
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const limit = 5

    const { data: dataAllUser,
        isLoading, refetch
    } = useQuery<IResponseGetUser>({
        queryKey: ['get_user'],
        queryFn: async () => {
            const response = await getDataAllUser({ page, limit, search: searchData.debounce })
            if (response?.error) throw response

            return response?.data
        }
    })

    const debounce = useDebouncedCallback(val => {
        setSearchData(prev => ({ ...prev, debounce: val, loading: false }))
    }, 800)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (page) {
            params.set('page', page.toString())
        } else {
            params.delete('page')
        }

        if (limit) {
            params.set('limit', limit.toString())
        } else {
            params.delete('limit')
        }

        if (searchData.debounce) {
            params.set('search', searchData.debounce)
        } else {
            params.delete('search')
        }

        const currentPath = `${pathname}?${params}`
        router.replace(currentPath)
        refetch()

    }, [page, limit, searchData.debounce])

    return (
        <DashboardContentLayout>
            <TitleDashboardSection description="Kelola Pengguna Website Anda"
                titleMenuDashboard="Pengguna"
            // action={<DynamicModalAddKategori refetch={refetchGetdataAllUser} />} 
            />

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter & Pencarian
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputSearch loadingSearch={searchData?.loading}
                            searchParams={searchParams}
                            onChange={(e) => {
                                const { value } = e.target
                                setSearchData(prev => ({ ...prev, loading: true, display: value }))
                                debounce(value)
                            }} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 px-4 py-4 font-semibold text-gray-700">
                                        No
                                    </TableHead>
                                    <TableHead
                                        className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                                    // onClick={() => handleSort('categoryName')}
                                    >
                                        Nama
                                    </TableHead>
                                    <TableHead
                                        className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                                    // onClick={() => handleSort('releaseYear')}
                                    >
                                        Role
                                    </TableHead>
                                    <TableHead
                                        className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                                    // onClick={() => handleSort('motorcycleName')}
                                    >
                                        Email
                                    </TableHead>
                                    <TableHead
                                        className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                                    // onClick={() => handleSort('releaseYear')}
                                    >
                                        Nomor Telepon
                                    </TableHead>
                                    <TableHead className="w-24 px-4 py-4 text-right font-semibold text-gray-700">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : dataAllUser?.data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            Belum ada data kategori
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    dataAllUser?.data?.map((item, i) => (
                                        <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="px-4 py-4 text-gray-600 font-medium">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {item?.firstName} {item?.lastName}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge variant="outline">
                                                    {item?.role || '-'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge variant="secondary" className="font-normal">
                                                    {item?.email || '-'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge variant="outline">
                                                    {item?.phoneNumber || '-'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-32">
                                                        <DropdownMenuItem
                                                            // onClick={() => onView?.(item)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Lihat
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            // onClick={() => onEdit?.(item)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            // onClick={() => onDelete?.(String(item.id) || '')}
                                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Hapus
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <PaginationTable
                handleChangePage={(newPage) => setPage(newPage)}
                page={String(page)}
                totalPage={dataAllUser?.totalPage || 1} />

        </DashboardContentLayout>
    )
}