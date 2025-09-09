import {
    GmModuleServiceClassAll,
    GmModuleServiceClassApiAll,
    GmModuleServiceClassApiCreate,
    GmModuleServiceClassApiDelete,
    GmModuleServiceClassApiGet,
    GmModuleServiceClassApiGetPagination,
    GmModuleServiceClassApiUpdate,
    GmModuleServiceClassBySqlDynamicLeId,
    GmModuleServiceClassCreate,
    GmModuleServiceClassDelete,
    GmModuleServiceClassGet,
    GmModuleServiceClassGetAll,
    GmModuleServiceClassUpdate,
    GmModuleServiceMethodCreate,
    GmModuleServiceMethodDelete,
    GmModuleServiceMethodGetById,
    GmModuleServiceMethodGetPagination,
    GmModuleServiceMethodUpdate,
    GmServiceActionsLoggerService,
    IGmModuleServiceApiAll,
    IGmModuleServiceApiCreate,
    IGmModuleServiceApiDelete,
    IGmModuleServiceApiGet,
    IGmModuleServiceApiGetPagination,
    IGmModuleServiceApiUpdate,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'

type BaseCallBarNames = {
    legalEntityId: string
}

type AllCallVarNames = {
    create: CreateCallVarNames
    update: UpdateCallVarNames
    delete: DeleteCallVarNames
    getById: GetByIdCallVarNames
    getPagination: GetPaginationCallVarNames
}

type CreateCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string
    createDto: string
}

type UpdateCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string
    updateDto: string
    id: string
}

type DeleteCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string
    id: string
}

type GetByIdCallVarNames = BaseCallBarNames & {
    id: string
}

type GetPaginationCallVarNames = BaseCallBarNames & {
    params: string
}


export class GmModuleServiceClassCrudBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassAll {

    public api!: IGmModuleServiceApiAll
    private readonly actionsLoggerService: GmServiceActionsLoggerService

    constructor(
        config: GmConfig,
        private readonly serviceVarName: string,
        private readonly allCallVarNames: AllCallVarNames,
    ) {
        super(
            config,
            `${StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
    }


    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
        this.addAndInitMethod(
            new GmModuleServiceMethodCreate(
                this.getConfig(),
                this.getModuleModel(),
                this.actionsLoggerService,
                this.allCallVarNames.create,
            ),
            this.allCallVarNames.create.legalEntityId,
        ).addAndInitMethod(
            new GmModuleServiceMethodUpdate(
                this.getConfig(),
                this.getModuleModel(),
                this.actionsLoggerService,
                this.allCallVarNames.update,
            ),
            this.allCallVarNames.update.legalEntityId,
        ).addAndInitMethod(
            new GmModuleServiceMethodDelete(
                this.getConfig(),
                this.getModuleModel(),
                this.actionsLoggerService,
                this.allCallVarNames.delete,
            ),
            this.allCallVarNames.delete.legalEntityId,
        ).addAndInitMethod(
            new GmModuleServiceMethodGetById(
                this.getConfig(),
                this.getModuleModel(),
                this.allCallVarNames.getById,
            ),
            this.allCallVarNames.getById.legalEntityId,
        ).addAndInitMethod(
            new GmModuleServiceMethodGetPagination(
                this.getConfig(),
                this.getModuleModel(),
                this.allCallVarNames.getPagination,
            ),
            this.allCallVarNames.getPagination.legalEntityId,
        )

        this.api = new GmModuleServiceClassApiAll(
            this.serviceVarName,
            this.getMethodByIndex(0),
            this.getMethodByIndex(1),
            this.getMethodByIndex(2),
            this.getMethodByIndex(3),
            this.getMethodByIndex(4),
        )
    }
}

export class GmModuleServiceClassCreateBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassCreate {

    public api!: IGmModuleServiceApiCreate
    private readonly actionsLoggerService: GmServiceActionsLoggerService

    constructor(
        config: GmConfig,
        private serviceVarName: string,
        private readonly callVarNames: CreateCallVarNames,
    ) {
        super(
            config,
            `Create${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
    }

    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(
                new GmModuleServiceMethodCreate(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
                this.callVarNames.legalEntityId,
            )

        this.api = new GmModuleServiceClassApiCreate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassUpdateBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassUpdate {

    public api!: IGmModuleServiceApiUpdate
    private readonly actionsLoggerService: GmServiceActionsLoggerService

    constructor(
        config: GmConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: UpdateCallVarNames,
    ) {
        super(
            config,
            `Update${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
    }

    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(
                new GmModuleServiceMethodUpdate(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
                this.callVarNames.legalEntityId,
            )


        this.api = new GmModuleServiceClassApiUpdate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassDeleteBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassDelete {

    public api!: IGmModuleServiceApiDelete
    private readonly actionsLoggerService: GmServiceActionsLoggerService

    constructor(
        config: GmConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: DeleteCallVarNames,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()

    }

    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(
                new GmModuleServiceMethodDelete(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
                this.callVarNames.legalEntityId,
            )
        this.api = new GmModuleServiceClassApiDelete(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassGet {

    public api!: IGmModuleServiceApiGet

    constructor(
        config: GmConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: GetByIdCallVarNames,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )


    }

    public init() {
        super.init()
        this.addAndInitMethod(
            new GmModuleServiceMethodGetById(
                this.getConfig(),
                this.getModuleModel(),
                this.callVarNames,
            ),
            this.callVarNames.legalEntityId,
        )
        this.api = new GmModuleServiceClassApiGet(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetAllBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId implements GmModuleServiceClassGetAll {

    public api!: IGmModuleServiceApiGetPagination

    constructor(
        config: GmConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: GetPaginationCallVarNames,
    ) {
        super(
            config,
            `GetAll${StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`,
        )
    }

    public init() {
        super.init()
        this.addAndInitMethod(
            new GmModuleServiceMethodGetPagination(
                this.getConfig(),
                this.getModuleModel(),
                this.callVarNames,
            ),
            this.callVarNames.legalEntityId,
        )
        this.api = new GmModuleServiceClassApiGetPagination(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}