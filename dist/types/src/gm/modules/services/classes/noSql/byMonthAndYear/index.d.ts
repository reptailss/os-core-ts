import { GmModuleServiceClassAll, GmModuleServiceClassByNoSqlMonthAndYear, GmModuleServiceClassCreate, GmModuleServiceClassGetAll, IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiGetPagination } from "../../../../../core";
import { GmConfig } from "../../../../..";
type AllCallVarNames = {
    create: CreateCallVarNames;
    getPagination: GetPaginationCallVarNames;
};
type CreateCallVarNames = {
    initiatorOpenUserId: string;
    createDto: string;
    month: string;
    year: string;
};
type GetPaginationCallVarNames = {
    params: string;
    dateStart: string;
    dateEnd: string;
};
export declare class GmModuleServiceClassCrudByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassAll {
    private readonly serviceVarName;
    private readonly allCallVarNames;
    api: IGmModuleServiceApiAll;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, allCallVarNames: AllCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassCreateByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassCreate {
    private serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiCreate;
    private readonly actionsLoggerService;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: CreateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetAllByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassGetAll {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGetPagination;
    constructor(config: GmConfig, serviceVarName: string, callVarNames: GetPaginationCallVarNames);
    init(): void;
}
export {};
