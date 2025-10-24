import React, {useState} from 'react'
import {useDocsSearch} from '@docsSearch/hooks/useDocsSearch'
import SearchView from '@docsSearch/view/SearchView'
import {useDebounce} from '@hooks/useDebounce/useDebounce'
import {ContentSearchResult, SearchResult} from '@docsSearch/types'
import {OnClickContentSearchResult, OnClickSearchResult} from '@docsSearch/types/events'
import {useNavigateFromSearch} from '@docsSearch/hooks/useNavigateFromSearch'
import {usePaginationSearchResults} from '@docsSearch/hooks/usePaginationSearchResults'


const DocsSearch = () => {
    
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    
    const {debouncedValue} = useDebounce({
        value: searchValue,
        callback: () => {
            if (page !== 1) {
                setPage(1)
            }
        },
    })
    
    const searchResults = useDocsSearch(debouncedValue)
    
    const {onNavigate} = useNavigateFromSearch()
    
    const {
        totalPage,
        paginatedSearchResults,
    } = usePaginationSearchResults({
        searchResults,
        page,
    })
    
    const onOpenModal = () => {
        setOpenModal(true)
    }
    
    const onCloseModal = () => {
        setOpenModal(false)
    }
    
    const onClickSearchResult: OnClickSearchResult = (result: SearchResult) => {
        onNavigate(result.path)
        onCloseModal()
    }
    const onClickContentSearchResult: OnClickContentSearchResult = (content: ContentSearchResult) => {
        onNavigate(content.path)
        onCloseModal()
    }
    
    return (
        <SearchView
            openModal={openModal}
            searchResults={paginatedSearchResults}
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
            searchValue={searchValue}
            onChangeSearchValue={setSearchValue}
            page={page}
            onChangePage={setPage}
            totalPage={totalPage}
            onClickSearchResult={onClickSearchResult}
            onClickContentSearchResult={onClickContentSearchResult}
        />
    )
}

export default DocsSearch
