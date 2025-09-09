import { DecoratorParam } from "../core";
import { AppFile } from "../../files";
export declare const AppFileDec: <Row extends object = any>({ fileKey, formats, required, }?: {
    fileKey?: string | undefined;
    formats?: string[] | undefined;
    required?: boolean | undefined;
}) => DecoratorParam<AppFile | undefined>;
export declare const DeleteOldFileIfNullDec: ({ fileKey, }?: {
    fileKey?: string | undefined;
}) => DecoratorParam<boolean>;
export declare const AppFilesDec: <Row extends object = any>({ formats, maxCount, minCount, fileKey, }: {
    fileKey?: string | undefined;
    maxCount?: number | undefined;
    minCount?: number | undefined;
    formats?: string[] | undefined;
}) => DecoratorParam<AppFile[]>;
