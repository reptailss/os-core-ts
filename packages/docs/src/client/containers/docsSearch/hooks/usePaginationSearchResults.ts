import {SearchResult} from '@docsSearch/types'
import {useMemo} from 'react'


const PER_PAGE = 20

export function usePaginationSearchResults({
                                               page,
                                               searchResults,
                                           }: {
    page: number
    searchResults: SearchResult[]
}): {
    totalPage: number
    paginatedSearchResults: SearchResult[]
} {
    return useMemo(() => {
        if (!searchResults?.length) {
            return {
                paginatedSearchResults: [],
                totalPage: 0,
            }
        }
        const paginatedSearchResults = searchResults.slice((page - 1) * PER_PAGE, page * PER_PAGE)
        const totalPage = Math.ceil(searchResults.length / PER_PAGE)
        return {
            paginatedSearchResults,
            totalPage,
        }
    }, [page, searchResults])
}
