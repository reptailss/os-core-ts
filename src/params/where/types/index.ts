export type PermittedWhereOperator = '>' | '<' | '>=' | '<=' | '=' | 'IN' | 'NOT IN' | 'LIKE' | 'NOT LIKE' | 'NOT';

type PermittedBaseWhereOperatorWithType<Type> =
    Type extends string
        ? '=' | 'LIKE' | 'NOT LIKE' | 'NOT'
        : Type extends number
            ? '>' | '<' | '>=' | '<=' | '=' | 'NOT'
            : Type extends Date
                ? '>' | '<' | '>=' | '<=' | '='
                : never;

type PermittedArrayWhereOperatorWithType<Type> =
    Type extends string
        ? 'IN' | 'NOT IN'
        : Type extends number
            ? 'IN' | 'NOT IN'
            : never;

export type WhereKeys<Row> = BaseWhereKeys<Row> & ArrayWhereKeys<Row>

export type BaseWhereKeys<Row> = {
    [Key in keyof Row as Row[Key] extends object | undefined | null
        ? never
        : `${Key & string} ${PermittedBaseWhereOperatorWithType<Row[Key]>}`]: Row[Key]
};

export type ArrayWhereKeys<Row> = {
    [Key in keyof Row as Row[Key] extends object | undefined | null
        ? never
        : `${Key & string} ${PermittedArrayWhereOperatorWithType<Row[Key]>}`]: ValueArrayWhere<PermittedArrayWhereOperatorWithType<Row[Key]>, Row[Key]>
};

type ValueArrayWhere<Operator, Value> = Operator extends 'IN' | 'NOT IN' ? Array<Value> : never


export type WhereParams<
    Row extends object,
    AllowedKeysWhere extends keyof Row = keyof Row
> = {
        [Key in keyof Row as Key extends AllowedKeysWhere ? Key : Row[Key] extends object | undefined | null
            ? never
            : Key]?: Row[Key];
    }
    & Partial<WhereKeys<Row>>
