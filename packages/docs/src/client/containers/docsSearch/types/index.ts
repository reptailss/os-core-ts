export interface SearchResult {
    title: string
    path: string
    subtitle?: string | null
    id: string
    content: ContentSearchResult[]
}

export interface ContentSearchResult {
    before: string
    after: string
    match: string
    path: string
    subtitle?: string | null
}

