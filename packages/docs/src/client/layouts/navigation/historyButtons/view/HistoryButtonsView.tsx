import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {IconButton, Paper} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import sx from './sx'
import Box from '@mui/material/Box'

function HistoryButtonsView({
                                goBack,
                                goForward,
                            }: {
    goBack: () => void
    goForward: () => void
}) {
    
    return (
        <Box
            sx={sx.root}
        >
            <IconButton
                onClick={goBack}
                size={'small'}
            >
                <ArrowBackIosNewIcon fontSize={'small'} />
            </IconButton>
            
            <IconButton
                onClick={goForward}
                size={'small'}
            >
                <ArrowForwardIosIcon fontSize={'small'}   />
            </IconButton>
        </Box>
    )
}

export default HistoryButtonsView
