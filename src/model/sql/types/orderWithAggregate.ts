import {SqlAggregate} from '@model/core'


export type OrderWithSqlAggregate<Aggregates extends Record<string, SqlAggregate<any>> = {}> = { [V in keyof Aggregates]?: 'ASC' | 'DESC' }