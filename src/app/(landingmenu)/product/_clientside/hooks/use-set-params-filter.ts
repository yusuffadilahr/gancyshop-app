import { IValueOnChange } from '@/app/(landingmenu)/product/_clientside/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as React from 'react'

interface ISetParamsFilterHooks {
    params: URLSearchParams,
    page: number,
    limit: number,
    valueOnChange: IValueOnChange,
    datePicker: Date | undefined,
    pathname: string,
    router: AppRouterInstance,
    refetch: () => void
}

export const useSetParamsFilter = ({
    params, page, limit,
    valueOnChange, datePicker,
    pathname, router,
    refetch
}: ISetParamsFilterHooks) => {
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
            searchParams.set('date', datePicker.toLocaleDateString())
        } else {
            searchParams.delete('date')
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

    return {}
}
