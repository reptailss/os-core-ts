export declare function Post(path: string): (target: any, propertyKey: string) => void;
export declare function Put(path: string): (target: any, propertyKey: string) => void;
export declare function Get(path: string): (target: any, propertyKey: string) => void;
export declare function Delete(path: string): (target: any, propertyKey: string) => void;
export declare function SystemPost(path: string): (target: any, propertyKey: string) => void;
export declare function SystemPut(path: string): (target: any, propertyKey: string) => void;
export declare function SystemGet(path: string): (target: any, propertyKey: string) => void;
export declare function SystemDelete(path: string): (target: any, propertyKey: string) => void;
export declare function SendFileByPath(path: string, options?: {
    root?: string;
}): (target: any, propertyKey: string) => void;
export declare function SendFile(path: string, options?: {
    root?: string;
}): (target: any, propertyKey: string) => void;
