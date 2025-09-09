type Unpacked<T> = T extends (infer U)[] ? U : T extends ReadonlyArray<infer U> ? U : T;
type AnyArray<T> = T[] | ReadonlyArray<T>;
type Condition<T> = T | QuerySelector<T>;
type QuerySelector<T> = {
    $eq?: T;
    $gt?: T;
    $gte?: T;
    $in?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
    $lt?: T;
    $lte?: T;
    $ne?: T;
    $nin?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
    $not?: T extends string ? QuerySelector<T> | RegExp : QuerySelector<T>;
    $elemMatch?: T extends AnyArray<any> ? Partial<T[0]> : never;
};
export type NoSqlFilters<T> = {
    [P in keyof T]?: Condition<T[P]>;
} & {
    $or?: Array<NoSqlFilters<T>>;
} & Record<string, unknown>;
export {};
