type Unpacked<T> = T extends (infer U)[] ?
    U :
    T extends ReadonlyArray<infer U> ? U : T;

type AnyArray<T> = T[] | ReadonlyArray<T>;

type ConditionQuerySelectorModelSql<T> = T | OperatorsQuerySelectorModelSql<T>;

type OperatorsQuerySelectorModelSql<T> = {
    $eq?: T;
    $gt?: T;
    $gte?: T;
    $in?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
    $contains?: T extends string[] ? string[] : T extends number[] ? number[] : never;
    $lt?: T;
    $lte?: T;
    $nin?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
    $not?: T;
    $like?: string,
    $notLike?: string,
    $between?: [T, T],
};


export type SqlFilters<T> =
    {
        [P in keyof T]?: ConditionQuerySelectorModelSql<T[P]>;
    } & {
    $or?: Array<SqlFilters<T>>
}


