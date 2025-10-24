import React, {ReactNode, useCallback, useEffect, useState} from 'react'
import RootLayoutView from '@layouts/rootLayout/view/RootLayoutView'
import {usAppClientThemeContext} from '@appClient/hooks'
import {CookieHelper} from '@helpers/CookieHelper'

const RootLayout = ({children}: {
    children: ReactNode
}) => {
    const [openMobileSidebar, setOpenMobileSidebar] = useState<boolean>(false)
    const {theme, setTheme} = usAppClientThemeContext()
    
    const toggleOpenMobileSidebar = useCallback(() => {
        setOpenMobileSidebar((prev) => !prev)
    }, [])
    
    const onToggleTheme = useCallback(() => {
        setTheme((prev) => {
            const newTheme = prev === 'dark' ? 'light' : 'dark'
            document.querySelector('body')?.classList.add(newTheme === 'dark' ? 'darkTheme' : 'lightTheme')
            document.querySelector('body')?.classList.remove(newTheme === 'dark' ? 'lightTheme' : 'darkTheme')
            CookieHelper.set('theme', newTheme)
            return newTheme
        })
    }, [])
    
    useEffect(() => {
        const theme = CookieHelper.get('theme')
        if(theme !== 'dark' && theme !== 'light'){
            return
        }
        document.querySelector('body')?.classList.add(theme === 'dark' ? 'darkTheme' : 'lightTheme')
        document.querySelector('body')?.classList.remove(theme === 'dark' ? 'lightTheme' : 'darkTheme')
        
    }, [])
    return (
        <RootLayoutView
            openMobileSidebar={openMobileSidebar}
            onClickBurger={toggleOpenMobileSidebar}
            onCloseMobileSidebar={toggleOpenMobileSidebar}
            theme={theme}
            onToggleTheme={onToggleTheme}
        >
            {children}
        </RootLayoutView>
    )
}

export default RootLayout