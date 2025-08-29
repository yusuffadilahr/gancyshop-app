import { useDebouncedCallback } from "use-debounce"
import * as React from 'react'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface IHelperProductHooks {
    setPage: React.Dispatch<React.SetStateAction<string>>
    setSearchData: React.Dispatch<React.SetStateAction<string>>
    setLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>
    searchData: string
    page: string
    limit: string
    router: AppRouterInstance
    pathname: string
    refetch: () => void
}

export const useHelperProduct = ({
    setPage,
    setSearchData,
    setLoadingSearch,
    searchData,
    page,
    limit,
    router,
    pathname,
    refetch
}: IHelperProductHooks) => {
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

    return {
        handleChangePage,
        debounce
    }
}