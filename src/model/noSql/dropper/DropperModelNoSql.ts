import {IModelNoSql, LoaderModelNoSql} from '@model'
import {DateHelper} from '@helpers'
import {appLogger} from '@logger'

export class DropperModelNoSql {
    
    static async drop(model: IModelNoSql<any>): Promise<number> {
        
        const documentsCount = await model.count()
        
        const config = model.getConfig()
        
        await model.dropCollection()
        
        if (documentsCount) {
            appLogger.info(`Success delete collection. Documents count:${documentsCount}, database name:${config.database}, collection name:${config.tableName}`)
        }
        
        LoaderModelNoSql.deleteModelFromCacheByDatabaseNameAndCollectionName({
            collectionName: config.tableName,
            databaseName: config.database,
        })
        
        return documentsCount
    }
    
    
    static async multiDropByYearMonthDateRange({
                                                   getModelCb,
                                                   dateStart,
                                                   dateEnd,
                                               }: {
        getModelCb: (props: {
            year: number
            month: number
        }) => Promise<IModelNoSql<any>>,
        dateStart: Date,
        dateEnd: Date
    }): Promise<{
        collectionsCount: number
        documentsCount: number
    }> {
        const intervals = DateHelper.generateDateIntervalsYearAndMonthByRange(dateStart, dateEnd)
        
        if (!intervals.length) {
            return {
                collectionsCount: 0,
                documentsCount: 0,
            }
        }
        let collectionsCount = 0
        let documentsCount = 0
        
        for (const interval of intervals) {
            try {
                const model = await getModelCb({
                    year: interval.year,
                    month: parseInt(interval.month),
                })
                const targetDocumentsCount = await this.drop(model)
                if (targetDocumentsCount > 0) {
                    collectionsCount++
                    documentsCount += targetDocumentsCount
                }
                
            } catch (error) {
                appLogger.error('error drop collection', error)
            }
        }
        return {
            collectionsCount,
            documentsCount,
        }
    }
}