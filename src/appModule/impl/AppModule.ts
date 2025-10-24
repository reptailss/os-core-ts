import 'reflect-metadata'
import {IAppModule, SwaggerInfoAppModule} from '@appModule'
import {AppModuleDiContainer, IAppModuleDiContainer} from '@appModule/core'
import {DiFactory, DiLifetime, DiProviderRecord, DiToken} from '@di'
import {AppError} from '@appError'

type Provider<T = unknown> = {
    provider: DiToken<T>
    lifetime?: DiLifetime
    useClass?: any
    useValue?: any
    useFactory?: DiFactory
} | DiToken<T>

function isProviderObject<T>(value: Provider<T>): value is Exclude<Provider<T>, DiToken<T>> {
    
    if (typeof value !== 'object' || value === null) {
        return false
    }
    
    const provider = (value as any).provider
    
    if (
        provider === undefined ||
        (!['function', 'symbol', 'string'].includes(typeof provider))
    ) {
        return false
    }
    
    return !(!('useClass' in value) &&
        !('useValue' in value) &&
        !('useFactory' in value))
    
    
}



export class AppModule implements IAppModule {
    public controllers: {new(...props: any): any}[] = []
    public swaggerInfo?: SwaggerInfoAppModule
    
    public _diContainer: IAppModuleDiContainer | null = null
    
    constructor(props: {
        controllers: {new(...props: any): any}[],
        swaggerInfo?: {
            tag?: string
        },
        providers?: Provider[]
    }) {
        if (props.swaggerInfo) {
            this.swaggerInfo = props.swaggerInfo
        }
        this.controllers = props.controllers
        if (props.providers?.length) {
            props.providers.forEach(item => {
                if (isProviderObject(item)) {
                    if (!('useClass' in item) && !('useValue' in item) && !('useFactory' in item)) {
                        throw new AppError(
                            `Provider ${String(item.provider)} must define one of useClass/useValue/useFactory`,
                        )
                    }
                    this.overrideProvider(item.provider, {
                        lifetime:item.lifetime,
                        useClass:item.useClass,
                        useValue:item.useValue,
                        useFactory:item.useFactory,
                    })
                    return
                }
                this.overrideProvider(item)
            })
        }
    }
    
    
    public overrideProvider<T>(target: DiToken<T>, options: {
        lifetime?: DiLifetime
        useClass?: any
        useValue?: any
        useFactory?: DiFactory
    } = {}): this {
        if (!this._diContainer) {
            this._diContainer = new AppModuleDiContainer()
        }
        this._diContainer.register(target, options)
        return this
    }
    
    public getProviders(): Map<DiToken, DiProviderRecord> | null {
        if (!this._diContainer) {
            return null
        }
        return this._diContainer.providers
    }
    
}


