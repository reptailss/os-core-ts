export type Oas3SelectorsSwagger = {
    getOperations: () => any[];
    getSchemas: () => Record<string, any>;
    [key: string]: (...args: any[]) => any;
};
