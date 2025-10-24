import { IAppModule } from "../../appModule";
import { IApp } from "../../app";
export interface ITestApp {
    useModule(appModule: IAppModule): this;
    useModulesFromApp(app: IApp): this;
    initModules(): this;
}
