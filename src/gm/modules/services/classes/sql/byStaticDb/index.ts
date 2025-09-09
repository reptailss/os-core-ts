import {
    GmModuleServiceClassAll,
    GmModuleServiceClassApiAll,
    GmModuleServiceClassApiCreate,
    GmModuleServiceClassApiDelete,
    GmModuleServiceClassApiGet,
    GmModuleServiceClassApiGetPagination,
    GmModuleServiceClassApiUpdate,
    GmModuleServiceClassBySqlStaticDb,
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


type AllCallVarNames = {
    create: CreateCallVarNames
    update: UpdateCallVarNames
    delete: DeleteCallVarNames
    getById: GetByIdCallVarNames
    getPagination: GetPaginationCallVarNames
}

type CreateCallVarNames = {
    initiatorOpenUserId: string
    createDto: string
}

type UpdateCallVarNames = {
    initiatorOpenUserId: string
    updateDto: string
    id: string
}

type DeleteCallVarNames = {
    initiatorOpenUserId: string
    id: string
}

type GetByIdCallVarNames = {
    id: string
}

type GetPaginationCallVarNames = {
    params: string
}

export class GmModuleServiceClassCrudBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassAll {

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
            .addMethod(
                new GmModuleServiceMethodCreate(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.allCallVarNames.create,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodUpdate(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.allCallVarNames.update,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodDelete(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.allCallVarNames.delete,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodGetById(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.allCallVarNames.getById,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodGetPagination(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.allCallVarNames.getPagination,
                ),
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

export class GmModuleServiceClassCreateBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassCreate {

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
            .addMethod(
                new GmModuleServiceMethodCreate(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
            )
        this.api = new GmModuleServiceClassApiCreate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassUpdateBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassUpdate {

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
            .addMethod(
                new GmModuleServiceMethodUpdate(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
            )
        this.api = new GmModuleServiceClassApiUpdate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassDeleteBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassDelete {

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
            .addMethod(
                new GmModuleServiceMethodDelete(
                    this.getConfig(),
                    this.getModuleModel(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
            )
        this.api = new GmModuleServiceClassApiDelete(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassGet {

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
        this.addMethod(
            new GmModuleServiceMethodGetById(
                this.getConfig(),
                this.getModuleModel(),
                this.callVarNames,
            ),
        )
        this.api = new GmModuleServiceClassApiGet(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetAllBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb implements GmModuleServiceClassGetAll {

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
        this.addMethod(
            new GmModuleServiceMethodGetPagination(
                this.getConfig(),
                this.getModuleModel(),
                this.callVarNames,
            ),
        )
        this.api = new GmModuleServiceClassApiGetPagination(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}