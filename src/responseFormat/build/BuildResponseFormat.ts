import {PaginationValues} from '@pagination'
import {ErrorValue} from '@appError'
import {ErrorResult, ImportResult, MutateRowResult, PaginationResult, RowResult, RowsResult} from '@responseFormat'


export class BuildResponseFormat {
    static row<T>(row: T): RowResult<T> {
        return {
            row,
            errors: [],
            error: false,
        }
    }

    static rows<T>(rows: T): RowsResult<T> {
        return {
            rows,
            errors: [],
            error: false,
        }
    }

    static pagination<
        Row extends object,
        CustomFields extends Record<string, any> = {}
    >(
        paginationValues: PaginationValues<Row>,
        {
            errors,
            customFields,
        }: {
            errors?: ErrorValue[],
            customFields?: CustomFields,
        } = {}): PaginationResult<Row, CustomFields> {
        return {
            page: paginationValues?.page,
            all_pages: paginationValues?.all_pages,
            all_rows: paginationValues?.all_rows,
            per_page: paginationValues?.per_page,
            rows: paginationValues?.rows,
            error: false,
            errors: errors || [],
            ...(customFields || {}),

        } as PaginationResult<Row, CustomFields>
    }


    static mutateRow(id: number | string | null): MutateRowResult {
        return {
            id: id,
            errors: [],
            error: false,
        }
    }

    static errors({

                      errors,
                      errorCode,
                      statusCode,
                  }: {
        errors: ErrorValue[],
        errorCode?: string | null,
        statusCode?: number
    }): ErrorResult {
        return {
            errors,
            error: true,
            status: statusCode || 500,
            ...(errorCode ? {error_code:errorCode} : {}),
        }
    }


    static import<T extends {errors: ErrorValue[], index: number}>({
                                                                       count,
                                                                       importCount,
                                                                       error,
                                                                       problemData,
                                                                       errors,
                                                                       status,
                                                                   }: {
        count: number
        importCount: number
        status?: number,
        error?: boolean,
        errors?: ErrorValue[],
        problemData?: T[],
    }): ImportResult<T> {
        return {
            error: typeof error !== 'undefined' ? error : false,
            errors: errors || [],
            problem_data: problemData || [],
            status: status || 200,
            count,
            import_count: importCount,
        }
    }

    static custom<T>(data: T): T {
        return data
    }
}