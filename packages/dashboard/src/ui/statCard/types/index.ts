export interface StatCardInfo {
    title: string
    value: string
    interval: string;
    trend: 'up' | 'down' | 'neutral'
    data: number[],
    days:string[],
    trendValue:string | number
}
