/// <reference types="node" />
import http from 'http';
import { AppModule } from "../../appModule";
import { IRouterBuilder } from "../../routerBuilder";
import { AppRequest } from "../../appRequest";
import { AppResponse } from "../../appResponse";
import { AppRouterRequestHandler } from "../../appRouter";
export interface IApp {
    useModule(module: AppModule): this;
    useCors(): this;
    useStatic(dirPath: string): this;
    useHealth(): this;
    useDashboard(): this;
    useSwagger(): this;
    useRequestLogger(): this;
    useConsoleLogger(): this;
    useImportStructureServiceEndpoints(type: 'default' | 'plugin'): this;
    usePlugin(plugin: IAppPlugin): this;
    useNotFoundRoute(appRouterRequestHandler: AppRouterRequestHandler): this;
    /**
     * Якщо викликано enableSystemModulesFromEnv(), налаштування CORS, Swagger, RequestLogger
     * беруться з ENV-конфігурації (APP_CONFIG_OS_CORE) та ігнорують локальні виклики useCors(), useSwagger(), useRequestLogger().
     * Інакше – використовуються локальні налаштування.
     */
    enableSystemModulesFromEnv(): this;
    useMiddleware(middleware: (req: AppRequest, res: AppResponse, next: () => void) => void): this;
    initModules(): this;
    listen(port?: number, callback?: () => void): http.Server;
    routerBuilder: IRouterBuilder;
}
export interface IAppPlugin {
    register(app: IApp): void;
}
