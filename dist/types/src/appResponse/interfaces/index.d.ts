/// <reference types="node" />
import http from 'http';
export interface AppResponse extends http.ServerResponse {
    send: (body?: any) => this;
    sendFile(path: string, fn?: (error: Error) => void): void;
    sendFile(path: string, options?: SendFileOptions, onError?: (error: Error) => void): void;
    status(code: number): this;
    sendStatus(code: number): this;
    contentType(type: string): this;
    cookie(name: string, val: string, options?: ResCookieOptions): this;
    redirect(url: string): void;
    redirect(status: number, url: string): void;
    _body?: string | object;
    locals: Record<string, any>;
    responseTime?: number;
}
type SendFileOptions = {
    acceptRanges?: boolean | undefined;
    cacheControl?: boolean | undefined;
    dotfiles?: 'allow' | 'deny' | 'ignore' | undefined;
    end?: number | undefined;
    etag?: boolean | undefined;
    extensions?: string[] | string | boolean | undefined;
    immutable?: boolean | undefined;
    index?: string[] | string | boolean | undefined;
    lastModified?: boolean | undefined;
    maxAge?: string | number | undefined;
    root?: string | undefined;
    start?: number | undefined;
    headers?: Record<string, unknown>;
};
type ResCookieOptions = {
    maxAge?: number | undefined;
    signed?: boolean | undefined;
    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    encode?: ((val: string) => string) | undefined;
    sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
    priority?: 'low' | 'medium' | 'high';
    partitioned?: boolean | undefined;
};
export {};
