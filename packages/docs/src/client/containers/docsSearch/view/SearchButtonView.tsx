import React from 'react'
import {Box} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import sx from './sx'


const SearchButtonView = ({onClick}: {
    onClick: () => void
}) => {
    return (
        <Box
            sx={sx.searchBtn}
            onClick={onClick}
        >
            <SearchIcon sx={sx.searchBtnIcon} />
            
            Пошук
        </Box>
    )
}

export default SearchButtonView
