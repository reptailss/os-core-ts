import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'

export type AppRouterRequestHandler = (req: AppRequest, res: AppResponse, next: () => void) => Promise<void> | void

export interface AppRouter {
    get(path: string, ...handlers: AppRouterRequestHandler[]): void
    
    post(path: string, ...handlers: AppRouterRequestHandler[]): void
    
    put(path: string, ...handlers: AppRouterRequestHandler[]): void
    
    delete(path: string, ...handlers: AppRouterRequestHandler[]): void
}