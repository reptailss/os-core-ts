import {useMemo} from 'react'
import {NavigateItem} from '@layouts/navigation/types'
import {useGetAppClientDocJson} from '@appClient/hooks'
import {NavigationBuilder} from '@layouts/navigation/navigationBuilder/NavigationBuilder'

export function useGetNavigation(): NavigateItem[] {
    
    const docsJson = useGetAppClientDocJson()
    return useMemo(() => {
        return NavigationBuilder.getNavigationFromDocsJson(docsJson)
    }, [docsJson])
}
