import { IAppModule, SwaggerInfoAppModule } from "..";
import { Controller } from "../../controllers";
export declare class AppModule implements IAppModule {
    controllers: Controller[];
    appModules: AppModule[];
    swaggerInfo?: SwaggerInfoAppModule;
    constructor(props: {
        appModules: AppModule[];
    });
    constructor(props: {
        controllers: {
            new (): any;
        }[];
        swaggerInfo?: {
            tag?: string;
        };
    });
}
