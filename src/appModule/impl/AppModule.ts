import {IAppModule, SwaggerInfoAppModule} from '@appModule'
import {Controller} from '@controllers'


export class AppModule implements IAppModule {
    public controllers: Controller[]
    public appModules: AppModule[] = []
    public swaggerInfo?: SwaggerInfoAppModule
    
    constructor(props: {appModules: AppModule[]})
    constructor(props: {
        controllers: {new(): any}[],
        swaggerInfo?: {
            tag?: string
        }
    })
    constructor(props: {
        controllers: {new(): any}[],
        swaggerInfo?: {
            tag?: string
        }
    } | {
        appModules: AppModule[]
    }) {
        if ('appModules' in props && props.appModules) {
            this.appModules = props.appModules
        }
        if ('swaggerInfo' in props && props.swaggerInfo) {
            this.swaggerInfo = props.swaggerInfo
        }
        const res: Controller[] = []
        if ('controllers' in props && props.controllers?.length >= 1) {
            props.controllers.forEach((Controller) => {
                const instance: Controller = new Controller()
                res.push(instance)
            })
        }
        this.controllers = res
    }
}


