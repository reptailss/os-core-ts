import React from 'react'
import Box from '@mui/material/Box'
import sx from './sx'
import LogoView from '@layouts/logo/view/LogoView'

const HomePage = () => {
    return (
        <Box
            sx={sx.root}
        >
            <LogoView />
        </Box>
    )
}

export default HomePage
