type Params = {
    [key: string]: undefined | string | number | boolean | (string | number | boolean)[] | Params | Params[];
};
export declare class SystemRequestHelper {
    static get<Data>({ url, headers, params, serviceKey, }: {
        url: string;
        serviceKey: string;
        headers?: Record<string, string>;
        params?: Params;
    }): Promise<Data>;
    static post<Data>({ url, headers, body, params, serviceKey, }: {
        url: string;
        serviceKey: string;
        headers?: Record<string, string>;
        body?: string | FormData;
        params?: Params;
    }): Promise<Data>;
    static put<Data>({ url, headers, body, params, serviceKey, }: {
        url: string;
        serviceKey: string;
        headers?: Record<string, string>;
        body?: string | FormData;
        params?: Params;
    }): Promise<Data>;
    static delete<Data>({ url, headers, params, serviceKey, }: {
        url: string;
        serviceKey: string;
        headers?: Record<string, string>;
        params?: Params;
    }): Promise<Data>;
    private static systemRequestHelper;
    private static parseResponse;
    private static buildHeadersWithSystemToken;
    private static serializeUrlParams;
}
export {};
