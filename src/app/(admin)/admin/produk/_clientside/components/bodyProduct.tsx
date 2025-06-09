'use client';
import TableProduct from "@/app/(admin)/admin/produk/_clientside/components/tableProduct";
import { useHelperProduct } from "@/app/(admin)/admin/produk/_clientside/hooks/use-helper-product";
import { useMutateAddProduct } from "@/app/(admin)/admin/produk/_clientside/hooks/use-mutate";
import { useProductState } from "@/app/(admin)/admin/produk/_clientside/hooks/use-product-state";
import { useQueryGetProduct } from "@/app/(admin)/admin/produk/_clientside/hooks/use-query-get-product";
import InputSearch from "@/components/core/inputSearch";
import { PaginationTable } from "@/components/core/paginationTable";
import { useAppTools } from "@/hooks/use-app";
import dynamic from "next/dynamic";

const DynamicModalAddProduct = dynamic(() => import('./modalAddProduct'), { loading: () => <></> })

export default function BodyProduk() {
    const { pathname, router, searchParams } = useAppTools()

    const { limit, loadingSearch, setLoadingSearch,
        page, setPage, searchData, setSearchData } = useProductState({ searchParams })

    const { dataTable, refetch } = useQueryGetProduct({ searchData, limit, page })

    const { debounce, handleChangePage } = useHelperProduct({
        limit, page, pathname,
        refetch, router, searchData,
        setLoadingSearch, setPage, setSearchData
    })

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

                <InputSearch loadingSearch={loadingSearch} searchParams={searchParams}
                    onChange={(e) => {
                        setLoadingSearch(true)
                        debounce(e.target.value)
                    }} />
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
