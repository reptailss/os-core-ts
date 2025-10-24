import sx from './sx'
import {AppBar, IconButton, Stack} from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import HeaderLogoView from '@layouts/header/view/HeaderLogoView'
import Search from '@docsSearch/DocsSearch'
import {Brightness4, Brightness7} from '@mui/icons-material'

const HeaderView = ({
                        onClickBurger,
                        onToggleTheme,
                        theme
                    }: {
    onClickBurger: () => void
    onToggleTheme: () => void
    theme: 'dark' | 'light'
}) => {
    
    return (
        <AppBar
            sx={sx.root}
        >
            <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction={'row'}
                sx={sx.inner}
            >
                <HeaderLogoView />
                
                <Stack
                    gap={1}
                    alignItems={'center'}
                    direction={'row'}
                >
                    <Search />
                    
                    <IconButton
                        onClick={onToggleTheme}
                    >
                        {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    
                    <IconButton
                        onClick={onClickBurger}
                        sx={sx.burger}
                    >
                        <MenuIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default HeaderView
