export declare function PostDec(path: string): (target: any, propertyKey: string) => void;
export declare function PutDec(path: string): (target: any, propertyKey: string) => void;
export declare function GetDec(path: string): (target: any, propertyKey: string) => void;
export declare function DeleteDec(path: string): (target: any, propertyKey: string) => void;
export declare function SystemPostDec(path: string): (target: any, propertyKey: string) => void;
export declare function SystemPutDec(path: string): (target: any, propertyKey: string) => void;
export declare function SystemGetDec(path: string): (target: any, propertyKey: string) => void;
export declare function SystemDeleteDec(path: string): (target: any, propertyKey: string) => void;
export declare function SendFileByPathDec(path: string, options?: {
    root?: string;
}): (target: any, propertyKey: string) => void;
export declare function SendFileDec(path: string, options?: {
    root?: string;
}): (target: any, propertyKey: string) => void;
