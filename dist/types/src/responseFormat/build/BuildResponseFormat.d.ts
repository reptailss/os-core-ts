import { PaginationValues } from "../../pagination";
import { ErrorValue } from "../../appError";
import { ErrorResult, ImportResult, MutateRowResult, PaginationResult, RowResult, RowsResult } from "..";
export declare class BuildResponseFormat {
    static row<T>(row: T): RowResult<T>;
    static rows<T>(rows: T): RowsResult<T>;
    static pagination<Row extends object, CustomFields extends Record<string, any> = {}>(paginationValues: PaginationValues<Row>, { errors, customFields, }?: {
        errors?: ErrorValue[];
        customFields?: CustomFields;
    }): PaginationResult<Row, CustomFields>;
    static mutateRow(id: number | string | null): MutateRowResult;
    static errors({ errors, errorCode, statusCode, }: {
        errors: ErrorValue[];
        errorCode?: string | null;
        statusCode?: number;
    }): ErrorResult;
    static import<T extends {
        errors: ErrorValue[];
        index: number;
    }>({ count, importCount, error, problemData, errors, status, }: {
        count: number;
        importCount: number;
        status?: number;
        error?: boolean;
        errors?: ErrorValue[];
        problemData?: T[];
    }): ImportResult<T>;
}
