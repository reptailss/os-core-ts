import {getCookie} from "@helpers/cookie/cookie";

export const getInitialIsDarkTheme = (): boolean => {
    const theme = getCookie('theme')
    return theme === 'dark'
}
