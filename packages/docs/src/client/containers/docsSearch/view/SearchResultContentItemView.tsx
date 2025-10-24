import React from 'react'
import {IconButton, ListItem, ListItemText, SvgIcon, Typography} from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import TagSharpIcon from '@mui/icons-material/TagSharp'
import {OnClickContentSearchResult} from '@docsSearch/types/events'
import {ContentSearchResult} from '@docsSearch/types'
import sx from './sx'

const IconTree = () => (
    <SvgIcon
        sx={sx.searchResultContentItemSvg}
        className={'searchIconSvg'}
    >
        <svg viewBox="0 0 24 54">
            <path
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 6v42m12-21H8.3"
            ></path>
        </svg>
    </SvgIcon>
)

const IconTreeLast = () => (
    <SvgIcon
        sx={sx.searchResultContentItemSvg}
        className={'searchIconSvg'}
    >
        <svg viewBox="0 0 24 54">
            <path
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 6v21m12 0H8.3"
            ></path>
        </svg>
    </SvgIcon>
)

const SearchResultContentItemView = ({
                                         content,
                                         onClickContentSearchResult,
                                         isLastItem,
                                     }: {
    content: ContentSearchResult
    onClickContentSearchResult: OnClickContentSearchResult
    isLastItem: boolean
}) => {
    
    const handleClick = () => {
        onClickContentSearchResult(content)
    }
    
    return (
        <ListItem
            sx={sx.searchResultContentItemRoot}
            onClick={handleClick}
        >
            {isLastItem ? <IconTreeLast /> : <IconTree />}
            
            <TagSharpIcon
                sx={sx.searchResultContentItemIcon}
                className={'searchIconSvgHash'}
            />
            
            <ListItemText
                primary={<Typography
                    sx={sx.searchResultContentItemTitle}
                    className={'searchTitle'}
                >
                    {content.before && content.before}<span
                    className={'navMatch'}>{content.match}</span>{content.after && content.after}
                </Typography>}
                secondary={<Typography sx={sx.searchResultContentItemSubTitle}>
                    {content.subtitle}
                </Typography>}
            />
            <IconButton>
                
                <KeyboardReturnIcon sx={sx.searchResultContentItemIcon} />
            </IconButton>
        </ListItem>
    )
}

export default SearchResultContentItemView
