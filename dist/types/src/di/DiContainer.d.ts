import { DiFactory, DiLifetime, DiProviderRecord, DiToken } from "./";
import 'reflect-metadata';
export declare class DiContainer {
    private static providers;
    static resolve<T>(token: DiToken<T>, providers?: Map<DiToken, DiProviderRecord> | null, parentName?: string): T;
    static register<T>(target: DiToken<T>, options?: {
        lifetime?: DiLifetime;
        useClass?: any;
        useValue?: any;
        useFactory?: DiFactory;
    }): void;
}
