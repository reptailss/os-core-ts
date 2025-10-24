import 'reflect-metadata';
import { IAppModule, SwaggerInfoAppModule } from "..";
import { IAppModuleDiContainer } from "../core";
import { DiFactory, DiLifetime, DiProviderRecord, DiToken } from "../../di";
type Provider<T = unknown> = {
    provider: DiToken<T>;
    lifetime?: DiLifetime;
    useClass?: any;
    useValue?: any;
    useFactory?: DiFactory;
} | DiToken<T>;
export declare class AppModule implements IAppModule {
    controllers: {
        new (...props: any): any;
    }[];
    swaggerInfo?: SwaggerInfoAppModule;
    _diContainer: IAppModuleDiContainer | null;
    constructor(props: {
        controllers: {
            new (...props: any): any;
        }[];
        swaggerInfo?: {
            tag?: string;
        };
        providers?: Provider[];
    });
    overrideProvider<T>(target: DiToken<T>, options?: {
        lifetime?: DiLifetime;
        useClass?: any;
        useValue?: any;
        useFactory?: DiFactory;
    }): this;
    getProviders(): Map<DiToken, DiProviderRecord> | null;
}
export {};
