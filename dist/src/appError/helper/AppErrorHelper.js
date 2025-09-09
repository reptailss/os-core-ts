"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorHelper = void 0;
const _appError_1 = require("..");
const APP_ERROR_CODES = {
    CONNECT_TO_DB_ERROR: 'connect_to_db_error',
    HEADER_VALIDATION_ERROR: 'header_validation_error',
    VALIDATION_ERROR: 'validation_error',
    GET_MODEL_ERROR: 'get_model_error',
    CREATE_ROW_ERROR: 'create_row_error',
    CONNECT_TO_REDIS_ERROR: 'connect_to_redis_error',
    UPDATE_ROW_ERROR: 'update_row_error',
    DELETE_ROW_ERROR: 'delete_row_error',
    NOT_FOUND_ERROR: 'not_found_error',
    INVALID_BEARER_TOKEN_ERROR: 'invalid_bearer_token',
    STRUCTURE_ACCESS_ERROR: 'structure_access_error',
    ALREADY_EXISTS_ERROR: 'already_exists_error',
    SAVE_FILE_ERROR: 'save_file_error',
    DELETE_FILE_ERROR: 'delete_file_error',
    CONNECT_TO_AWS_S3_ERROR: 'connect_to_aws_s3_error',
    UNAUTHORIZED_ERROR: 'unauthorized_error',
    DOMAIN_ACCESS_DENIED_ERROR: 'domain_access_denied_error',
    SERVER_SIDE_ERROR: 'server_side_error',
    OS_CORE_SAVE_ERROR: 'os_core_save_error',
    GET_FILE_BUFFER_ERROR: 'get_file_buffer_error',
    EXTERNAL_REQUEST_FAILED_ERROR: 'external_request_failed_error',
};
const APP_ERROR_DESCRIPTIONS = {
    CONNECT_TO_DB_ERROR: 'Error when trying to connect to the database. Possible causes include database server being down or unreachable.',
    HEADER_VALIDATION_ERROR: 'Error when validating request headers. This could happen if required headers are missing or malformed.',
    VALIDATION_ERROR: 'Error during input data validation. This could occur when the provided data doesn\'t meet the required format or rules.',
    GET_MODEL_ERROR: 'Error occurred while retrieving the api. This may indicate issues with the data source or api definition.',
    CREATE_ROW_ERROR: 'Error while creating a new row in the database. This might happen if there is a database constraint violation or missing required data.',
    CONNECT_TO_REDIS_ERROR: 'Error when trying to connect to Redis. Possible reasons could be a network issue or Redis server being down.',
    UPDATE_ROW_ERROR: 'Error occurred while updating a row in the database. This could be due to constraint violations or data issues.',
    DELETE_ROW_ERROR: 'Error occurred while deleting a row in the database. This might be caused by foreign key constraints or permission issues.',
    NOT_FOUND_ERROR: 'Requested resource was not found. This could mean the resource does not exist or has been deleted.',
    INVALID_BEARER_TOKEN_ERROR: 'The provided bearer token is invalid. The token may have expired, been tampered with, or not match the required format.',
    STRUCTURE_ACCESS_ERROR: 'Error accessing the structure. This could happen due to insufficient permissions or invalid structure references.',
    ALREADY_EXISTS_ERROR: 'The resource already exists. This may happen when trying to create a resource with a unique constraint violation.',
    SAVE_FILE_ERROR: 'Error while saving the file. This might be due to insufficient file system permissions or an unsupported file type.',
    DELETE_FILE_ERROR: 'Error occurred while deleting the file. The file might not exist or there may be insufficient permissions to delete it.',
    CONNECT_TO_AWS_S3_ERROR: 'Error while connecting to AWS S3. This could happen if the S3 bucket is misconfigured or there are network issues.',
    UNAUTHORIZED_ERROR: 'Unauthorized access error. The request did not provide valid authentication or authorization credentials.',
    DOMAIN_ACCESS_DENIED_ERROR: 'Access denied! Your host is not in our list of databases || Something went wrong. Service cannot connect to redis db. Contact us to solve this problem.',
    SERVER_SIDE_ERROR: 'An error occurred on the server side. This is a generic error indicating that something went wrong on the server.',
    OS_CORE_SAVE_ERROR: 'Error when saving (Possible problems with redis)',
    GET_FILE_BUFFER_ERROR: 'Error getting buffer',
    EXTERNAL_REQUEST_FAILED_ERROR: 'Error The request to an external resource was unsuccessful. This may be due to a timeout, an invalid response, or network issues. Please check the external api and try again',
};
const APP_STATUS_CODES = {
    CONNECT_TO_DB_ERROR: 500,
    HEADER_VALIDATION_ERROR: 400,
    VALIDATION_ERROR: 422,
    GET_MODEL_ERROR: 500,
    CREATE_ROW_ERROR: 500,
    CONNECT_TO_REDIS_ERROR: 500,
    UPDATE_ROW_ERROR: 500,
    DELETE_ROW_ERROR: 500,
    NOT_FOUND_ERROR: 404,
    INVALID_BEARER_TOKEN_ERROR: 401,
    STRUCTURE_ACCESS_ERROR: 403,
    ALREADY_EXISTS_ERROR: 409,
    SAVE_FILE_ERROR: 500,
    DELETE_FILE_ERROR: 500,
    CONNECT_TO_AWS_S3_ERROR: 500,
    UNAUTHORIZED_ERROR: 401,
    DOMAIN_ACCESS_DENIED_ERROR: 403,
    SERVER_SIDE_ERROR: 500,
    OS_CORE_SAVE_ERROR: 500,
    GET_FILE_BUFFER_ERROR: 500,
    EXTERNAL_REQUEST_FAILED_ERROR: 500,
};
class AppErrorHelper {
    static checkIsAppErrorKey(key) {
        return key in APP_ERROR_CODES;
    }
    static checkIsErrorResult(error) {
        return typeof error === 'object' &&
            error !== null &&
            'error' in error &&
            typeof error.error === 'boolean' &&
            (!('error_code' in error) || 'error_code' in error && typeof error.error_code === 'string');
    }
    static checkIsAppError(error) {
        return typeof error === 'object' && error !== null && 'isOperational' in error && typeof error.isOperational === 'boolean';
    }
    static getErrorsFromAppError(error) {
        var _a;
        const res = [];
        if (error.errorCode) {
            res.push(error.errorCode);
        }
        if (error.errors && ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
            res.push(...error.errors);
        }
        return res;
    }
    static getAppErrorCodeAndStatus({ errorCode, statusCode, errorKey, }) {
        if (errorKey) {
            return {
                statusCode: errorKey in APP_ERROR_CODES ? APP_STATUS_CODES[errorKey] : APP_STATUS_CODES.SERVER_SIDE_ERROR,
                errorCode: errorKey in APP_ERROR_CODES ? APP_ERROR_CODES[errorKey] : APP_ERROR_CODES.SERVER_SIDE_ERROR,
            };
        }
        return {
            statusCode: statusCode || APP_STATUS_CODES.SERVER_SIDE_ERROR,
            errorCode: errorCode || APP_ERROR_CODES.SERVER_SIDE_ERROR,
        };
    }
    static getErrorMessageByErrorKey(errorKey) {
        return errorKey in APP_ERROR_DESCRIPTIONS ? APP_ERROR_DESCRIPTIONS[errorKey] : APP_ERROR_DESCRIPTIONS.SERVER_SIDE_ERROR;
    }
    static buildErrorResultFromError(error) {
        var _a;
        if (error instanceof _appError_1.AppError) {
            return {
                status: error.statusCode,
                error: true,
                errors: [error.message, ...(error.errors || [])],
                error_code: (_a = error.errorCode) !== null && _a !== void 0 ? _a : undefined,
            };
        }
        return {
            error: true,
            status: 500,
            errors: ['Server side error'],
        };
    }
    static getFieldsFromError(error) {
        if (!error || typeof error !== 'object') {
            return {
                isOperational: false,
                statusCode: null,
                errorCode: null,
                errorKey: null,
                message: null,
                errors: null,
            };
        }
        return {
            isOperational: 'isOperational' in error && typeof error.isOperational === 'boolean' && error.isOperational,
            statusCode: 'statusCode' in error && typeof error.statusCode === 'number' ? error.statusCode : null,
            errorCode: 'errorCode' in error && typeof error.errorCode === 'string' ? error.errorCode : null,
            errorKey: 'errorKey' in error && typeof error.errorKey === 'string' && this.checkIsAppErrorKey(error.errorKey) ? error.errorKey : null,
            message: 'message' in error && typeof error.message === 'string' ? error.message : null,
            errors: 'errors' in error && typeof error.errors === 'object' && Array.isArray(error.errors) ? error.errors : null,
        };
    }
}
exports.AppErrorHelper = AppErrorHelper;
//# sourceMappingURL=AppErrorHelper.js.map