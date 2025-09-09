type Params = {
    [key: string]: undefined | string | number | boolean | (string | number | boolean)[] | Params | Params[];
};
export declare class RequestHelper {
    static get<Data>({ url, headers, params, }: {
        url: string;
        headers?: Record<string, string>;
        params?: Params;
    }): Promise<Data>;
    static post<Data>({ url, headers, body, params, }: {
        url: string;
        headers?: Record<string, string>;
        body?: string | FormData;
        params?: Params;
    }): Promise<Data>;
    static put<Data>({ url, headers, body, params, }: {
        url: string;
        headers?: Record<string, string>;
        body?: string | FormData;
        params?: Params;
    }): Promise<Data>;
    static delete<Data>({ url, headers, body, params, }: {
        url: string;
        headers?: Record<string, string>;
        body?: string;
        params?: Params;
    }): Promise<Data>;
    private static requestHelper;
    private static parseResponse;
    private static buildLoggerReqMessage;
    private static serializeUrlParams;
}
export {};
