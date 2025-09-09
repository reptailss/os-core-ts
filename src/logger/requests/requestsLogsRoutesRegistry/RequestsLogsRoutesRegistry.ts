import {Controller} from '@controllers'

const routePaths: string[] = []

export class RequestsLogsRoutesRegistry {
    static addFromControllers(controllers: Controller[]): void {
       if(!controllers.length){
           return
       }
       controllers.forEach((controller: Controller) => {
           this.add(controller)
       })
    }

    static add(controller: Controller): void {
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