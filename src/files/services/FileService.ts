import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError, AppErrorHelper} from '@appError'
import {S3} from 'aws-sdk'

import path from 'path'
import fs from 'fs/promises'
import mime from 'mime'
import {appLogger} from '@logger'

let s3: S3 | null = null

const getS3 = (): S3 => {
    if (s3) {
        return s3
    }
    
    s3 = new S3({
        region: APP_CONFIG_OS_CORE.awsS3.region,
        credentials: {
            accessKeyId: APP_CONFIG_OS_CORE.awsS3.accessKey,
            secretAccessKey: APP_CONFIG_OS_CORE.awsS3.secretKey,
        },
    })
    
    return s3
}

export class FileService {
    
    static async save(options: {
        fileNameS3: string
        fileNameLocal: string
        dirPathLocal?: string
        fileNameDirPathLocal?: string
        buffer: Buffer
        mimetype: string
        hasUploadToS3?: boolean
    }): Promise<{filePath: string}>
    static async save(options: {
        fileName: string
        dirPathLocal?: string
        fileNameDirPathLocal?: string
        buffer: Buffer
        mimetype: string
        hasUploadToS3?: boolean,
        
    }): Promise<{filePath: string}>
    static async save({
                          fileName,
                          fileNameS3,
                          fileNameLocal,
                          dirPathLocal = 'files',
                          fileNameDirPathLocal,
                          mimetype,
                          buffer,
                          hasUploadToS3,
                      }: {
        buffer: Buffer
        mimetype: string
        fileName?: string
        fileNameS3?: string
        fileNameLocal?: string
        dirPathLocal?: string
        fileNameDirPathLocal?: string
        hasUploadToS3?: boolean
    }): Promise<{filePath: string}> {
        
        const targetHasUploadToS3 = typeof hasUploadToS3 !== 'undefined' ? hasUploadToS3 : APP_CONFIG_OS_CORE.awsS3.hasUploadToS3
        
        if (targetHasUploadToS3) {
            return await this.saveFileToAwsS3({
                buffer,
                fileName: fileNameS3 || fileName || 'file',
                mimetype,
            })
        }
        
        return await this.saveFileToLocal({
            buffer,
            fileName: fileNameLocal || fileName || 'file',
            dirPath: dirPathLocal,
            fileNameDirPathLocal,
        })
    }
    
    static saveFileToAwsS3({
                               buffer,
                               fileName,
                               mimetype,
                           }: {
        buffer: Buffer
        fileName: string
        mimetype: string
    }): Promise<{filePath: string}> {
        return new Promise(async (resolve, reject) => {
            
            const s3 = getS3()
            
            const params: S3.Types.PutObjectRequest = {
                Bucket: APP_CONFIG_OS_CORE.awsS3.bucket,
                Key: fileName,
                Body: buffer,
                ContentType: mimetype,
            }
            
            
            s3.upload(params, (error, data) => {
                if (error) {
                    reject(new AppError('os-core:Error upload file s3.' + error.message + error.message, {
                        errorKey: 'DELETE_FILE_ERROR',
                    }))
                }
                
                resolve({
                    filePath: data?.Location || '',
                })
            })
        })
    }
    
    static async saveFileToLocal({
                                     fileName,
                                     buffer,
                                     dirPath,
                                     fileNameDirPathLocal,
                                 }: {
        fileName: string
        dirPath: string
        buffer: Buffer
        fileNameDirPathLocal?: string
    }): Promise<{filePath: string}> {
        try {
            const rootDir = process.cwd()
            const directoryPath = path.join(rootDir, ...dirPath.split('/'))
            
            const filePath = path.join(directoryPath, fileName)
            
            await fs.mkdir(directoryPath, {recursive: true})
            
            await fs.writeFile(filePath, buffer)
            
            const relativeFilePath = `${fileNameDirPathLocal || dirPath}/${fileName}`
            
            return {filePath: relativeFilePath}
        } catch (error) {
            appLogger.error('os-core: Error saving file local.', error)
            throw new AppError('Error saving file local.', {
                errorKey: 'SAVE_FILE_ERROR',
            })
        }
    }
    
    static async delete({filePath, uploadedToS3}: {
        filePath: string,
        uploadedToS3?: boolean,
    }): Promise<{result: boolean}> {
        if (uploadedToS3 || filePath?.includes('http')) {
            return this.deleteFileFromAwsS3(filePath)
        }
        return this.deleteFileFromLocal(filePath)
    }
    
    static deleteFileFromAwsS3(filePath: string): Promise<{result: boolean}> {
        return new Promise(async (resolve, reject) => {
            const params: S3.Types.PutObjectRequest = {
                Bucket: APP_CONFIG_OS_CORE.awsS3.bucket,
                Key: filePath?.split('.com/').pop() || '',
            }
            const s3 = getS3()
            
            s3.deleteObject(params, (error, data) => {
                if (error) {
                    reject(new AppError('os-core:Error delete file s3. ' + error.message, {
                        errorKey: 'DELETE_FILE_ERROR',
                    }))
                }
                
                resolve({
                    result: data?.DeleteMarker || false,
                })
            })
        })
    }
    
    static async deleteFileFromLocal(filePath: string): Promise<{result: boolean}> {
        try {
            await fs.rm(filePath, {
                force: true,
            })
            
            return {result: true}
        } catch (error) {
            appLogger.error('os-core: Error delete file local.', error)
            throw new AppError('Error deleting file local.', {
                errorKey: 'DELETE_FILE_ERROR',
            })
        }
    }
    
    static async checkAwsS3(): Promise<boolean> {
        try {
            const s3 = getS3()
            
            await s3.headBucket({Bucket: APP_CONFIG_OS_CORE.awsS3.bucket}).promise()
            return true
        } catch (error) {
            appLogger.error('os-core: Error connection aws s3', error)
            throw new AppError('os-core: Error connection aws s3', {
                errorKey: 'CONNECT_TO_AWS_S3_ERROR',
            })
        }
    }
    
    static async getFileBufferByUrl(url: string): Promise<{
        buffer: Buffer
        mimetype: string
        format: string,
    }> {
        const format = path.extname(url).slice(1)
        try {
            const response = await fetch(url)
            
            if (!response.ok) {
                throw new AppError('Error getting buffer from url:' + url, {
                    errorKey: 'GET_FILE_BUFFER_ERROR',
                })
            }
            
            const buffer = await response.arrayBuffer()
            const mimetype = mime.lookup(url)
            
            return {
                buffer: Buffer.from(buffer),
                mimetype,
                format,
            }
        } catch (error) {
            appLogger.error('Error getting buffer from url:' + url, error)
            throw new AppError('Error getting buffer from url:' + url, {
                errorKey: 'GET_FILE_BUFFER_ERROR',
            })
        }
    }
    
    static async deleteFilesOnError<Result = any>({
                                                      cb,
                                                      filePaths,
                                                  }: {
        filePaths: string[],
        cb: () => Promise<Result>
    }): Promise<Result> {
        try {
            return await cb()
        } catch (error) {
            
            if (filePaths.length >= 1) {
                for (const path of filePaths) {
                    try {
                        await this.delete({filePath: path})
                    } catch (error) {
                        appLogger.error(error)
                    }
                }
            }
            if (AppErrorHelper.checkIsAppError(error)) {
                throw new AppError(error.message, {
                    errorKey: error.errorKey,
                    errorCode: error.errorCode,
                    errors: error.errors,
                    statusCode: error.statusCode,
                })
            } else {
                throw new AppError('Error save file', {
                    errorKey: 'SAVE_FILE_ERROR',
                })
            }
        }
    }
    
}



