import { IAppModuleDiContainer } from "../core";
import 'reflect-metadata';
import { DiFactory, DiLifetime, DiProviderRecord, DiToken } from "../../di";
export declare class AppModuleDiContainer implements IAppModuleDiContainer {
    providers: Map<DiToken, DiProviderRecord>;
    register<T>(target: DiToken<T>, options?: {
        lifetime?: DiLifetime;
        useClass?: any;
        useValue?: any;
        useFactory?: DiFactory;
    }): this;
}
