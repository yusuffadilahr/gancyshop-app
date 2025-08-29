import { IValueOnChange } from "@/app/(landingmenu)/product/_clients/types";
import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export const useHelperProductPage = () => {
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

    const handleResetFilter = () => {
        setPage(1)
        setValueOnChange({
            kategoriId: '',
            maxPrice: '',
            maxWeight: '',
            minPrice: '',
            minWeight: '',
            searchProduct: '',
            stock: ''
        })

        setDatePicker(undefined)
    }

    return {
        page, setPage, limit,
        datePicker, setDatePicker,
        valueOnChange, setValueOnChange,
        debounceMinWeight,
        debounceMinPrice,
        debounceMaxWeight,
        debounceMaxPrice,
        handleResetFilter,
        router, pathname, params,
    }
}
