import {DateHelper} from '@helpers'
import {appLogger} from '@logger'
import {NoSqlRepositoriesCashManager} from '@repository/core'

interface DropperRepository {
    dropCollection(): Promise<void>
    
    getConfig(): {
        database: string
        host: string
        port: string
        dbType: 'mongodb'
        tableName: string
    }
    
    count(props: {}): Promise<number>
}

export class DropperNoSqlRepository {
    
    static async drop(repository: DropperRepository): Promise<number> {
        
        const documentsCount = await repository.count({})
        
        const config = repository.getConfig()
        
        await repository.dropCollection()
        
        if (documentsCount) {
            appLogger.info(`Success delete collection. Documents count:${documentsCount}, database name:${config.database}, collection name:${config.tableName}`)
        }
        
        NoSqlRepositoriesCashManager.deleteRepositoryFromCacheByDatabaseNameAndCollectionName({
            collectionName: config.tableName,
            databaseName: config.database,
        })
        
        return documentsCount
    }
    
    
    static async multiDropByYearMonthDateRange({
                                                   loaderRepository,
                                                   dateStart,
                                                   dateEnd,
                                               }: {
        loaderRepository: {
            load: (
                month: number,
                year: number,
            ) => Promise<DropperRepository>
        }
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
                const repository = await loaderRepository.load.call(
                    loaderRepository,
                    parseInt(interval.month),
                    interval.year,
                )
                const targetDocumentsCount = await this.drop(repository)
                collectionsCount++
                if (targetDocumentsCount > 0) {
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