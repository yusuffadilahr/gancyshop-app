'use client'

import TableProduct from "@/app/(admin)/admin/produk/_clients/components/tableProduct";
import { useHelperProduct } from "@/app/(admin)/admin/produk/_clients/hooks/use-helper-product";
import { useMutateAddProduct } from "@/app/(admin)/admin/produk/_clients/hooks/use-mutate";
import { useProductState } from "@/app/(admin)/admin/produk/_clients/hooks/use-product-state";
import { useQueryGetProduct } from "@/app/(admin)/admin/produk/_clients/hooks/use-query-get-product";
import InputSearch from "@/components/core/inputSearch";
import { PaginationTable } from "@/components/core/paginationTable";
import TitleDashboardLayout from "@/components/core/titleDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DynamicModalAddProduct = dynamic(() => import('./modalAddProduct'), { loading: () => <></> })

export default function BodyProduk() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const { limit, loadingSearch, setLoadingSearch,
        page, setPage, searchData, setSearchData } = useProductState({ searchParams })

    const { dataTable, refetch, isLoadingGetData } = useQueryGetProduct({ searchData, limit, page })

    const { debounce, handleChangePage } = useHelperProduct({
        limit, page, pathname,
        refetch, router, searchData,
        setLoadingSearch, setPage, setSearchData
    })

    const { filePreview, handleAddProduct, handleChangeFile,
        initialValues, isPending, setFilePreview,
        handleUpdateActiveProduct, isPendingUpdateIsActive } = useMutateAddProduct({ refetch })

    return (
        <div className='px-6 py-8 space-y-6 bg-gray-50 min-h-screen'>
            <TitleDashboardLayout description="Kelola daftar produk motor Anda"
                titleMenuDashboard="Daftar Produk"
                action={
                    <DynamicModalAddProduct filePreview={filePreview}
                        handleAddProduct={handleAddProduct} handleChangeFile={handleChangeFile}
                        initialValues={initialValues} isPending={isPending}
                        setFilePreview={setFilePreview} />
                } />

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter & Pencarian
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <InputSearch loadingSearch={loadingSearch} searchParams={searchParams}
                        onChange={(e) => {
                            setLoadingSearch(true)
                            debounce(e.target.value)
                        }} />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <TableProduct data={dataTable?.data} filePreview={filePreview}
                            handleUpdateActiveProduct={handleUpdateActiveProduct}
                            isPending={isPendingUpdateIsActive} setFilePreview={setFilePreview}
                            handleChangeFile={handleChangeFile} refetch={refetch} 
                            isLoading={isLoadingGetData}/>
                    </div>
                </CardContent>
            </Card>

            <div className="py-5 w-full">
                <PaginationTable totalPage={dataTable?.totalPage}
                    handleChangePage={handleChangePage}
                    page={page} />
            </div>
        </div>
    )
}
