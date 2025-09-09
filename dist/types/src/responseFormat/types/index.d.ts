import { ErrorValue } from "../../appError";
import { PaginationValues } from "../../pagination";
export interface MutateRowResult<T extends string | number | null = any> {
    id: T;
    error: false;
    errors: [];
}
export interface RowResult<T> {
    row: T;
    error: false;
    errors: [];
}
export interface RowsResult<T> {
    rows: T;
    error: false;
    errors: [];
}
export interface ImportResult<T extends {
    errors: ErrorValue[];
    index: number;
} = {
    errors: ErrorValue[];
    index: number;
}> {
    count: number;
    import_count: number;
    status: number;
    error: boolean;
    errors: ErrorValue[];
    problem_data?: T[];
}
export interface ErrorResult {
    status: number;
    error: true;
    errors: ErrorValue[];
    error_code?: string;
}
export type PaginationResult<Row extends object, CustomFields extends Record<string, any> = {}> = CustomFields & PaginationValues<Row> & {
    error: false;
    errors: ErrorValue[];
};
