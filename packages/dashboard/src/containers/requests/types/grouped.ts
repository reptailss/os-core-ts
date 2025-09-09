export interface ServerRequestGroupedByStatus {
    statusCode: number,
    days: string[],
    counts: number[],
    total: number,
    totalFormatted: string,
    averageResponseTime:number
}

export interface ServerRequestGroupedByErrorCode {
    errorCode: string,
    days: string[],
    counts: number[],
    total: number,
    totalFormatted: string,
    averageResponseTime:number
}

export interface ServerRequestGroupedByEndpoint {
    endpoint: string;
    days: string[];
    counts: number[];
    total: number;
    totalFormatted: string;
    averageResponseTime: number;
    responseTimes:number[]
}

export interface GroupedByEndpointResult {
    groupedRequests: ServerRequestGroupedByEndpoint[];
    grandTotal: number;
    overallAverageResponseTime: number;
    allDays:string[]
}
