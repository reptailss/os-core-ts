import React from 'react'
import {IconButton, ListItem, ListItemText, Typography} from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import MenuIcon from '@mui/icons-material/Menu'
import {OnClickContentSearchResult, OnClickSearchResult} from '@docsSearch/types/events'
import {SearchResult} from '@docsSearch/types'
import sx from './sx'
import SearchResultContentSearchListView from '@docsSearch/view/SearchResultContentSearchListView'

const SearchResultItemView = ({
                                  searchResult,
                                  onClickSearchResult,
                                  onClickContentSearchResult,
                              }: {
    searchResult: SearchResult
    onClickSearchResult: OnClickSearchResult
    onClickContentSearchResult: OnClickContentSearchResult
}) => {
    
    const {
        title,
        subtitle,
    } = searchResult
    
    const handleClick = () => {
        onClickSearchResult(searchResult)
    }
    return (
        <>
            <ListItem
                sx={sx.searchResultItemRoot}
                onClick={handleClick}
            >
                <MenuIcon
                    sx={sx.searchResultItemMenu}
                />
                
                <ListItemText
                    primary={<Typography sx={sx.searchResultItemTitle}>
                        {title}
                    </Typography>}
                    secondary={<Typography sx={sx.searchResultItemSubTitle}>
                        {subtitle}
                    </Typography>}
                />
                <IconButton>
                    <KeyboardReturnIcon sx={sx.searchResultItemIcon} />
                </IconButton>
            </ListItem>
            
            <SearchResultContentSearchListView
                contents={searchResult.content}
                onClickContentSearchResult={onClickContentSearchResult}
            />
        
        </>
    
    )
}

export default SearchResultItemView
