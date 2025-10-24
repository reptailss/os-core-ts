import sx from './sx'

import {Stack} from '@mui/material'
import React from 'react'
import Navigation from '@layouts/navigation/Navigation'

const SidebarView = ({onClickNavigate}: {
    onClickNavigate?: () => void
}) => {
    
    return (
        <Stack
            sx={sx.root}
            gap={1}
        >
            <Navigation  onClickNavigate={onClickNavigate}/>
        </Stack>
    )
}

export default SidebarView
