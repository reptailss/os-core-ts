import { DiFactory, DiLifetime, DiProviderRecord, DiToken } from "../../di";
export interface IAppModuleDiContainer {
    providers: Map<DiToken, DiProviderRecord>;
    register<T>(target: DiToken<T>, options: {
        lifetime?: DiLifetime;
        useClass?: any;
        useValue?: any;
        useFactory?: DiFactory;
    }): this;
}
