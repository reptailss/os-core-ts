import {AppError} from '@appError'
import {appLogger} from '@logger'


type Params = {
    [key: string]: undefined | string | number | boolean | (string | number | boolean)[] | Params | Params[]
}

export class RequestHelper {
    static get<Data>({
                         url,
                         headers,
                         params,
                     }: {
        url: string,
        headers?: Record<string, string>;
        params?: Params
    }): Promise<Data> {
        return this.requestHelper({
            url,
            headers,
            method: 'GET',
            params,
        })
    }
    
    static post<Data>({
                          url,
                          headers,
                          body,
                          params,
                      }: {
        url: string,
        headers?: Record<string, string>;
        body?: string | FormData,
        params?: Params
    }): Promise<Data> {
        return this.requestHelper({
            url,
            headers,
            body,
            method: 'POST',
            params,
        })
    }
    
    static put<Data>({
                         url,
                         headers,
                         body,
                         params,
                     }: {
        url: string,
        headers?: Record<string, string>;
        body?: string | FormData,
        params?: Params
    }): Promise<Data> {
        return this.requestHelper({
            url,
            headers,
            body,
            method: 'PUT',
            params,
        })
    }
    
    static delete<Data>({
                            url,
                            headers,
                            body,
                            params,
                        }: {
        url: string,
        headers?: Record<string, string>;
        body?: string,
        params?: Params
    }): Promise<Data> {
        return this.requestHelper({
            url,
            headers,
            body,
            method: 'DELETE',
            params,
        })
    }
    
    
    private static async requestHelper<Data>(props: {
        url: string
        headers?: Record<string, string>
        method?: 'GET' | 'DELETE' | 'POST' | 'PUT'
        body?: string | FormData,
        params?: Params
    }): Promise<Data> {
        
        let response: Response
        
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
            appLogger.error(...this.buildLoggerReqMessage(props))
            if (typeof data === 'object') {
                appLogger.error(JSON.stringify(data))
            } else {
                appLogger.error(data)
            }
            throw new AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorCode: data?.error_code || 'external_request_failed_error',
                statusCode: response.status,
            })
        }
        
        return data
        
    }
    
    private static async parseResponse(response: Response, props: {
        url: string
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
    
    private static buildLoggerReqMessage(
        props: {
            url: string,
            headers?: Record<string, string | number | boolean>;
            body?: any,
            params?: Params,
            method?: 'GET' | 'DELETE' | 'POST' | 'PUT',
        },
    ): string[] {
        const res: string[] = [
            `Request failed ${props.method || 'GET'} url:${props.url}`,
        ]
        if (props.params) {
            res.push(`Request params:${JSON.stringify(props.params)}`)
        }
        return res
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
