"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
const aws_sdk_1 = require("aws-sdk");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const mime_1 = __importDefault(require("mime"));
const _logger_1 = require("../../logger");
let s3 = null;
const getS3 = () => {
    if (s3) {
        return s3;
    }
    s3 = new aws_sdk_1.S3({
        region: _appConfig_1.APP_CONFIG_OS_CORE.awsS3.region,
        credentials: {
            accessKeyId: _appConfig_1.APP_CONFIG_OS_CORE.awsS3.accessKey,
            secretAccessKey: _appConfig_1.APP_CONFIG_OS_CORE.awsS3.secretKey,
        },
    });
    return s3;
};
class FileService {
    static async save({ fileName, fileNameS3, fileNameLocal, dirPathLocal = 'files', fileNameDirPathLocal, mimetype, buffer, hasUploadToS3, }) {
        const targetHasUploadToS3 = typeof hasUploadToS3 !== 'undefined' ? hasUploadToS3 : _appConfig_1.APP_CONFIG_OS_CORE.awsS3.hasUploadToS3;
        if (targetHasUploadToS3) {
            return await this.saveFileToAwsS3({
                buffer,
                fileName: fileNameS3 || fileName || 'file',
                mimetype,
            });
        }
        return await this.saveFileToLocal({
            buffer,
            fileName: fileNameLocal || fileName || 'file',
            dirPath: dirPathLocal,
            fileNameDirPathLocal,
        });
    }
    static saveFileToAwsS3({ buffer, fileName, mimetype, }) {
        return new Promise(async (resolve, reject) => {
            const s3 = getS3();
            const params = {
                Bucket: _appConfig_1.APP_CONFIG_OS_CORE.awsS3.bucket,
                Key: fileName,
                Body: buffer,
                ContentType: mimetype,
            };
            s3.upload(params, (error, data) => {
                if (error) {
                    reject(new _appError_1.AppError('os-core:Error upload file s3.' + error.message + error.message, {
                        errorKey: 'DELETE_FILE_ERROR',
                    }));
                }
                resolve({
                    filePath: (data === null || data === void 0 ? void 0 : data.Location) || '',
                });
            });
        });
    }
    static async saveFileToLocal({ fileName, buffer, dirPath, fileNameDirPathLocal, }) {
        try {
            const rootDir = process.cwd();
            const directoryPath = path_1.default.join(rootDir, ...dirPath.split('/'));
            const filePath = path_1.default.join(directoryPath, fileName);
            await promises_1.default.mkdir(directoryPath, { recursive: true });
            await promises_1.default.writeFile(filePath, buffer);
            const relativeFilePath = `${fileNameDirPathLocal || dirPath}/${fileName}`;
            return { filePath: relativeFilePath };
        }
        catch (error) {
            _logger_1.appLogger.error('os-core: Error saving file local.', error);
            throw new _appError_1.AppError('Error saving file local.', {
                errorKey: 'SAVE_FILE_ERROR',
            });
        }
    }
    static async delete({ filePath, uploadedToS3 }) {
        if (uploadedToS3 || (filePath === null || filePath === void 0 ? void 0 : filePath.includes('http'))) {
            return this.deleteFileFromAwsS3(filePath);
        }
        return this.deleteFileFromLocal(filePath);
    }
    static deleteFileFromAwsS3(filePath) {
        return new Promise(async (resolve, reject) => {
            const params = {
                Bucket: _appConfig_1.APP_CONFIG_OS_CORE.awsS3.bucket,
                Key: (filePath === null || filePath === void 0 ? void 0 : filePath.split('.com/').pop()) || '',
            };
            const s3 = getS3();
            s3.deleteObject(params, (error, data) => {
                if (error) {
                    reject(new _appError_1.AppError('os-core:Error delete file s3. ' + error.message, {
                        errorKey: 'DELETE_FILE_ERROR',
                    }));
                }
                resolve({
                    result: (data === null || data === void 0 ? void 0 : data.DeleteMarker) || false,
                });
            });
        });
    }
    static async deleteFileFromLocal(filePath) {
        try {
            await promises_1.default.rm(filePath, {
                force: true,
            });
            return { result: true };
        }
        catch (error) {
            _logger_1.appLogger.error('os-core: Error delete file local.', error);
            throw new _appError_1.AppError('Error deleting file local.', {
                errorKey: 'DELETE_FILE_ERROR',
            });
        }
    }
    static async checkAwsS3() {
        try {
            const s3 = getS3();
            await s3.headBucket({ Bucket: _appConfig_1.APP_CONFIG_OS_CORE.awsS3.bucket }).promise();
            return true;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core: Error connection aws s3', error);
            throw new _appError_1.AppError('os-core: Error connection aws s3', {
                errorKey: 'CONNECT_TO_AWS_S3_ERROR',
            });
        }
    }
    static async getFileBufferByUrl(url) {
        const format = path_1.default.extname(url).slice(1);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new _appError_1.AppError('Error getting buffer from url:' + url, {
                    errorKey: 'GET_FILE_BUFFER_ERROR',
                });
            }
            const buffer = await response.arrayBuffer();
            const mimetype = mime_1.default.lookup(url);
            return {
                buffer: Buffer.from(buffer),
                mimetype,
                format,
            };
        }
        catch (error) {
            _logger_1.appLogger.error('Error getting buffer from url:' + url, error);
            throw new _appError_1.AppError('Error getting buffer from url:' + url, {
                errorKey: 'GET_FILE_BUFFER_ERROR',
            });
        }
    }
    static async deleteFilesOnError({ cb, filePaths, }) {
        try {
            return await cb();
        }
        catch (error) {
            if (filePaths.length >= 1) {
                for (const path of filePaths) {
                    try {
                        await this.delete({ filePath: path });
                    }
                    catch (error) {
                        _logger_1.appLogger.error(error);
                    }
                }
            }
            if (_appError_1.AppErrorHelper.checkIsAppError(error)) {
                throw new _appError_1.AppError(error.message, {
                    errorKey: error.errorKey,
                    errorCode: error.errorCode,
                    errors: error.errors,
                    statusCode: error.statusCode,
                });
            }
            else {
                throw new _appError_1.AppError('Error save file', {
                    errorKey: 'SAVE_FILE_ERROR',
                });
            }
        }
    }
}
exports.FileService = FileService;
//# sourceMappingURL=FileService.js.map