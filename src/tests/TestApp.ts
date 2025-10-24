import {IAppModule} from '@appModule'
import {DiContainer} from '@di'
import {ControllerMeta} from '@controllers'
import {IApp} from '@app'
import {ITestApp} from '@tests/core'

export class TestApp implements ITestApp{
    
    private readonly appModules: IAppModule[] = []
    private controllers: ControllerMeta[] = []
    
    public useModule(appModule: IAppModule): this {
        this.appModules.push(appModule)
        return this
    }
    
    public useModulesFromApp(app: IApp): this {
        //@ts-ignore
        const modules: IAppModule[] = app.appModules as IAppModule[]
        if (modules?.length) {
            modules.forEach((module: IAppModule) => {
                this.useModule(module)
            })
        }
        return this
    }
    
    public initModules(): this {
        for (const appModule of this.appModules) {
            this.initAppModule(appModule)
        }
        return this
    }
    
    private initAppModule(appModule: IAppModule): void {
        if (appModule.controllers.length) {
            appModule.controllers.forEach((Controller) => {
                const controller = DiContainer.resolve(Controller, appModule.getProviders())
                this.controllers.push(controller)
            })
        }
        
    }
}