import { GmModuleServiceClassAll, GmModuleServiceClassBySqlStaticDb, GmModuleServiceClassCreate, GmModuleServiceClassDelete, GmModuleServiceClassGet, GmModuleServiceClassGetAll, GmModuleServiceClassUpdate, IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiDelete, IGmModuleServiceApiGet, IGmModuleServiceApiGetPagination, IGmModuleServiceApiUpdate } from "../../../../../core";
import { GmConfig } from "../../../../..";
type AllCallVarNames = {
    create: CreateCallVarNames;
    update: UpdateCallVarNames;
    delete: DeleteCallVarNames;
    getById: GetByIdCallVarNames;
    getPagination: GetPaginationCallVarNames;
};
type CreateCallVarNames = {
    initiatorOpenUserId: string;
    createDto: string;
};
type UpdateCallVarNames = {
    initiatorOpenUserId: string;
    updateDto: string;
    id: string;
};
type DeleteCallVarNames = {
    initiatorOpenUserId: string;
    id: string;
};
type GetByIdCallVarNames = {
    id: string;
};
type GetPaginationCallVarNames = {
    params: string;
};
export declare class GmModuleServiceClassCrudBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassAll {
    private readonly serviceVarName;
    private readonly allCallVarNames;
    api: IGmModuleServiceApiAll;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, allCallVarNames: AllCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassCreateBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassCreate {
    private serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiCreate;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: CreateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassUpdateBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassUpdate {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiUpdate;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: UpdateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassDeleteBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassDelete {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiDelete;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: DeleteCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassGet {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGet;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: GetByIdCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetAllBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassGetAll {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGetPagination;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: GetPaginationCallVarNames);
    init(): void;
}
export {};
