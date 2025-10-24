import {useMemo} from 'react'
import {useGetAppClientDocJson} from '@appClient/hooks'
import {DocPageJson} from '@docJson/types'

export function useGetDocsByPagePath(pagePath: string): DocPageJson | null {
    
    const docsJson = useGetAppClientDocJson()
    
    return useMemo(() => {
        if (!docsJson?.modules?.length) {
            return null
        }
        for(const module of docsJson.modules) {
            const page = module.pages.find(page => page.path === pagePath)
            if(page){
                return page
            }
        }
        return  null
    }, [pagePath, docsJson])
}