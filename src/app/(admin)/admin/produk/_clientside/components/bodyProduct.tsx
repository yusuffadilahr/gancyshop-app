'use client'

import TableProduct from "@/app/(admin)/admin/produk/_clientside/components/tableProduct";
import { useMutateAddProduct } from "@/app/(admin)/admin/produk/_clientside/hooks/use-mutate";
import { useProductState } from "@/app/(admin)/admin/produk/_clientside/hooks/use-product-state";
import { getAllProduct } from "@/app/(admin)/admin/produk/_serverside/action";
import { PaginationTable } from "@/components/core/paginationTable";
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner";
import { useAppTools } from "@/hooks/use-app";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import * as React from "react";
import { useDebouncedCallback } from 'use-debounce'

const DynamicModalAddProduct = dynamic(() => import('./modalAddProduct'), { loading: () => <></> })

export default function BodyProduk() {
    const { pathname, router, searchParams } = useAppTools()

    const { limit, loadingSearch, setLoadingSearch,
        page, setPage, searchData, setSearchData } = useProductState({ searchParams })

    const { data: dataTable, refetch } = useQuery({
        queryKey: ['get-data-product'],
        queryFn: async () => {
            const res = await getAllProduct({
                search: searchData,
                limit,
                page
            })

            return res?.data
        },
    })

    const handleChangePage = (currentPage: number) => {
        setPage(String(currentPage))
    }

    const debounce = useDebouncedCallback((value) => {
        setSearchData(value)
        setLoadingSearch(false)
    }, 800)

    React.useEffect(() => {
        const newParams = new URLSearchParams()
        if (searchData) {
            newParams.set('search', searchData)
        } else {
            newParams.delete('search')
        }

        if (page) {
            newParams.set('page', page)
        } else {
            newParams.delete('page')
        }

        if (limit) {
            newParams.set('limit', limit)
        } else {
            newParams.delete('limit')
        }

        router.replace(`${pathname}?${newParams.toString()}`)
        refetch()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData, page])

    const { filePreview, handleAddProduct, handleChangeFile,
        initialValues, isPending, setFilePreview,
        handleUpdateActiveProduct, isPendingUpdateIsActive } = useMutateAddProduct({ refetch })

    return (
        <div className="w-full px-5 pt-10">
            <div className="flex items-center gap-2 pb-5">
                <DynamicModalAddProduct filePreview={filePreview}
                    handleAddProduct={handleAddProduct} handleChangeFile={handleChangeFile}
                    initialValues={initialValues} isPending={isPending}
                    setFilePreview={setFilePreview} />

                <div className="flex items-center relative w-full">
                    <Input type="search" defaultValue={searchParams.get('search') || ''}
                        onChange={(e) => {
                            setLoadingSearch(true)
                            debounce(e.target.value)
                        }} placeholder="Cari disini.." className={`w-full ${loadingSearch ? 'pl-10' : ''}`} />
                    {loadingSearch && <Spinner className="absolute left-2" size={"small"} />}
                </div>
            </div>

            <TableProduct data={dataTable?.data} filePreview={filePreview}
                handleUpdateActiveProduct={handleUpdateActiveProduct}
                isPending={isPendingUpdateIsActive} setFilePreview={setFilePreview}
                handleChangeFile={handleChangeFile} refetch={refetch} />

            <div className="py-5 w-full">
                <PaginationTable totalPage={dataTable?.totalPage}
                    handleChangePage={handleChangePage}
                    page={page} />
            </div>
        </div>
    )
}
