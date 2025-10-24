import React from 'react'
import {Pagination, Stack, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {SearchResult} from '@docsSearch/types'
import {OnClickContentSearchResult, OnClickSearchResult} from '@docsSearch/types/events'
import sx from './sx'
import SearchResultsListView from '@docsSearch/view/SearchResultsListView'


const SearchContentView = ({
                               page,
                               totalPage,
                               onChangePage,
                               searchResults,
                               searchValue,
                               onClickSearchResult,
                               onClickContentSearchResult,
                               onChangeSearchValue,
                           }: {
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
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={sx.searchContentInner}
                >
                    <SearchIcon sx={sx.searchContentSearchIcon} />
                    
                    <TextField
                        variant="standard"
                        placeholder="Що ви шукаєте?"
                        autoFocus
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            style: {color: 'white'},
                        }}
                        value={searchValue}
                        onChange={(e) => onChangeSearchValue(e.target.value)}
                    />
                </Stack>
            </Stack>
            
            {searchValue && <SearchResultsListView
                searchResults={searchResults}
                onClickSearchResult={onClickSearchResult}
                onClickContentSearchResult={onClickContentSearchResult}
            />}
            
            {totalPage > 1 && <Pagination
                count={totalPage}
                page={page}
                onChange={(e, value) => onChangePage(value)}
                sx={{display: 'flex', justifyContent: 'center', marginTop: '8px'}}
                color="primary"
            />}
        </>
    )
}

export default SearchContentView
