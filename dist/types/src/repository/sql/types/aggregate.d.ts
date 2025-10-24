export type SqlAggregate<ClassEntity extends object> = {
    columnKey: keyof ClassEntity;
    fn: 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COUNT';
    literal?: string;
};
