import { SqlAggregate } from "../../core";
export type OrderWithSqlAggregate<Aggregates extends Record<string, SqlAggregate<any>> = {}> = {
    [V in keyof Aggregates]?: 'ASC' | 'DESC';
};
