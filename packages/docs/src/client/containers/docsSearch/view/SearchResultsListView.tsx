import React from 'react'
import Box from '@mui/material/Box'
import {List, Typography} from '@mui/material'
import {OnClickContentSearchResult, OnClickSearchResult} from '@docsSearch/types/events'
import {SearchResult} from '@docsSearch/types'
import sx from './sx'
import SearchResultItemView from '@docsSearch/view/SearchResultItemView'

const SearchResultsListView = ({
                                   title,
                                   searchResults,
                                   onClickSearchResult,
                                   onClickContentSearchResult,
                               }: {
    searchResults: SearchResult[]
    title?: string
    onClickSearchResult: OnClickSearchResult
    onClickContentSearchResult: OnClickContentSearchResult
}) => {
    
    if (!searchResults?.length) {
        return (
            <Typography>
                Нічого не знайдено...
            </Typography>
        )
    }
    return (
        <Box
            sx={sx.searchResultsListRoot}
        >
            {title && <Typography
                variant="caption"
                sx={sx.searchResultsListTitle}
            >
                {title}
            </Typography>}
            
            <List>
                {searchResults?.map((searchResult, index) => {
                    return (
                        <SearchResultItemView
                            searchResult={searchResult}
                            key={searchResult.id}
                            onClickSearchResult={onClickSearchResult}
                            onClickContentSearchResult={onClickContentSearchResult}
                        />
                    )
                })}
            </List>
        </Box>
    )
}

export default SearchResultsListView
