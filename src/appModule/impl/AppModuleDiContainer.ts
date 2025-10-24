import {IAppModuleDiContainer} from '@appModule/core'
import 'reflect-metadata'
import {DiFactory, DiLifetime, DiProviderRecord, DiToken} from '@di'


export class AppModuleDiContainer implements IAppModuleDiContainer {
    public providers = new Map<DiToken, DiProviderRecord>()
    
    
    public register<T>(target: DiToken<T>, options: {
        lifetime?: DiLifetime
        useClass?: any
        useValue?: any
        useFactory?: DiFactory
    } = {}) {
        this.providers.set(target, {
            target,
            lifetime: options.lifetime ?? 'singleton',
            useClass: options.useClass,
            useValue: options.useValue,
            useFactory: options.useFactory,
        })
        return this
    }
}