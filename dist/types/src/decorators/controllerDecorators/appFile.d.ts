import { DecoratorParam } from "../core";
import { IAppFile } from "../../files";
export declare const AppFile: ({ fileKey, formats, required, }: {
    fileKey: string;
    formats?: string[] | undefined;
    required?: boolean | undefined;
}) => DecoratorParam<IAppFile | undefined>;
export declare const DeleteOldFileIfNull: ({ fileKey, }: {
    fileKey: string;
}) => DecoratorParam<boolean>;
export declare const AppFiles: <Row extends object = any>({ formats, maxCount, minCount, fileKey, }: {
    fileKey: string;
    maxCount?: number | undefined;
    minCount?: number | undefined;
    formats?: string[] | undefined;
}) => DecoratorParam<IAppFile[]>;
