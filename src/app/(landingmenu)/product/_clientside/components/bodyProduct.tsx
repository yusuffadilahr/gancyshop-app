"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import SkeletonCardProduct from "@/components/core/skeletonCardProduct"
import { useHelperProductPage } from "@/app/(landingmenu)/product/_clientside/hooks/use-helper-product"
import { useQueryGetData } from "@/app/(landingmenu)/product/_clientside/hooks/use-query-get-data"
import { useSetParamsFilter } from "@/app/(landingmenu)/product/_clientside/hooks/use-set-params-filter"
import SectionFilter from "@/app/(landingmenu)/product/_clientside/components/sectionFilter"
import CardProduct from "@/components/core/cardProduct"
import * as React from "react"

export default function BodyProduct() {
    const { page, setPage, limit,
        datePicker, setDatePicker,
        valueOnChange, setValueOnChange,
        debounceMinWeight,
        debounceMinPrice,
        debounceMaxWeight,
        debounceMaxPrice,
        handleResetFilter,
        router, pathname, params } = useHelperProductPage()

    const { dataGetProduct, refetch, isLoadingGetProduct,
        dataCategory, isLoadingGetCategory } = useQueryGetData({
            limit, page, valueOnChange, datePicker
        })

    useSetParamsFilter({ datePicker, limit, page, params, pathname, refetch, router, valueOnChange })

    return (
        <div className="p-6 space-y-6">

            <div className="w-full h-fit flex justify-center gap-2">
                <SectionFilter dataCategory={dataCategory} isLoadingGetCategory={isLoadingGetCategory}
                    debounceMaxWeight={debounceMaxWeight} debounceMinWeight={debounceMinWeight}
                    debounceMaxPrice={debounceMaxPrice} debounceMinPrice={debounceMinPrice}
                    datePicker={datePicker} setDatePicker={setDatePicker} 
                    handleResetFilter={handleResetFilter} setValueOnChange={setValueOnChange} valueOnChange={valueOnChange} />

                {(isLoadingGetProduct) ?
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCardProduct key={i} />)}
                    </div>
                    : !isLoadingGetProduct && dataGetProduct &&
                        dataGetProduct?.data?.length > 0 ?
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {dataGetProduct?.data?.map((product, idx) => (
                                <CardProduct categoryName={product?.category?.categoryName}
                                    imageAlt="Product" imageUrl={product?.imageUrl || ''}
                                    productCreatedAt={product?.createdAt || ''}
                                    productIsActive={product?.isActive} productName={product?.name}
                                    productPrice={product?.price} productStock={product?.stock}
                                    productWeight={product?.weightGram} key={idx} />
                            ))}
                        </div>
                        : !isLoadingGetProduct && dataGetProduct && dataGetProduct?.data?.length === 0 && (
                            <div className="w-full flex items-center justify-center">
                                <div>
                                    <Image loading="lazy" width={500} height={500}
                                        alt="no-data-show" src={'/no-data.png'} />
                                </div>
                            </div>
                        )}
            </div>

            <div className="flex justify-end items-center gap-2 pt-4">
                <Button variant="ghost" size="sm" disabled={page === 1}
                    onClick={(() => setPage(page - 1))}>Prev</Button>
                {Array.from({ length: Number(dataGetProduct?.totalPage || 1) }).map((_, i) => (
                    <Button key={i} variant={((i + 1) === page) ? 'default' : 'ghost'} size="sm">
                        {i + 1}
                    </Button>
                ))}
                <Button variant="ghost" size="sm" disabled={page === dataGetProduct?.totalPage}
                    onClick={(() => setPage(page + 1))}>Next</Button>
            </div>
        </div >
    )
}