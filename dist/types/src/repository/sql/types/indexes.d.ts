export type SqlIndexes<ClassEntity extends object> = SqIndex<ClassEntity>[];
export type SqIndex<ClassEntity extends object> = {
    columns: ColumnSqlIndex<ClassEntity>;
    options?: {
        name?: string;
        unique?: boolean;
        using?: 'BTREE' | 'HASH';
    };
};
export type ColumnSqlIndex<ClassEntity> = Record<keyof ClassEntity | string, {
    order?: 'ASC' | 'DESC';
    length?: number;
}>;
