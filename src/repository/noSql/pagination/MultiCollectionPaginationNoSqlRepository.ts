import {PaginationQueryParams, PaginationValues} from '@pagination'
import {appLogger} from '@logger'
import {NoSqlRow, WhereNoSql} from '@repository/core'
import {Entity, EntityClass} from '@entity'
import {DateHelper} from '@helpers'
import {OrderParams, WhereParams} from '@params'
import {AppError} from '@appError'

function getCollectionNamesPaginationByDateRangeNoSql({
                                                          dateStart,
                                                          dateEnd,
                                                      }: {
    dateStart: string | Date,
    dateEnd: string | Date
}): string[] {
    return DateHelper.generateDateIntervalsYearAndMonthByRange(dateStart, dateEnd).map((item) => {
        return `${item.year}||${item.month}`
    })
}

function getYearAndMothByCollectionName(collectionName: string): {
    year: number,
    month: number
} {
    const arr = collectionName?.split('||')
    if (arr.length < 2) {
        return {
            year: 0,
            month: 0,
        }
    }
    
    return {
        year: Number(arr[0]),
        month: Number(arr[1]),
    }
}


function checkReverseCollection<Row extends object>({
                                                        order,
                                                        dateFilterKey,
                                                    }: {
    order?: OrderParams<Row>
    dateFilterKey: keyof Row | null | string
}) {
    if (
        !dateFilterKey ||
        !order ||
        !(dateFilterKey in order)
    ) {
        return false
    }
    //@ts-ignore
    return order[dateFilterKey] === 'DESC'
}

interface PaginationNoSqlRepository<ClassEntity extends object> {
    findAll<
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    >(
        findOptions: {
            where?: WhereNoSql<ClassEntity>
            clientWhere?: WhereParams<Entity<ClassEntity>>
            order?: OrderParams<Entity<ClassEntity>>
            offset?: number
            limit?: number
            attributes?: ReturnAttributes
        },
    ): Promise<
        NoSqlRow<
            ClassEntity,
            ReturnAttributes
        >[]
    >
    
    count(
        findOptions: {
            where?: WhereNoSql<ClassEntity>
            clientWhere?: WhereParams<Entity<ClassEntity>>
        },
    ): Promise<number>
    
    
}

export class MultiCollectionPaginationNoSqlRepository {
    
    static async byYearAndMoth<
        ClassEntity extends object,
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    >({
          dateStart,
          dateEnd,
          loaderRepository,
          params,
          where,
          attributes,
          dateKey,
      }: {
        dateStart: Date
        dateEnd: Date
        loaderRepository: {
            entity: ClassEntity,
            load: (
                month: number,
                year: number,
            ) => Promise<PaginationNoSqlRepository<ClassEntity>>
        }
        params: PaginationQueryParams<Entity<ClassEntity>>
        where?: WhereNoSql<ClassEntity>
        attributes?: ReturnAttributes
        dateKey?: keyof ClassEntity
      
    }): Promise<
        PaginationValues<NoSqlRow<ClassEntity, ReturnAttributes>>
    > {
        const entityInstance: EntityClass = loaderRepository.entity as EntityClass
        const collections = getCollectionNamesPaginationByDateRangeNoSql({
            dateStart,
            dateEnd,
        })
        const dateFilterKey = dateKey || entityInstance._dateAdd || entityInstance._dateUpdate || null
        
        
        const collectionNames = checkReverseCollection({
            order: params?.order,
            dateFilterKey,
        }) ? collections.reverse() : collections
        
        const targetWhere: WhereNoSql<ClassEntity> = where ? {
            ...where
        } : {}
        
        if (dateFilterKey) {
            targetWhere[dateFilterKey as keyof ClassEntity] = {
                $gte: new Date(dateStart),
                $lte: new Date(dateEnd)
            } as WhereNoSql<ClassEntity>[keyof ClassEntity]
        }
        
        if (!collectionNames?.length) {
            return {
                page: 1,
                all_pages: 1,
                per_page: 0,
                all_rows: 0,
                rows: [],
            }
        }
        if (params.per_page === 0) {
            let found: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
            try {
                const page = params.page || 1
                const rows: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
                
                for (const collectionName of collectionNames) {
                    const {
                        month,
                        year,
                    } = getYearAndMothByCollectionName(collectionName)
                    
                    const repository = await loaderRepository.load.call(
                        loaderRepository,
                        month,
                        year,
                    )
                    found = await repository.findAll({
                        clientWhere: params.where,
                        where: targetWhere,
                        order: params.order,
                        attributes,
                    })
                    if (!found?.length) {
                        continue
                    }
                    for (let i = 0; i < found.length; i++) {
                        rows.push(found[i])
                    }
                    found = []
                }
                return {
                    page,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: rows.length,
                    rows: rows,
                }
            } catch (error) {
                appLogger.error('os-core:Error mongoose pagination', error)
                throw new AppError('os-core:Error mongoose pagination')
            }
        }
        
        
        const page = params.page || 1
        const perPage = params.per_page || 10
        
        let skipCount = (page - 1) * perPage
        let countAllRows = 0
        let totalRowsInPage = perPage
        let found: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
        const rows: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
        try {
            for (const collectionName of collectionNames) {
                const {
                    month,
                    year,
                } = getYearAndMothByCollectionName(collectionName)
                
                const repository = await loaderRepository.load.call(
                    loaderRepository,
                    month,
                    year,
                )
                
                if (skipCount > 0) {
                    const count = await repository.count({
                        clientWhere: params.where,
                        where: targetWhere,
                    })
                    if (!count) {
                        continue
                    }
                    countAllRows += count
                    if (count >= skipCount) {
                        found = await repository.findAll({
                            clientWhere: params.where,
                            where: targetWhere,
                            offset: skipCount,
                            limit: totalRowsInPage,
                            order: params.order,
                            attributes,
                        })
                        skipCount -= Math.min(skipCount, found?.length || 0)
                        if (found?.length) {
                            totalRowsInPage -= found.length
                            for (let i = 0; i < found.length; i++) {
                                rows.push(found[i])
                            }
                            found = []
                        }
                        continue
                    }
                    skipCount -= count
                    continue
                }
                
                if (!totalRowsInPage) {
                    const count = await repository.count({
                        clientWhere: params.where,
                        where: targetWhere,
                    })
                    countAllRows += count
                    continue
                }
                const count = await repository.count({
                    clientWhere: params.where,
                    where: targetWhere,
                })
                countAllRows += count
                found = await repository.findAll({
                    clientWhere: params.where,
                    where: targetWhere,
                    limit: totalRowsInPage,
                    order: params.order,
                    attributes,
                })
                if (found?.length) {
                    totalRowsInPage -= found.length
                    for (let i = 0; i < found.length; i++) {
                        rows.push(found[i])
                    }
                    found = []
                }
            }
            return {
                page,
                all_pages: Math.ceil(countAllRows / Number(perPage)),
                per_page: perPage,
                all_rows: countAllRows,
                rows: rows,
                
            }
        } catch (error) {
            appLogger.error('os-core:Error mongoose pagination', error)
            throw new AppError('os-core:Error mongoose pagination')
        }
    }
    
    
    static async byCollectionNames<
        ClassEntity extends object,
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    >({
          loaderRepository,
          params,
          collectionNames,
          where,
          attributes,
      }: {
        loaderRepository: {
            load: (
                collectionName: string,
            ) => Promise<PaginationNoSqlRepository<ClassEntity>>
        }
        params: PaginationQueryParams<Entity<ClassEntity>>
        where?: WhereNoSql<ClassEntity>
        attributes?: ReturnAttributes
        collectionNames: string[]
    }): Promise<
        PaginationValues<NoSqlRow<ClassEntity, ReturnAttributes>>
    > {
        if (!collectionNames?.length) {
            return {
                page: 1,
                all_pages: 1,
                per_page: 0,
                all_rows: 0,
                rows: [],
            }
        }
        if (params.per_page === 0) {
            let found: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
            try {
                const page = params.page || 1
                const rows: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
                
                for (const collectionName of collectionNames) {
                    const repository = await loaderRepository.load.call(loaderRepository, collectionName)
                    found = await repository.findAll({
                        clientWhere: params.where,
                        where,
                        order: params.order,
                        attributes,
                    })
                    if (!found?.length) {
                        continue
                    }
                    for (let i = 0; i < found.length; i++) {
                        rows.push(found[i])
                    }
                    found = []
                }
                return {
                    page,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: rows.length,
                    rows: rows,
                }
            } catch (error) {
                appLogger.error('os-core:Error mongoose pagination', error)
                throw new AppError('os-core:Error mongoose pagination')
            }
        }
        
        
        const page = params.page || 1
        const perPage = params.per_page || 10
        
        let skipCount = (page - 1) * perPage
        let countAllRows = 0
        let totalRowsInPage = perPage
        let found: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
        const rows: NoSqlRow<ClassEntity, ReturnAttributes>[] = []
        try {
            for (const collectionName of collectionNames) {
                const repository = await loaderRepository.load.call(loaderRepository, collectionName)
                
                if (skipCount > 0) {
                    const count = await repository.count({
                        clientWhere: params.where,
                        where,
                    })
                    if (!count) {
                        continue
                    }
                    countAllRows += count
                    if (count >= skipCount) {
                        found = await repository.findAll({
                            clientWhere: params.where,
                            where,
                            offset: skipCount,
                            limit: totalRowsInPage,
                            order: params.order,
                            attributes,
                        })
                        skipCount -= Math.min(skipCount, found?.length || 0)
                        if (found?.length) {
                            totalRowsInPage -= found.length
                            for (let i = 0; i < found.length; i++) {
                                rows.push(found[i])
                            }
                            found = []
                        }
                        continue
                    }
                    skipCount -= count
                    continue
                }
                
                if (!totalRowsInPage) {
                    const count = await repository.count({
                        clientWhere: params.where,
                        where,
                    })
                    countAllRows += count
                    continue
                }
                const count = await repository.count({
                    clientWhere: params.where,
                    where,
                })
                countAllRows += count
                found = await repository.findAll({
                    clientWhere: params.where,
                    where,
                    limit: totalRowsInPage,
                    order: params.order,
                    attributes,
                })
                if (found?.length) {
                    totalRowsInPage -= found.length
                    for (let i = 0; i < found.length; i++) {
                        rows.push(found[i])
                    }
                    found = []
                }
            }
            return {
                page,
                all_pages: Math.ceil(countAllRows / Number(perPage)),
                per_page: perPage,
                all_rows: countAllRows,
                rows: rows,
                
            }
        } catch (error) {
            appLogger.error('os-core:Error mongoose pagination', error)
            throw new AppError('os-core:Error mongoose pagination')
        }
    }
}
