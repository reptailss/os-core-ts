import { GmModuleServiceClassAll, GmModuleServiceClassBySqlDynamicLeId, GmModuleServiceClassCreate, GmModuleServiceClassDelete, GmModuleServiceClassGet, GmModuleServiceClassGetAll, GmModuleServiceClassUpdate, IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiDelete, IGmModuleServiceApiGet, IGmModuleServiceApiGetPagination, IGmModuleServiceApiUpdate } from "../../../../../core";
import { GmConfig } from "../../../../..";
type BaseCallBarNames = {
    legalEntityId: string;
};
type AllCallVarNames = {
    create: CreateCallVarNames;
    update: UpdateCallVarNames;
    delete: DeleteCallVarNames;
    getById: GetByIdCallVarNames;
    getPagination: GetPaginationCallVarNames;
};
type CreateCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string;
    createDto: string;
};
type UpdateCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string;
    updateDto: string;
    id: string;
};
type DeleteCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string;
    id: string;
};
type GetByIdCallVarNames = BaseCallBarNames & {
    id: string;
};
type GetPaginationCallVarNames = BaseCallBarNames & {
    params: string;
};
export declare class GmModuleServiceClassCrudBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassAll {
    private readonly serviceVarName;
    private readonly allCallVarNames;
    api: IGmModuleServiceApiAll;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, allCallVarNames: AllCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassCreateBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassCreate {
    private serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiCreate;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: CreateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassUpdateBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassUpdate {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiUpdate;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: UpdateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassDeleteBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassDelete {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiDelete;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: DeleteCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassGet {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGet;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: GetByIdCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetAllBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassGetAll {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGetPagination;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: GetPaginationCallVarNames);
    init(): void;
}
export {};
