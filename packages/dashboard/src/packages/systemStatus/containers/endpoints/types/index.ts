export interface SystemEndpoint {
    endpoints: string[]
    service_key: string
}

export interface DataSystemEndpoints{
    rows: SystemEndpoint[]
}