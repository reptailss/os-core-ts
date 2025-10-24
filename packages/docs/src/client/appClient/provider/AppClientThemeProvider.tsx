import React, {ReactNode, useMemo, useState} from 'react'
import {createTheme, ThemeProvider} from '@mui/material'
import {AppClientThemeContext} from '@appClient/context'
import {CookieHelper} from '@helpers/CookieHelper'

const getInitialTheme = (): 'dark' | 'light' => {
    const cookieTheme = CookieHelper.get('theme')
    if (
        cookieTheme === 'dark' ||
        cookieTheme === 'light'
    ) {
        return cookieTheme
    }
    return 'dark'
}

const AppClientThemeProvider = ({
                                    children
                                }: {
    children: ReactNode
}) => {
    
    const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme())
    
    const muiTheme = useMemo(() => {
        return createTheme({
            palette: {
                mode: theme
            }
        })
        
    }, [theme])
    return (
        <AppClientThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            <ThemeProvider
                theme={muiTheme}
            >
                {children}
            </ThemeProvider>
        
        </AppClientThemeContext.Provider>
    )
}

export default AppClientThemeProvider