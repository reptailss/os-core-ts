export interface IGmModuleServiceApiAll extends IGmModuleServiceApiCreate,
    IGmModuleServiceApiUpdate,
    IGmModuleServiceApiDelete,
    IGmModuleServiceApiGet,
    IGmModuleServiceApiGetPagination {
}

export interface IGmModuleServiceApiCreate {
    create(): string
}

export interface IGmModuleServiceApiUpdate {
    update(): string
}

export interface IGmModuleServiceApiDelete {
    delete(): string
}

export interface IGmModuleServiceApiGet {
    getById(): string
}

export interface IGmModuleServiceApiGetPagination{
    getPagination(): string
}