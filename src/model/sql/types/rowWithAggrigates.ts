import {SqlAggregate} from '@model/core'


export type RowWithAggregatesModelSql<
    Row extends object,
    Aggregates extends Record<string, SqlAggregate<Row>> = {}
> = Row & {
    [K in keyof Aggregates]: string | number
};

