import {
    IGmModuleClassMethod,
    IGmModuleServiceApiAll,
    IGmModuleServiceApiCreate,
    IGmModuleServiceApiDelete,
    IGmModuleServiceApiGet,
    IGmModuleServiceApiGetPagination,
    IGmModuleServiceApiUpdate,
} from '@gm/core'


export class GmModuleServiceClassApiAll implements IGmModuleServiceApiAll {

    constructor(
        private readonly serviceVarName: string,
        private readonly createMethod: IGmModuleClassMethod,
        private readonly updateMethod: IGmModuleClassMethod,
        private readonly deleteMethod: IGmModuleClassMethod,
        private readonly getByIdMethod: IGmModuleClassMethod,
        private readonly getAllMethod: IGmModuleClassMethod,
    ) {
        this.serviceVarName = serviceVarName
    }

    public create(): string {
        return `${this.serviceVarName}.${this.createMethod.renderMethodCall()}`
    }

    public update(): string {
        return `${this.serviceVarName}.${this.updateMethod.renderMethodCall()}`
    }

    public delete(): string {
        return `${this.serviceVarName}.${this.deleteMethod.renderMethodCall()}`
    }

    public getById(): string {
        return `${this.serviceVarName}.${this.getByIdMethod.renderMethodCall()}`
    }

    public getPagination(): string {
        return `${this.serviceVarName}.${this.getAllMethod.renderMethodCall()}`
    }
}

export class GmModuleServiceClassApiCreate implements IGmModuleServiceApiCreate {

    constructor(
        private readonly serviceVarName: string,
        private readonly method: IGmModuleClassMethod,
    ) {
        this.serviceVarName = serviceVarName
    }

    public create(): string {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`
    }
}


export class GmModuleServiceClassApiUpdate implements IGmModuleServiceApiUpdate {

    constructor(
        private readonly serviceVarName: string,
        private readonly method: IGmModuleClassMethod,
    ) {
        this.serviceVarName = serviceVarName
    }

    public update(): string {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`
    }
}


export class GmModuleServiceClassApiDelete implements IGmModuleServiceApiDelete {

    constructor(
        private readonly serviceVarName: string,
        private readonly method: IGmModuleClassMethod,
    ) {
        this.serviceVarName = serviceVarName
    }

    public delete(): string {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`
    }
}


export class GmModuleServiceClassApiGet implements IGmModuleServiceApiGet {

    constructor(
        private readonly serviceVarName: string,
        private readonly method: IGmModuleClassMethod,
    ) {
        this.serviceVarName = serviceVarName
    }

    public getById(): string {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`
    }
}


export class GmModuleServiceClassApiGetPagination implements IGmModuleServiceApiGetPagination {

    constructor(
        private readonly serviceVarName: string,
        private readonly method: IGmModuleClassMethod,
    ) {
        this.serviceVarName = serviceVarName
    }

    public getPagination(): string {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`
    }
}