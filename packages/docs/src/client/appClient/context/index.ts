import {createContext} from 'react'
import {DocsJson} from '@docJson/types'
import {SetStateFn} from '@state'

export const AppClientDocJsonContext = createContext<DocsJson>({
    title: 'App',
    modules: []
})

export const AppClientThemeContext = createContext<{
    theme: 'dark' | 'light',
    setTheme: SetStateFn<'dark' | 'light'>
}>({
    theme: 'dark',
    setTheme: () => {
    }
})