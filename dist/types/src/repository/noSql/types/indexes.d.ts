import { Entity } from "../../../entity";
export type NoSqlIndexes<ClassEntity extends object> = NoSqIndex<ClassEntity>[];
export type NoSqIndex<ClassEntity extends object> = {
    columns: ColumnNoSqlIndex<Entity<ClassEntity>>;
    options?: {
        name?: string;
        unique?: boolean;
        sparse?: boolean;
        background?: boolean;
        expireAfterSeconds?: number;
    };
};
type ColumnNoSqlIndex<T> = Record<keyof T | string, 1 | -1>;
export {};
