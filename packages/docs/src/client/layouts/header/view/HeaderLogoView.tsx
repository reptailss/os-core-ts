import React from 'react'

import sx from './sx'
import {Box, Typography} from '@mui/material'


const HeaderLogoView = () => {
    
    
    return (
        <Box
            sx={sx.logo}
        >
            <a
                href={'/'}
                title=""
                className="logo"
            >
                <Typography
                    sx={sx.logoTitle}
                    variant={'body2'}
                >
                    @OneSoft docs 1.0
                </Typography>
            </a>
        </Box>
    )
}

export default HeaderLogoView
