import 'express'
import {
    IGmRenderModuleClass,
    IGmRenderModuleClassMethod,
    IGmRenderModuleConstant,
    IGmRenderModuleFn,
    IGmRenderModuleType,
} from '@gm/core'

declare function multer(options?: multer.Options): multer.Multer;

declare namespace multer {

    interface Multer {
        single(fieldName: string): RequestHandler

        array(fieldName: string, maxCount?: number): RequestFormDataHandler;

        fields(fields: readonly Field[]): RequestFormDataHandler;

        any(): RequestFormDataHandler;

        none(): RequestFormDataHandler;
    }

    function diskStorage(options: DiskStorageOptions): StorageEngine;

    function memoryStorage(): StorageEngine;

    interface FileFilterCallback {
        (error: Error): void;

        (error: null, acceptFile: boolean): void;
    }

    interface Options {
        storage?: StorageEngine | undefined;
        dest?: string | undefined;
        limits?: {
            fieldNameSize?: number | undefined;
            fieldSize?: number | undefined;
            fields?: number | undefined;
            fileSize?: number | undefined;
            files?: number | undefined;
            parts?: number | undefined;
            headerPairs?: number | undefined;
        } | undefined;
        preservePath?: boolean | undefined;

        fileFilter?(
            req: Request,
            file: Express.Multer.File,
            callback: FileFilterCallback,
        ): void;
    }

    interface StorageEngine {
        _handleFile(
            req: Request,
            file: Express.Multer.File,
            callback: (error?: any, info?: Partial<Express.Multer.File>) => void,
        ): void;

        _removeFile(
            req: Request,
            file: Express.Multer.File,
            callback: (error: Error | null) => void,
        ): void;
    }

    interface DiskStorageOptions {

        destination?:
            | string
            | ((
            req: Request,
            file: Express.Multer.File,
            callback: (error: Error | null, destination: string) => void,
        ) => void)
            | undefined;

        filename?(
            req: Request,
            file: Express.Multer.File,
            callback: (error: Error | null, filename: string) => void,
        ): void;
    }

    interface Field {
        name: string;
        maxCount?: number | undefined;
    }
}

export {}

declare module '*.txt' {
}


declare module 'express-serve-static-core' {
    interface Response {
        _body?: any
        responseTime:number
    }
}