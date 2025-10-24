import { Entity } from "../../../entity";
type Unpacked<T> = T extends (infer U)[] ? U : T extends ReadonlyArray<infer U> ? U : T;
type AnyArray<T> = T[] | ReadonlyArray<T>;
type ConditionQuerySelectorNoSql<T> = T | OperatorsQuerySelectorNoSql<T>;
type OperatorsQuerySelectorNoSql<T> = {
    $eq?: T;
    $gt?: T;
    $gte?: T;
    $in?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
    $contains?: T extends string[] ? string[] : T extends number[] ? number[] : never;
    $lt?: T;
    $lte?: T;
    $nin?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
    $not?: T;
    $like?: string;
    $notLike?: string;
    $between?: [T, T];
};
type Where<T> = {
    [P in keyof T]?: ConditionQuerySelectorNoSql<T[P]>;
} & {
    $or?: Array<{
        [P in keyof T]?: ConditionQuerySelectorNoSql<T[P]>;
    }>;
};
export type WhereNoSql<T> = Where<Entity<T>>;
export {};
