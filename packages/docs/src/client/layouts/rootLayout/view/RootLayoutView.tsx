import React, {ReactNode} from 'react'
import Box from '@mui/material/Box'
import sx from './sx'
import HeaderView from '@layouts/header/view/HeaderView'
import SidebarMobileView from '@layouts/sidebar/view/SidebarMobileView'
import SidebarView from '@layouts/sidebar/view/SidebarView'


const RootLayoutView = ({
                            children,
                            openMobileSidebar,
                            onCloseMobileSidebar,
                            onClickBurger,
                            theme,
                            onToggleTheme
                        }: {
    children: ReactNode
    onClickBurger: () => void
    openMobileSidebar: boolean
    onCloseMobileSidebar: () => void
    theme: 'dark' | 'light'
    onToggleTheme: () => void
}) => {
    
    return (
        <>
            <Box
                sx={sx.container}
            >
                <Box
                    sx={sx.header}
                >
                    <HeaderView
                        onClickBurger={onClickBurger}
                        theme={theme}
                        onToggleTheme={onToggleTheme}
                    />
                </Box>
                
                <Box
                    sx={sx.sidebar}
                >
                    <SidebarView />
                </Box>
                
                <Box
                    sx={sx.content}
                >
                    
                    {children}
                </Box>
            </Box>
            
            <SidebarMobileView
                open={openMobileSidebar}
                onClose={onCloseMobileSidebar}
            />
        </>
    )
}

export default RootLayoutView
