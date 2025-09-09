import {EndpointNode} from "./endpoint";
import {ServerMeta} from "@containers/requests/types/meta";
import {TransformServerMeta} from "@containers/requests/types/transform";

export interface ServerRequestsData {
    rows: ServerMeta[]
    error: boolean
    status: number,
}

export interface ServerRequest {
    level: string
    message: string
    meta: MetaServerRequest
    date: string,
    endpoint: string,
    id: string,
    responseTime: number,
    dateFormat: string
    statusCode: number
}

export interface MetaServerRequest {
    req: ReqServer
    res: ResServer
    responseTime: number
}

export interface ReqServer {
    method: string
    query: QueryServer
    url: string
}

export type QueryServer = Record<string, unknown>

export interface ResServer {
    statusCode: number,
    error_code?: string,
    errors?: string[]
}

export interface ServerRequests {
    requests: TransformServerMeta[],
    paths: string[],
    endpointsTree: EndpointNode[],
}
