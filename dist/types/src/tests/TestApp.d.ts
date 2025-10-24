import { IAppModule } from "../appModule";
import { IApp } from "../app";
import { ITestApp } from "./core";
export declare class TestApp implements ITestApp {
    private readonly appModules;
    private controllers;
    useModule(appModule: IAppModule): this;
    useModulesFromApp(app: IApp): this;
    initModules(): this;
    private initAppModule;
}
