type Query = Record<string, string | string[]>;
export type AppRequest = {
    path: string;
    params: Record<string, string>;
    query: Record<string, string | string[] | Query>;
    body: any;
    headers: Record<string, string>;
    method: string;
    url: string;
    originalUrl: string;
};
export {};
