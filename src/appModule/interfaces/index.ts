import {Controller} from '@controllers'


export interface IAppModule {
    controllers: Controller[]
    appModules: IAppModule[]
    swaggerInfo?: SwaggerInfoAppModule
}

export type SwaggerInfoAppModule = {
    tag?: string
}

