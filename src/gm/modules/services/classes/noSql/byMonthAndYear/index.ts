import {
    GmModuleServiceClassAll,
    GmModuleServiceClassApiAll,
    GmModuleServiceClassApiCreate,
    GmModuleServiceClassApiGetPagination,
    GmModuleServiceClassByNoSqlMonthAndYear,
    GmModuleServiceClassCreate,
    GmModuleServiceClassGetAll,
    GmModuleServiceMethodCreate,
    GmModuleServiceMethodGetPaginationNoSql,
    GmServiceActionsLoggerService,
    IGmModuleServiceApiAll,
    IGmModuleServiceApiCreate,
    IGmModuleServiceApiGetPagination,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


type AllCallVarNames = {
    create: CreateCallVarNames
    getPagination: GetPaginationCallVarNames
}

type CreateCallVarNames = {
    initiatorOpenUserId: string
    createDto: string
    month: string
    year: string
}

type GetPaginationCallVarNames = {
    params: string
    dateStart: string
    dateEnd: string
}

export class GmModuleServiceClassCrudByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassAll {

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
            this.allCallVarNames.create.month,
            this.allCallVarNames.create.year,
        )
        this.addMethod(new GmModuleServiceMethodGetPaginationNoSql(
            this.getConfig(),
            this.getModuleModel(),
            this.allCallVarNames.getPagination,
        ))

        this.api = new GmModuleServiceClassApiAll(
            this.serviceVarName,
            this.getMethodByIndex(0),
            this.getMethodByIndex(1),
            this.getMethodByIndex(1),
            this.getMethodByIndex(1),
            this.getMethodByIndex(1),
        )
    }
}

export class GmModuleServiceClassCreateByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassCreate {

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
                this.callVarNames.month,
                this.callVarNames.year,
            )

        this.api = new GmModuleServiceClassApiCreate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}


export class GmModuleServiceClassGetAllByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassGetAll {

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
        this.addMethod(new GmModuleServiceMethodGetPaginationNoSql(
            this.getConfig(),
            this.getModuleModel(),
            this.callVarNames,
        ))

        this.api = new GmModuleServiceClassApiGetPagination(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}