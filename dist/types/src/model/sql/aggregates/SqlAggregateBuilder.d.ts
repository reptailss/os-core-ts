import { SqlAggregate } from "../../core";
export declare class SqlAggregateBuilder {
    static sum<Row extends object, Key extends keyof Row = keyof Row>({ columnKey, literal, }: {
        columnKey: Row[Key] extends number ? Key : never;
        literal?: string;
    }): SqlAggregate<Row>;
    static avg<Row extends object, Key extends keyof Row = keyof Row>({ columnKey, literal, }: {
        columnKey: Row[Key] extends number ? Key : never;
        literal?: string;
    }): SqlAggregate<Row>;
    static max<Row extends object, Key extends keyof Row = keyof Row>({ columnKey, literal, }: {
        columnKey: Row[Key] extends number ? Key : never;
        literal?: string;
    }): SqlAggregate<Row>;
    static min<Row extends object, Key extends keyof Row = keyof Row>({ columnKey, literal, }: {
        columnKey: Row[Key] extends number ? Key : never;
        literal?: string;
    }): SqlAggregate<Row>;
}
