import {DocsJson} from '@docJson/types'
import {useContext} from 'react'
import {AppClientDocJsonContext, AppClientThemeContext} from '@appClient/context'


export const useGetAppClientDocJson = (): DocsJson => {
    return useContext(AppClientDocJsonContext)
}


export const usAppClientThemeContext = () => {
    return useContext(AppClientThemeContext)
}
