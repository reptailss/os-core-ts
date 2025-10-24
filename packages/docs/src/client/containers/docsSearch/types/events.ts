import {ContentSearchResult, SearchResult} from '@docsSearch/types/index'

export type  OnClickSearchResult = (result: SearchResult) => void
export type  OnClickContentSearchResult = (content: ContentSearchResult) => void