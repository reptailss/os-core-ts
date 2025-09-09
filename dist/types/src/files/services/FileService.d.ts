/// <reference types="node" />
/// <reference types="node" />
export declare class FileService {
    static save(options: {
        fileNameS3: string;
        fileNameLocal: string;
        dirPathLocal?: string;
        fileNameDirPathLocal?: string;
        buffer: Buffer;
        mimetype: string;
        hasUploadToS3?: boolean;
    }): Promise<{
        filePath: string;
    }>;
    static save(options: {
        fileName: string;
        dirPathLocal?: string;
        fileNameDirPathLocal?: string;
        buffer: Buffer;
        mimetype: string;
        hasUploadToS3?: boolean;
    }): Promise<{
        filePath: string;
    }>;
    static saveFileToAwsS3({ buffer, fileName, mimetype, }: {
        buffer: Buffer;
        fileName: string;
        mimetype: string;
    }): Promise<{
        filePath: string;
    }>;
    static saveFileToLocal({ fileName, buffer, dirPath, fileNameDirPathLocal, }: {
        fileName: string;
        dirPath: string;
        buffer: Buffer;
        fileNameDirPathLocal?: string;
    }): Promise<{
        filePath: string;
    }>;
    static delete({ filePath, uploadedToS3 }: {
        filePath: string;
        uploadedToS3?: boolean;
    }): Promise<{
        result: boolean;
    }>;
    static deleteFileFromAwsS3(filePath: string): Promise<{
        result: boolean;
    }>;
    static deleteFileFromLocal(filePath: string): Promise<{
        result: boolean;
    }>;
    static checkAwsS3(): Promise<boolean>;
    static getFileBufferByUrl(url: string): Promise<{
        buffer: Buffer;
        mimetype: string;
        format: string;
    }>;
    static deleteFilesOnError<Result = any>({ cb, filePaths, }: {
        filePaths: string[];
        cb: () => Promise<Result>;
    }): Promise<Result>;
}
