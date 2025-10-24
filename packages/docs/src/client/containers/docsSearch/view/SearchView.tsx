import {SearchResult} from '@docsSearch/types'
import React from 'react'
import SearchButtonView from '@docsSearch/view/SearchButtonView'
import SearchModalView from '@docsSearch/view/SearchModalView'
import SearchContentView from '@docsSearch/view/SearchContentView'
import {OnClickContentSearchResult, OnClickSearchResult} from '@docsSearch/types/events'


const SearchView = ({
                        page,
                        totalPage,
                        onChangePage,
                        searchResults,
                        searchValue,
                        onClickSearchResult,
                        onClickContentSearchResult,
                        onChangeSearchValue,
                        openModal,
                        onOpenModal,
                        onCloseModal,
                    }: {
    onOpenModal: () => void
    onCloseModal: () => void
    openModal: boolean
    searchResults: SearchResult[]
    searchValue: string
    onChangeSearchValue: (value: string) => void
    totalPage: number
    page: number
    onChangePage: (page: number) => void
    onClickSearchResult: OnClickSearchResult
    onClickContentSearchResult: OnClickContentSearchResult
}) => {
    return (
        <>
            <SearchButtonView
                onClick={onOpenModal}
            />
            
            <SearchModalView
                open={openModal}
                onClose={onCloseModal}
            >
                <SearchContentView
                    searchResults={searchResults}
                    searchValue={searchValue}
                    onChangeSearchValue={onChangeSearchValue}
                    page={page}
                    onChangePage={onChangePage}
                    totalPage={totalPage}
                    onClickSearchResult={onClickSearchResult}
                    onClickContentSearchResult={onClickContentSearchResult}
                />
            </SearchModalView>
        </>
    )
}

export default SearchView