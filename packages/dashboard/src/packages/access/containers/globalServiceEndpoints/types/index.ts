export type GlobalServiceEndpointsResponse = {
    all_pages: number
    all_rows: number
    error: boolean
    page: number
    per_page: number
    rows: GlobalServiceEndpoints[]
}

export  type GetGlobalServiceEndpointsParams = {
    page: number
    perPage: number
    order: 'asc' | 'desc',
    orderBy: keyof GlobalServiceEndpoints,
    serviceKey?: string
    type?:GlobalServiceEndpointsType | ''
}

export  type DeleteGlobalServiceEndpointsParams = {
    serviceKey:string
}


export  type DeleteGlobalServiceEndpointParams = {
    serviceKey:string
    endpoint:string
}
export type GlobalServiceEndpoints = {
    service_key: string
    endpoints: GlobalServiceEndpoint[]
    type:GlobalServiceEndpointsType
    id: number
    date_add: string
    date_update: string
}

export type GlobalServiceEndpointsType = 'default' | 'plugin'

export type GlobalServiceEndpoint = {
    key: string
    name: string
}

