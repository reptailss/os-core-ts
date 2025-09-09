import {AuthHelper} from '@auth'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError, AppErrorHelper} from '@appError'
import {appLogger} from '@logger'


type Params = {
    [key: string]: undefined | string | number | boolean | (string | number | boolean)[] | Params | Params[]
}

export class SystemRequestHelper {
    static get<Data>({
                         url,
                         headers,
                         params,
                         serviceKey,
                     }: {
        url: string,
        serviceKey: string,
        headers?: Record<string, string>;
        params?: Params
    }): Promise<Data> {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            method: 'GET',
            params,
            serviceKey,
        })
    }
    
    static post<Data>({
                          url,
                          headers,
                          body,
                          params,
                          serviceKey,
                      }: {
        url: string,
        serviceKey: string,
        headers?: Record<string, string>;
        body?: string | FormData,
        params?: Params,
    }): Promise<Data> {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            body,
            method: 'POST',
            params,
            serviceKey,
        })
    }
    
    static put<Data>({
                         url,
                         headers,
                         body,
                         params,
                         serviceKey,
                     }: {
        url: string,
        serviceKey: string,
        headers?: Record<string, string>;
        body?: string | FormData,
        params?: Params
    }): Promise<Data> {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            body,
            method: 'PUT',
            params,
            serviceKey,
        })
    }
    
    static delete<Data>({
                            url,
                            headers,
                            params,
                            serviceKey,
                        }: {
        url: string,
        serviceKey: string,
        headers?: Record<string, string>;
        params?: Params
    }): Promise<Data> {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            method: 'DELETE',
            params,
            serviceKey,
        })
    }
    
    
    private static async systemRequestHelper<Data>(props: {
        url: string
        serviceKey: string
        headers?: Record<string, string>
        method?: 'GET' | 'DELETE' | 'POST' | 'PUT'
        body?: string | FormData,
        params?: Params
    }): Promise<Data> {
        
        let response
        try {
            response = await fetch(props.params ? `${props.url}?${this.serializeUrlParams(props.params)}` : props.url, {
                method: props.method || 'GET',
                headers: props.headers || {},
                body: props.body,
            })
        } catch (error) {
            throw new AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorKey: 'EXTERNAL_REQUEST_FAILED_ERROR',
            })
        }
        
        const data = await this.parseResponse(response, props)
        
        if (!response.ok) {
            if (AppErrorHelper.checkIsErrorResult(data)) {
                if (data.errors?.length > 0) {
                    appLogger.error(`${props.serviceKey} errors:${JSON.stringify(data.errors)}`)
                }
                throw new AppError(`Error system request:'${props.serviceKey}'. Error code:${data.error_code}`, {
                    errors: data.errors,
                    statusCode: data.status,
                    errorCode: data.error_code,
                })
            }
            throw new AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorKey: 'EXTERNAL_REQUEST_FAILED_ERROR',
                statusCode: response.status,
            })
        }
        
        return data
        
    }
    
    private static async parseResponse(response: Response, props: {
        url: string
        serviceKey: string
        headers?: Record<string, string>
        method?: 'GET' | 'DELETE' | 'POST' | 'PUT'
        body?: string | FormData,
        params?: Params
    }): Promise<any> {
        try {
            const contentType = response.headers.get('Content-Type')
            if (
                !contentType ||
                !contentType.includes('application/json')
            ) {
                return await response.text()
            }
            return await response.json()
        } catch (error) {
            throw new AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorKey: 'EXTERNAL_REQUEST_FAILED_ERROR',
            })
        }
    }
    
    private static buildHeadersWithSystemToken(headers?: Record<string, string>): Record<string, string> {
        if (!headers) {
            return AuthHelper.buildAuthHeaders(APP_CONFIG_OS_CORE.tokens.systemAuthToken)
        }
        return {
            ...headers,
            ...AuthHelper.buildAuthHeaders(APP_CONFIG_OS_CORE.tokens.systemAuthToken),
        }
    }
    
    private static serializeUrlParams(obj?: Params, prefix?: string): string {
        let str: string[] = []
        let p
        for (p in obj) {
            if (obj && obj.hasOwnProperty(p)) {
                let k = prefix ? prefix + '[' + p + ']' : p
                let v = obj[p]
                if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                    str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v))
                } else if (v !== null && typeof v === 'object') {
                    str.push(this.serializeUrlParams(v as any, k))
                }
            }
        }
        return str.join('&')
    }
}


