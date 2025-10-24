import {useMemo} from 'react'
import {SearchResult} from '@docsSearch/types'
import {useGetAppClientDocJson} from '@appClient/hooks'
import {SearchFromDocs} from '@docsSearch/SearchFromDocs'


export function useDocsSearch(searchValue: string): SearchResult[] {
    
    const docsJson = useGetAppClientDocJson()
    return useMemo(() => {
        return SearchFromDocs.search(searchValue, docsJson)
    }, [searchValue, docsJson])
}
