import {DI_INJECT_KEY, DiFactory, DiLifetime, DiProviderRecord, DiToken} from '@di'
import 'reflect-metadata'
import {appLogger} from '@logger'


export class DiContainer {
    private static providers = new Map<DiToken, DiProviderRecord>()
    
    static resolve<T>(
        token: DiToken<T>,
        providers?: Map<DiToken, DiProviderRecord> | null,
        parentName?: string,
    ): T {
        if (providers) {
            const recordByProvider = providers.get(token)
            if (recordByProvider) {
                if (recordByProvider.useValue !== undefined) {
                    return recordByProvider.useValue
                }
                
                if (recordByProvider.useFactory) {
                    if (recordByProvider.lifetime === 'singleton') {
                        if (!recordByProvider.instance) {
                            recordByProvider.instance = recordByProvider.useFactory()
                        }
                        return recordByProvider.instance
                    } else {
                        return recordByProvider.useFactory()
                    }
                }
                
                const TargetClass = recordByProvider.useClass || recordByProvider.target
                
                if (recordByProvider.lifetime === 'singleton' && recordByProvider.instance) {
                    return recordByProvider.instance
                }
                const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', TargetClass) || []
                const injectTokens: any[] = Reflect.getMetadata(DI_INJECT_KEY, TargetClass) || []
                const dependencies = paramTypes.map((paramType, index) => {
                    const depToken = injectTokens[index] ?? paramType
                    return DiContainer.resolve(depToken, providers, TargetClass.name)
                })
                
                const instance = new TargetClass(...dependencies)
                
                if (recordByProvider.lifetime === 'singleton') {
                    recordByProvider.instance = instance
                }
                
                return instance
            }
        }
        
        
        const record = this.providers.get(token)
        if (!record) {
            if (parentName) {
                appLogger.error(`${parentName}: Token is not registered`)
            }
            
            throw new Error(`${parentName || ''} Token "${token.toString()}" is not registered.`)
        }
        
        if (record.useValue !== undefined) {
            return record.useValue
        }
        
        if (record.useFactory) {
            if (record.lifetime === 'singleton') {
                if (!record.instance) {
                    record.instance = record.useFactory()
                }
                return record.instance
            } else {
                return record.useFactory()
            }
        }
        
        const TargetClass = record.useClass || record.target
        
        if (record.lifetime === 'singleton' && record.instance) {
            return record.instance
        }
        const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', TargetClass) || []
        const injectTokens: any[] = Reflect.getMetadata(DI_INJECT_KEY, TargetClass) || []
        const dependencies = paramTypes.map((paramType, index) => {
            const depToken = injectTokens[index] ?? paramType
            return DiContainer.resolve(depToken, providers, TargetClass.name)
        })
        
        const instance = new TargetClass(...dependencies)
        
        if (record.lifetime === 'singleton') {
            record.instance = instance
        }
        
        return instance
    }
    
    static register<T>(target: DiToken<T>, options: {
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
    }
}