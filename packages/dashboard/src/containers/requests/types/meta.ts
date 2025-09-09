export interface ServerMeta {
    date: Date
    route_path: string | null
    url: string
    service_key: string
    response_status_code: number
    response_time: number
    response_body: any
    method: string
    request_headers: ServerMetaRequestHeaders,
    request_query: ServerMetaRequestQuery
    request_body: object | string,
    request_params: Record<string, string>,
    error:  0 | 1
    error_code: string | null
    open_user_id: number | null
    is_system: 0 | 1 | null
}

type ServerMetaRequestQuery = Record<string, string | string[] | {[key: string]: string}>

export interface ServerMetaRequestHeaders {
    client_ip: string
    'user-agent': string
    'content-type': string
    origin: string
    authorization?: string
    ['x-api-key']?: string
}