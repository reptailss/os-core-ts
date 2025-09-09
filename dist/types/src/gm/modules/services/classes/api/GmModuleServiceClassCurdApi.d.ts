import { IGmModuleClassMethod, IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiDelete, IGmModuleServiceApiGet, IGmModuleServiceApiGetPagination, IGmModuleServiceApiUpdate } from "../../../../core";
export declare class GmModuleServiceClassApiAll implements IGmModuleServiceApiAll {
    private readonly serviceVarName;
    private readonly createMethod;
    private readonly updateMethod;
    private readonly deleteMethod;
    private readonly getByIdMethod;
    private readonly getAllMethod;
    constructor(serviceVarName: string, createMethod: IGmModuleClassMethod, updateMethod: IGmModuleClassMethod, deleteMethod: IGmModuleClassMethod, getByIdMethod: IGmModuleClassMethod, getAllMethod: IGmModuleClassMethod);
    create(): string;
    update(): string;
    delete(): string;
    getById(): string;
    getPagination(): string;
}
export declare class GmModuleServiceClassApiCreate implements IGmModuleServiceApiCreate {
    private readonly serviceVarName;
    private readonly method;
    constructor(serviceVarName: string, method: IGmModuleClassMethod);
    create(): string;
}
export declare class GmModuleServiceClassApiUpdate implements IGmModuleServiceApiUpdate {
    private readonly serviceVarName;
    private readonly method;
    constructor(serviceVarName: string, method: IGmModuleClassMethod);
    update(): string;
}
export declare class GmModuleServiceClassApiDelete implements IGmModuleServiceApiDelete {
    private readonly serviceVarName;
    private readonly method;
    constructor(serviceVarName: string, method: IGmModuleClassMethod);
    delete(): string;
}
export declare class GmModuleServiceClassApiGet implements IGmModuleServiceApiGet {
    private readonly serviceVarName;
    private readonly method;
    constructor(serviceVarName: string, method: IGmModuleClassMethod);
    getById(): string;
}
export declare class GmModuleServiceClassApiGetPagination implements IGmModuleServiceApiGetPagination {
    private readonly serviceVarName;
    private readonly method;
    constructor(serviceVarName: string, method: IGmModuleClassMethod);
    getPagination(): string;
}
