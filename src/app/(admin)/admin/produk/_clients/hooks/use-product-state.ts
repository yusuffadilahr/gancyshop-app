import * as React from 'react'

export const useProductState = ({ searchParams }: { searchParams: URLSearchParams }) => {
    const [searchData, setSearchData] = React.useState<string>(searchParams.get('search') || '')
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false)

    const [page, setPage] = React.useState<string>('1')
    const limit = '5'

    return {
        searchData, setSearchData,
        loadingSearch, setLoadingSearch,
        page, setPage, limit
    }
}