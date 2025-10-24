import {
    AppFileArgControllerEndpoint,
    AppFilesArgControllerEndpoint,
    ArgControllerEndpoint,
    IFormDataArgsEndpointsHandler,
} from '@controllers'
import {AppErrorKey, ErrorValue} from '@appError'
import multer from 'multer'
import {IAppFile} from '@files'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'


type ErrorHandler = {
    errors?: ErrorValue[]
    message: string
    errorKey: AppErrorKey
}

const storage = multer.memoryStorage()

export class FormDataArgsEndpointsHandler implements IFormDataArgsEndpointsHandler {
    
    public getFormDataEndpointArgs(args: ArgControllerEndpoint[]): Array<
        AppFileArgControllerEndpoint |
        AppFilesArgControllerEndpoint
    > | null {
        const fileArgs: Array<
            AppFileArgControllerEndpoint |
            AppFilesArgControllerEndpoint
        > = []
        
    
        let hasArgs = false
        args.forEach((arg, index) => {
            if (arg.key === 'AppFile') {
                if (!hasArgs) {
                    hasArgs = true
                }
                fileArgs.push(arg)
            }
            if (arg.key === 'AppFiles') {
                if (!hasArgs) {
                    hasArgs = true
                }
                fileArgs.push(arg)
            }
            if (arg.key === 'FormData') {
                if (!hasArgs) {
                    hasArgs = true
                }
            }
            if (arg.key === 'AppFormDataParamNum') {
                if (!hasArgs) {
                    hasArgs = true
                }
            }
            if (arg.key === 'AppFormDataParam') {
                if (!hasArgs) {
                    hasArgs = true
                }
            }
        })
        if (!hasArgs) {
            return null
        }
        
        return fileArgs
    }
    
    public async handleFormDataArgs(
        fileArgs: Array<
            AppFileArgControllerEndpoint |
            AppFilesArgControllerEndpoint
        >,
        req: AppRequest,
        res: AppResponse,
    ): Promise<ErrorHandler | null> {
        
        return new Promise((resolve, reject) => {
            try {
                if (!fileArgs?.length) {
                    let errorHandler: ErrorHandler | null = null
                    const upload = multer().none()
                    return upload(req as any, res as any, (error) => {
                        if (error) {
                            errorHandler = {
                                errors: [
                                    error?.message || 'os-core:Error formData fields',
                                ],
                                errorKey: 'VALIDATION_ERROR',
                                message: 'Error validation',
                            }
                        }
                        resolve(errorHandler)
                    })
                } else {
                    let errorHandler: ErrorHandler | null = null
                    const multiFields: {
                        name: string,
                        maxCount?: number,
                        minCount?: number,
                        formats?: string[]
                    }[] = []
                    
                    const singleFields: {
                        name: string,
                        req?: boolean,
                        formats?: string[]
                    }[] = []
                    
                    const fields: {name: string}[] = []
                    
                    
                    fileArgs.forEach((arg) => {
                        if (arg.key === 'AppFiles') {
                            fields.push({
                                name: arg.fileKey || 'files',
                            })
                            multiFields.push({
                                name: arg.fileKey || 'files',
                                maxCount: arg.maxCount,
                                minCount: arg.minCount,
                                formats: arg.formats,
                            })
                            return
                        }
                        singleFields.push({
                            name: arg.fileKey || 'file',
                            req: arg.required,
                            formats: arg.formats,
                        })
                        fields.push({
                            name: arg.fileKey || 'file',
                        })
                    })
                    const upload = multer({
                        storage: storage,
                    }).fields(fields)
                    
                    return upload(req as any, res as any, (error) => {
                        if (error) {
                            errorHandler = {
                                errors: [
                                    error?.message || 'os-core:Error upload files',
                                ],
                                errorKey: 'VALIDATION_ERROR',
                                message: 'Error validation',
                            }
                        }
                        if (singleFields?.length >= 1) {
                            singleFields.forEach((field) => {
                                //@ts-ignore
                                const file = req.files && req.files[field.name]?.length >= 1 ? req.files[field.name][0] : null
                                
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
                                    }
                                }
                                
                                if (
                                    field.formats &&
                                    field.formats?.length >= 1 &&
                                    file &&
                                    !field.formats.includes(file.mimetype)
                                ) {
                                    errorHandler = {
                                        message: 'Error validation',
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `Only ${field.formats?.join(',')} formats`,
                                            },
                                        ],
                                        errorKey: 'VALIDATION_ERROR',
                                    }
                                }
                            })
                        }
                        
                        if (multiFields?.length >= 1) {
                            multiFields.forEach((field) => {
                                //@ts-ignore
                                const files = req?.files && req?.files[field?.name] ? req?.files[field?.name] : null
                                if (field.minCount && (!files || files?.length < field.minCount)) {
                                    errorHandler = {
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `Min files - ${field?.minCount}`,
                                            },
                                        ],
                                        errorKey: 'VALIDATION_ERROR',
                                        message: 'Error validation',
                                    }
                                }
                                if (field.maxCount && (files?.length > field.maxCount)) {
                                    errorHandler = {
                                        errors: [
                                            {
                                                key: field.name,
                                                message: `Max files - ${field?.maxCount}`,
                                            },
                                        ],
                                        errorKey: 'VALIDATION_ERROR',
                                        message: 'Error validation',
                                    }
                                }
                                if (
                                    field?.formats &&
                                    field.formats.length >= 1 &&
                                    files?.length >= 1
                                ) {
                                    files.forEach((file: IAppFile) => {
                                        if (!field.formats?.includes(file.mimetype)) {
                                            errorHandler = {
                                                message: 'Error validation',
                                                errors: [
                                                    {
                                                        key: field.name,
                                                        message: `Only ${field.formats?.join(',')} formats`,
                                                    },
                                                ],
                                                errorKey: 'VALIDATION_ERROR',
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        
                        resolve(errorHandler)
                    })
                }
                
                
            } catch (error) {
                resolve({
                    message: 'Error formData',
                    errorKey: 'VALIDATION_ERROR',
                    errors: ['Error formData..'],
                })
            }
        })
    }
    
}