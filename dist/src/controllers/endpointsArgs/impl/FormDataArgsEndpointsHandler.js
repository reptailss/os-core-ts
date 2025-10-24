"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataArgsEndpointsHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
class FormDataArgsEndpointsHandler {
    getFormDataEndpointArgs(args) {
        const fileArgs = [];
        let hasArgs = false;
        args.forEach((arg, index) => {
            if (arg.key === 'AppFile') {
                if (!hasArgs) {
                    hasArgs = true;
                }
                fileArgs.push(arg);
            }
            if (arg.key === 'AppFiles') {
                if (!hasArgs) {
                    hasArgs = true;
                }
                fileArgs.push(arg);
            }
            if (arg.key === 'FormData') {
                if (!hasArgs) {
                    hasArgs = true;
                }
            }
            if (arg.key === 'AppFormDataParamNum') {
                if (!hasArgs) {
                    hasArgs = true;
                }
            }
            if (arg.key === 'AppFormDataParam') {
                if (!hasArgs) {
                    hasArgs = true;
                }
            }
        });
        if (!hasArgs) {
            return null;
        }
        return fileArgs;
    }
    async handleFormDataArgs(fileArgs, req, res) {
        return new Promise((resolve, reject) => {
            try {
                if (!(fileArgs === null || fileArgs === void 0 ? void 0 : fileArgs.length)) {
                    let errorHandler = null;
                    const upload = (0, multer_1.default)().none();
                    return upload(req, res, (error) => {
                        if (error) {
                            errorHandler = {
                                errors: [
                                    (error === null || error === void 0 ? void 0 : error.message) || 'os-core:Error formData fields',
                                ],
                                errorKey: 'VALIDATION_ERROR',
                                message: 'Error validation',
                            };
                        }
                        resolve(errorHandler);
                    });
                }
                else {
                    let errorHandler = null;
                    const multiFields = [];
                    const singleFields = [];
                    const fields = [];
                    fileArgs.forEach((arg) => {
                        if (arg.key === 'AppFiles') {
                            fields.push({
                                name: arg.fileKey || 'files',
                            });
                            multiFields.push({
                                name: arg.fileKey || 'files',
                                maxCount: arg.maxCount,
                                minCount: arg.minCount,
                                formats: arg.formats,
                            });
                            return;
                        }
                        singleFields.push({
                            name: arg.fileKey || 'file',
                            req: arg.required,
                            formats: arg.formats,
                        });
                        fields.push({
                            name: arg.fileKey || 'file',
                        });
                    });
                    const upload = (0, multer_1.default)({
                        storage: storage,
                    }).fields(fields);
                    return upload(req, res, (error) => {
                        if (error) {
                            errorHandler = {
                                errors: [
                                    (error === null || error === void 0 ? void 0 : error.message) || 'os-core:Error upload files',
                                ],
                                errorKey: 'VALIDATION_ERROR',
                                message: 'Error validation',
                            };
                        }
                        if ((singleFields === null || singleFields === void 0 ? void 0 : singleFields.length) >= 1) {
                            singleFields.forEach((field) => {
                                var _a, _b, _c;
                                //@ts-ignore
                                const file = req.files && ((_a = req.files[field.name]) === null || _a === void 0 ? void 0 : _a.length) >= 1 ? req.files[field.name][0] : null;
                                if (field.req && !file) {
                                    errorHandler = {
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `File required`,
                                            },
                                        ],
                                        message: 'Error validation',
                                        errorKey: 'VALIDATION_ERROR',
                                    };
                                }
                                if (field.formats &&
                                    ((_b = field.formats) === null || _b === void 0 ? void 0 : _b.length) >= 1 &&
                                    file &&
                                    !field.formats.includes(file.mimetype)) {
                                    errorHandler = {
                                        message: 'Error validation',
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `Only ${(_c = field.formats) === null || _c === void 0 ? void 0 : _c.join(',')} formats`,
                                            },
                                        ],
                                        errorKey: 'VALIDATION_ERROR',
                                    };
                                }
                            });
                        }
                        if ((multiFields === null || multiFields === void 0 ? void 0 : multiFields.length) >= 1) {
                            multiFields.forEach((field) => {
                                //@ts-ignore
                                const files = (req === null || req === void 0 ? void 0 : req.files) && (req === null || req === void 0 ? void 0 : req.files[field === null || field === void 0 ? void 0 : field.name]) ? req === null || req === void 0 ? void 0 : req.files[field === null || field === void 0 ? void 0 : field.name] : null;
                                if (field.minCount && (!files || (files === null || files === void 0 ? void 0 : files.length) < field.minCount)) {
                                    errorHandler = {
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `Min files - ${field === null || field === void 0 ? void 0 : field.minCount}`,
                                            },
                                        ],
                                        errorKey: 'VALIDATION_ERROR',
                                        message: 'Error validation',
                                    };
                                }
                                if (field.maxCount && ((files === null || files === void 0 ? void 0 : files.length) > field.maxCount)) {
                                    errorHandler = {
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `Max files - ${field === null || field === void 0 ? void 0 : field.maxCount}`,
                                            },
                                        ],
                                        errorKey: 'VALIDATION_ERROR',
                                        message: 'Error validation',
                                    };
                                }
                                if ((field === null || field === void 0 ? void 0 : field.formats) &&
                                    field.formats.length >= 1 &&
                                    (files === null || files === void 0 ? void 0 : files.length) >= 1) {
                                    files.forEach((file) => {
                                        var _a, _b;
                                        if (!((_a = field.formats) === null || _a === void 0 ? void 0 : _a.includes(file.mimetype))) {
                                            errorHandler = {
                                                message: 'Error validation',
                                                errors: [
                                                    {
                                                        key: field.name,
                                                        message: `Only ${(_b = field.formats) === null || _b === void 0 ? void 0 : _b.join(',')} formats`,
                                                    },
                                                ],
                                                errorKey: 'VALIDATION_ERROR',
                                            };
                                        }
                                    });
                                }
                            });
                        }
                        resolve(errorHandler);
                    });
                }
            }
            catch (error) {
                resolve({
                    message: 'Error formData',
                    errorKey: 'VALIDATION_ERROR',
                    errors: ['Error formData..'],
                });
            }
        });
    }
}
exports.FormDataArgsEndpointsHandler = FormDataArgsEndpointsHandler;
//# sourceMappingURL=FormDataArgsEndpointsHandler.js.map