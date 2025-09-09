import {SqlAggregate} from '@model/core'

export class SqlAggregateBuilder {
    public static sum<Row extends object, Key extends keyof Row = keyof Row>({
                                                                                 columnKey,
                                                                                 literal,
                                                                             }: {
        columnKey: Row[Key] extends number ? Key : never
        literal?: string
    }): SqlAggregate<Row> {
        return {
            columnKey,
            fn: 'SUM',
            literal,
        }
    }

    public static avg<Row extends object, Key extends keyof Row = keyof Row>({
                                                                                 columnKey,
                                                                                 literal,
                                                                             }: {
        columnKey: Row[Key] extends number ? Key : never
        literal?: string
    }): SqlAggregate<Row> {
        return {
            columnKey,
            fn: 'AVG',
            literal,
        }
    }

    public static max<Row extends object, Key extends keyof Row = keyof Row>({
                                                                                 columnKey,
                                                                                 literal,
                                                                             }: {
        columnKey: Row[Key] extends number ? Key : never
        literal?: string
    }): SqlAggregate<Row> {
        return {
            columnKey,
            fn: 'MAX',
            literal,
        }
    }

    public static min<Row extends object, Key extends keyof Row = keyof Row>({
                                                                                 columnKey,
                                                                                 literal,
                                                                             }: {
        columnKey: Row[Key] extends number ? Key : never
        literal?: string
    }): SqlAggregate<Row> {
        return {
            columnKey,
            fn: 'MIN',
            literal,
        }
    }
}