import {
    GmGenerateAbstractCrudDec,
    GmModuleControllerClassCreateBySqlDynamicDomain,
    GmModuleControllerClassCreateBySqlDynamicLeId,
    GmModuleControllerClassCreateBySqlStaticDb,
    GmModuleControllerClassCrudBySqlDynamicDomain,
    GmModuleControllerClassCrudBySqlDynamicLeId,
    GmModuleControllerClassCrudBySqlStaticDb,
    GmModuleControllerClassDeleteBySqlDynamicDomain, GmModuleControllerClassDeleteBySqlDynamicLeId,
    GmModuleControllerClassDeleteBySqlStaticDb,
    GmModuleControllerClassGetAllBySqlDynamicDomain, GmModuleControllerClassGetAllBySqlDynamicLeId,
    GmModuleControllerClassGetAllBySqlStaticDb,
    GmModuleControllerClassGetBySqlDynamicDomain, GmModuleControllerClassGetBySqlDynamicLeId,
    GmModuleControllerClassGetBySqlStaticDb,
    GmModuleControllerClassUpdateBySqlDynamicDomain, GmModuleControllerClassUpdateBySqlDynamicLeId,
    GmModuleControllerClassUpdateBySqlStaticDb,
    IGmModuleClass,
} from '@gm/core'
import {GmConfig} from '@gm'


export class GmGenerateCrudDecSql extends GmGenerateAbstractCrudDec {

    constructor(config: GmConfig) {

        const controllers: IGmModuleClass[] = []

        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new GmModuleControllerClassCreateBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassUpdateBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassDeleteBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassGetBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassGetAllBySqlStaticDb(config))
                    break
                }
                case 'dynamicByDomain': {
                    controllers.push(new GmModuleControllerClassCreateBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassUpdateBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassDeleteBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassGetBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassGetAllBySqlDynamicDomain(config))
                    break
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new GmModuleControllerClassCreateBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassUpdateBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassDeleteBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassGetBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassGetAllBySqlDynamicLeId(config))
                    break
                }
            }

        } else {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new GmModuleControllerClassCrudBySqlStaticDb(config))
                    break
                }
                case 'dynamicByDomain': {
                    controllers.push(new GmModuleControllerClassCrudBySqlDynamicDomain(config))
                    break
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new GmModuleControllerClassCrudBySqlDynamicLeId(config))
                    break
                }
            }
        }

        super(
            config,
            controllers,
        )
    }
}
