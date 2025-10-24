"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildResponseFormat = void 0;
class BuildResponseFormat {
    static row(row) {
        return {
            row,
            errors: [],
            error: false,
        };
    }
    static rows(rows) {
        return {
            rows,
            errors: [],
            error: false,
        };
    }
    static pagination(paginationValues, { errors, customFields, } = {}) {
        if (!customFields) {
            return {
                page: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.page,
                all_pages: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.all_pages,
                all_rows: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.all_rows,
                per_page: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.per_page,
                rows: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.rows,
                error: false,
                errors: errors || [],
            };
        }
        return Object.assign({ page: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.page, all_pages: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.all_pages, all_rows: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.all_rows, per_page: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.per_page, rows: paginationValues === null || paginationValues === void 0 ? void 0 : paginationValues.rows, error: false, errors: errors || [] }, customFields);
    }
    static mutateRow(id) {
        return {
            id: id,
            errors: [],
            error: false,
        };
    }
    static errors({ errors, errorCode, statusCode, }) {
        return Object.assign({ errors, error: true, status: statusCode || 500 }, (errorCode ? { error_code: errorCode } : {}));
    }
    static import({ count, importCount, error, problemData, errors, status, }) {
        return {
            error: typeof error !== 'undefined' ? error : false,
            errors: errors || [],
            problem_data: problemData || [],
            status: status || 200,
            count,
            import_count: importCount,
        };
    }
}
exports.BuildResponseFormat = BuildResponseFormat;
//# sourceMappingURL=BuildResponseFormat.js.map