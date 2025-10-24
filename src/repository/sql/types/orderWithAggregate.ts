import { SqlAggregate } from "@repository/core";


export type SqlOrderWithAggregate<Aggregates extends Record<string, SqlAggregate<any>> = {}> = { [V in keyof Aggregates]?: 'ASC' | 'DESC' }