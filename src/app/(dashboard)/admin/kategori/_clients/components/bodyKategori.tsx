'use client';
import { IGETDataCategory } from '@/app/(dashboard)/admin/kategori/_clients/types';
import { getCategoryProduct } from '@/app/(dashboard)/admin/kategori/_servers/services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { default as nextDynamic } from 'next/dynamic';
import { MoreHorizontal, Edit, Trash2, Eye, Filter } from 'lucide-react';
import TitleDashboardSection from '@/components/core/titleDashboard';
import InputSearch from '@/components/core/inputSearch';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaginationTable } from '@/components/core/paginationTable';
import { useDebouncedCallback } from 'use-debounce';
import DashboardContentLayout from '@/app/_clients/components/dashboardContentLayout';

const DynamicModalAddKategori = nextDynamic(() => import('./modalAddKategori'), { loading: () => <></> });

export default function BodyKategori() {
    const [page, setPage] = useState<number>(1)
    const [searchData, setSearchData] = useState<{ display: string; debounce: string; loading: boolean }>({
        display: '', debounce: '', loading: false
    })

    const params = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const limit = 5
    const { data: dataCategory, refetch: refetchGetDataCategory, isLoading } = useQuery<IGETDataCategory>({
        queryKey: ['get-kategori'],
        queryFn: async () => {
            const res = await getCategoryProduct({ page, limit, search: searchData?.debounce });
            if (res?.error) return { data: [], totalPage: 1 };
            return res?.data;
        }
    });

    const debounce = useDebouncedCallback(val => {
        setSearchData(prev => ({ ...prev, debounce: val, loading: false }))
    }, 800)

    useEffect(() => {
        const currentParams = new URLSearchParams(params.toString())
        if (page) {
            currentParams.set('page', page.toString())
        } else {
            currentParams.delete('page')
        }

        if (limit) {
            currentParams.set('limit', limit.toString())
        } else {
            currentParams.delete('limit')
        }

        if (searchData.debounce) {
            currentParams.set('search', searchData.debounce.toString())
        } else {
            currentParams.delete('search')
        }

        const currentPath = `${pathname}?${currentParams.toString()}`
        router.replace(currentPath)
        refetchGetDataCategory()

    }, [page, limit, searchData.debounce])

    return (
        <DashboardContentLayout>
            <TitleDashboardSection description="Kelola kategori produk motor Anda"
                titleMenuDashboard="Kategori Produk"
                action={<DynamicModalAddKategori refetch={refetchGetDataCategory} />} />

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter & Pencarian
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputSearch loadingSearch={searchData?.loading} searchParams={params}
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
                                        Nama Kategori
                                    </TableHead>
                                    <TableHead
                                        className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                                    // onClick={() => handleSort('motorcycleName')}
                                    >
                                        Jenis Motor
                                    </TableHead>
                                    <TableHead
                                        className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                                    // onClick={() => handleSort('releaseYear')}
                                    >
                                        Tahun Rilis
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
                                ) : dataCategory?.data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            Belum ada data kategori
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    dataCategory?.data?.map((item, i) => (
                                        <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="px-4 py-4 text-gray-600 font-medium">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {item?.categoryName}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge variant="secondary" className="font-normal">
                                                    {item?.categorymotorcyle?.motorCycleName}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge variant="outline">
                                                    {item?.categorymotorcyle?.releaseYear}
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

            <PaginationTable totalPage={dataCategory?.totalPage || 1}
                handleChangePage={(val) => setPage(val)}
                page={String(page)} />
        </DashboardContentLayout>
    );
}