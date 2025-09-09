/// <reference types="node" />
import express from 'express';
import http from 'http';
import { IApp, IAppPlugin } from "..";
import { IAppModule } from "../../appModule";
import { IRouterBuilder } from "../../routerBuilder";
import { AppRequest } from "../../appRequest";
import { AppResponse } from "../../appResponse";
import { AppRouterRequestHandler } from "../../appRouter";
export declare class App implements IApp {
    private readonly expressApp;
    readonly routerBuilder: IRouterBuilder;
    private readonly appPlugins;
    private readonly appModules;
    private readonly modulesConfig;
    private notFoundAppRouterRequestHandler;
    listen(port?: number, callback?: () => void): http.Server;
    useModule(appModule: IAppModule): this;
    useStatic(dirPath: string): this;
    useCors(): this;
    useHealth(): this;
    useDashboard(): this;
    useSwagger(): this;
    useRequestLogger(): this;
    useConsoleLogger(): this;
    useImportStructureServiceEndpoints(type: 'default' | 'plugin'): this;
    usePlugin(plugin: IAppPlugin): this;
    enableSystemModulesFromEnv(): this;
    initModules(): this;
    use(...props: any[]): express.Express;
    useMiddleware(middleware: (req: AppRequest, res: AppResponse, next: () => void) => void): this;
    set(key: string, value: unknown): void;
    useLocales({}: {
        locales: string[];
        defaultLocale: string;
    }): this;
    useNotFoundRoute(appRouterRequestHandler: AppRouterRequestHandler): this;
    private getServiceEndpointsFromAppModules;
    private initStatics;
    private getServiceEndpointsFromAppModule;
    private initAppModule;
    private initSystemAppModule;
}
