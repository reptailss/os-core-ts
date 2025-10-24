import React from 'react'
import {Typography} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import sx from './sx'

const LogoView = () => {
    return (
        <Typography
            sx={sx.root}
            variant={'h5'}
        >
            {'<OneSoft Docs'} <InsertDriveFileIcon /> {'/>'}
        </Typography>
    )
}

export default LogoView
