import {StepBlock} from '@docBlocks/impl/StepBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {validatorDocModule} from '@appDocs/modules/validator'
import {appErrorDocModule} from '@appDocs/modules/appError'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'

export const PATHS_DOCS_MODULES = {
    env: {
        path: 'env',
        sections: {
            requiredFields: 'requiredFields',
            optionalFields: 'optionalFields',
            apiUrls: 'apiUrls',
        },
    },
    appConfig: {
        path: 'appConfig',
        sections: {
            OsCoreAppConfig: 'osCoreAppConfig',
        },
    },
    access: {
        path: 'access',
        sections: {
            DashboardAccessService: 'dashboardAccessService',
            StructureAccessService: 'structureAccessService',
            PtpAdminChecker: 'ptpAdminChecker',
        },
    },
    appError: {
        path: 'appError',
        sections: {
            AppError: 'appError',
            AppErrorHelper: 'appErrorHelper',
            AppErrorKey: 'appErrorKey',
            ErrorValue: 'errorValue',
        },
    },
    appModule: {
        path: 'appModule',
        sections: {
            AppModule: 'appModule',
        },
    },
    appResponse: {
        path: 'appResponse',
        sections: {
            AppResponse: 'appResponse',
        },
    },
    auth: {
        path: 'auth',
        sections: {
            AuthService: 'authService',
            UserInfo: 'userInfo',
            FullUserInfo: 'fullUserInfo',
            PtpCoreUserInfo: 'ptpCoreUserInfo',
            PtpClientUserInfo: 'ptpClientUserInfo',
        },
    },
    clientPackages: {
        path: 'clientPackages',
        sections: {
            ClientPackagesHtmlBuilder: 'clientPackagesHtmlBuilder',
        },
    },
    cron: {
        path: 'cron',
        sections: {
            CronJob: 'cronJob',
        },
    },
    dbSql: {
        path: 'dbSql',
        sections: {
            DbConnectionSqlFactory: 'dbConnectionSqlFactory',
            SqlMigrations: 'sqlMigrations',
        },
    },
    dbNoSql: {
        path: 'dbNoSql',
        sections: {
            DbConnectionNoSqlFactory: 'dbConnectionNoSqlFactory',
        },
    },
    controllerDecorators: {
        path: 'controllerDecorators',
        sections: {
            Controller: 'controllerDec',
            apiMethods: 'apiMethods',
            AuthDec: 'authDec',
            PtpClientAuthDec: 'PtpClientAuthDec',
            SystemAuthDec: 'systemAuthDec',
            DashboardAccessDec: 'dashboardAccessDec',
            
            BodyDec: 'bodyDec',
            FormDataDec: 'formDataDec',
            ParamDec: 'paramDec',
            ParamNumDec: 'paramNumDec',
            QueryParamDec: 'queryParamDec',
            QueryParamNumDec: 'queryParamNumDec',
            QueryParamDateDec: 'queryParamDateDec',
            HeaderDec: 'headerDec',
            HeadersDec: 'headersDec',
            
            
            AppFileDec: 'appFileDec',
       
            
            ImportStructureServiceEndpointDec: 'importStructureServiceEndpointDec',
            ResponseDec: 'responseDec',
            SetHeaderDec: 'setHeaderDec',
            
            LegalEntityIdByDomainDec: 'legalEntityIdByDomainDec',
            DomainDec: 'domainDec',
        
        },
    },
    domain: {
        path: 'domain',
        sections: {
            DomainService: 'domainService',
        },
    },
    files: {
        path: 'files',
        sections: {
            FileHelper: 'fileHelper',
            FileService: 'fileService',
            AppFile: 'appFile',
        },
    },
   
    helpers: {
        path: 'helpers',
        sections: {
            DateHelper: 'dateHelper',
            HashHelper: 'hashHelper',
            RequestHelper: 'requestHelper',
            SystemRequestHelper: 'systemRequestHelper',
            SlugHelper: 'slugHelper',
            StringCaseHelper: 'stringCaseHelper',
            SystemEndpointsHelper: 'systemEndpointsHelper',
            StructureServiceEndpointsHelper: 'structureServiceEndpointsHelper',
        },
    },
    logger: {
        path: 'logger',
        sections: {
            appLogger: 'appLogger',
            ActionsLoggerService: 'actionsLoggerService',
        },
    },
    modelSql: {
        path: 'modelSql',
        sections: {
            SqlAggregate: 'sqlAggregate',
            ModelSqlColumns: 'modelSqlColumns',
            SqlFilters: 'sqlFilters',
            SqlIndexes: 'sqlIndexes',
            SqlAssociation: 'sqlAssociation',
            IModelSql: 'iModelSql',
            'modelSql.create': 'modelSql-create',
            'modelSql.update': 'modelSql-update',
            'modelSql.updateMany': 'modelSql-updateMany',
            'modelSql.destroy': 'modelSql-destroy',
            'modelSql.count': 'modelSql-count',
            'modelSql.findAll': 'modelSql-findAll',
            'modelSql.findOne': 'modelSql-findOne',
            'modelSql.findByPk': 'modelSql-findByPk',
            'modelSql.pagination': 'modelSql-pagination',
            'modelSql.getConfig': 'modelSql-getConfig',
            LoaderModelSql: 'loaderModelSql',
            ModelSqlDynamicRegistry: 'modelSqlDynamicRegistry',
            SqlAggregateBuilder: 'sqlAggregateBuilder',
            SqlAssociationsBuilder: 'sqlAssociationsBuilder',
            ISqlMigrationTaskFactory: 'iSqlMigrationTaskFactory',
        },
    },
    modelNoSql: {
        path: 'modelNoSql',
        sections: {
            ModelNoSqlColumns: 'modelNoSqlColumns',
            NoSqlFilters: 'noSqlFilters',
            NoSqlIndexes: 'noSqlIndexes',
            IModelNoSql: 'iModelNoSql',
            'modelNo.create': 'modelNo-create',
            'modelNo.createMany': 'modelNo-createMany',
            'modelNo.update': 'modelNo-update',
            'modelNo.destroy': 'modelNo-destroy',
            'modelNo.destroyMany': 'modelNo-destroyMany',
            'modelNo.count': 'modelNo-count',
            'modelNo.findAll': 'modelNo-findAll',
            'modelNo.findOne': 'modelNo-findOne',
            'modelNo.findByPk': 'modelNo-findByPk',
            'modelNo.getConfig': 'modelNo-getConfig',
            LoaderModelNoSql: 'loaderModelNoSql',
            PaginationNoSql: 'paginationNoSql',
        },
    },
    pagination: {
        path: 'pagination',
        sections: {
            PaginationValues: 'paginationValues',
            PaginationQueryParams: 'paginationQueryParams',
        },
    },
    params: {
        path: 'params',
        sections: {
            OrderParams: 'orderParams',
            WhereParams: 'whereParams',
            WhereOperatorsHelper: 'whereOperatorsHelper',
        },
    },
    redis: {
        path: 'redis',
        sections: {
            StaticRedis: 'staticRedis',
            DynamicRedis: 'dynamicRedis',
        },
    },
    responseFormat: {
        path: 'responseFormat',
        sections: {
            BuildResponseFormat: 'buildResponseFormat',
        },
    },
    validator: {
        path: 'validator',
        sections: {
            Validator: 'validator',
            SchemaValidator: 'schemaValidator',
            ObjectSchemaValidator: 'objectSchemaValidator',
            PaginationQueryParamsValidator: 'paginationQueryParamsValidator',
            'validator.string': 'validator-string',
            'validator.number': 'validator-number',
            'validator.date': 'validator-date',
            'validator.boolean': 'validator-boolean',
            'validator.booleanNum': 'validator-booleanNum',
            'validator.enum': 'validator-enum',
            'validator.array': 'validator-array',
            'validator.record': 'validator-record',
            'validator.unknown': 'validator-unknown',
            'validator.object': 'validator-object',
            'validator.literal': 'validator-literal',
        },
    },
    app: {
        path: 'app',
        sections: {
            App: 'app',
            'app.useModule': 'app-useModule',
            'app.useCors': 'app-useCors',
            'app.useHealth': 'app-useHealth',
            'app.useDashboard': 'app-useDashboard',
            'app.useSwagger': 'app-useSwagger',
            'app.useRequestLogger': 'app-useRequestLogger',
            'app.useConsoleLogger': 'app-useConsoleLogger',
            'app.useImportStructureServiceEndpoints': 'app-useImportStructureServiceEndpoints',
            'app.initModules': 'app-initModules',
            'app.listen': 'app-listen',
        },
    },
    swagger: {
        path: 'swagger',
        sections: {
            SwaggerConfig: 'swaggerConfig',
        },
    },
    commands: {
        path: 'commands',
        sections: {
            'g-swagger': 'g-swagger',
            'g-crud': 'g-crud',
        },
    },
    gm: {
        path: 'gm',
        sections: {
            GmConfig: 'gmConfig',
        },
    },
}

