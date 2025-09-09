import {GmConfig} from '@gm'
import {
    GmGenerateAbstractCrudDec,
    GmModuleControllerClassCreateByNoSqlMonthAndYear,
    GmModuleControllerClassCrudByNoSqlMonthAndYear,
    GmModuleControllerClassGetAllByNoSqlMonthAndYear,
    IGmModuleClass,
} from '@gm/core'


export class GmGenerateCrudDecNoSql extends GmGenerateAbstractCrudDec {


    constructor(config: GmConfig) {

        const controllers: IGmModuleClass[] = []
        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new GmModuleControllerClassCreateByNoSqlMonthAndYear(config))
                    controllers.push(new GmModuleControllerClassGetAllByNoSqlMonthAndYear(config))
                    break
                }
            }
        } else {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new GmModuleControllerClassCrudByNoSqlMonthAndYear(config))
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
