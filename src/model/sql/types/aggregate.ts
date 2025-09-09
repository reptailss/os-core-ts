export type SqlAggregate<Row extends object> = {
    columnKey: keyof Row
    fn: 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COUNT'
    literal?:string

}