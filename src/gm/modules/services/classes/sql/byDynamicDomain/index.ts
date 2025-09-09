import {
    GmModuleServiceClassAll,
    GmModuleServiceClassApiAll,
    GmModuleServiceClassApiCreate,
    GmModuleServiceClassApiDelete,
    GmModuleServiceClassApiGet,
    GmModuleServiceClassApiGetPagination,
    GmModuleServiceClassApiUpdate,
    GmModuleServiceClassBySqlDynamicDomain,
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
    domain: string
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


export class GmModuleServiceClassCrudBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassAll {

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
            this.allCallVarNames.create.domain,
        ).addAndInitMethod(
            new GmModuleServiceMethodUpdate(
                this.getConfig(),
                this.getModuleModel(),
                this.actionsLoggerService,
                this.allCallVarNames.update,
            ),
            this.allCallVarNames.update.domain,
        ).addAndInitMethod(
            new GmModuleServiceMethodDelete(
                this.getConfig(),
                this.getModuleModel(),
                this.actionsLoggerService,
                this.allCallVarNames.delete,
            ),
            this.allCallVarNames.delete.domain,
        ).addAndInitMethod(
            new GmModuleServiceMethodGetById(
                this.getConfig(),
                this.getModuleModel(),
                this.allCallVarNames.getById,
            ),
            this.allCallVarNames.getById.domain,
        ).addAndInitMethod(
            new GmModuleServiceMethodGetPagination(
                this.getConfig(),
                this.getModuleModel(),
                this.allCallVarNames.getPagination,
            ),
            this.allCallVarNames.getPagination.domain,
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

export class GmModuleServiceClassCreateBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassCreate {

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
                this.callVarNames.domain,
            )
        this.api = new GmModuleServiceClassApiCreate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassUpdateBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassUpdate {

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
                this.callVarNames.domain,
            )
        this.api = new GmModuleServiceClassApiUpdate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassDeleteBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassDelete {

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
                this.callVarNames.domain,
            )
        this.api = new GmModuleServiceClassApiDelete(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassGet {

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
            this.callVarNames.domain,
        )
        this.api = new GmModuleServiceClassApiGet(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetAllBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassGetAll {

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
            this.callVarNames.domain,
        )
        this.api = new GmModuleServiceClassApiGetPagination(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}