import {ControllerMeta} from '@controllers'

const routePaths: string[] = []

export class RequestsLogsRoutesRegistry {
    static addFromControllers(controllers: ControllerMeta[]): void {
       if(!controllers.length){
           return
       }
       controllers.forEach((controller: ControllerMeta) => {
           this.add(controller)
       })
    }

    static add(controller: ControllerMeta): void {
        if (!controller.endpoints?.length) {
            return
        }
        controller.endpoints.forEach(endpoint => {
            routePaths.push(endpoint.path)
        })
    }

    static getRoutePaths():string[]{
        return  routePaths
    }
}