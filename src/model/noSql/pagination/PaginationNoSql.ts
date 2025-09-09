import {
    GetModelCbPaginationNoSql,
    ModelNoSqlHelper,
    NoSqlFilters,
    NoSqlPaginationSettings,
    PaginationNoSqlProps,
    RowWithBaseFieldsAndAttributesModelNoSql,
    RowWithBaseFieldsModelNoSql,
} from '@model/core'
import {IModelNoSql, SettingsLoadModelNoSql} from '@model'
import {PaginationQueryParams, PaginationValues} from '@pagination'
import {appLogger} from '@logger'

export class ModelNoSqlPagination {
    
    static byYearAndMoth<
        Row extends object,
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
    >({
          dateStart,
          dateEnd,
          getModelCb,
          params,
          filters,
          options,
          attributes,
          settings,
      }: {
        dateStart: Date
        dateEnd: Date
        getModelCb: (props: {
            year: number,
            month: number
        }) => Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>
        params: PaginationQueryParams<RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >>,
        filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>
        attributes?: ReturnAttributes
        settings?: NoSqlPaginationSettings<Row, RowDateAddKey, RowDateUpdateKey>
    }): Promise<PaginationValues<RowWithBaseFieldsAndAttributesModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes
    >>> {
        const collectionNames = ModelNoSqlHelper.getCollectionNamesPaginationByDateRangeNoSql({
            dateStart,
            dateEnd,
        })
        const getModelCbWithInterval: GetModelCbPaginationNoSql<Row, RowDateAddKey, RowDateUpdateKey> = (collectionName: string) => {
            const {month, year} = ModelNoSqlHelper.getYearAndMothByCollectionName(collectionName)
            return getModelCb({
                month, year,
            })
        }
        const dateFilterKey: keyof Row = settings?.dateFilterKey as keyof Row || options?.dateAdd as unknown as keyof Row || 'date_add' as keyof Row
        
        return this.byCollectionNames<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >({
            params,
            getModelCb: getModelCbWithInterval,
            collectionNames: ModelNoSqlHelper.checkReverseCollection({
                order: params?.order,
                dateFilterKey,
            }) ? collectionNames.reverse() : collectionNames,
            filters: {
                [dateFilterKey]: {
                    $gte: new Date(dateStart),
                    $lte: new Date(dateEnd),
                },
                ...(filters ?? {}),
            } as NoSqlFilters<any>,
            attributes,
            
        })
    }
    
    
    static async byCollectionNames<
        Row extends object,
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
    >({
          getModelCb,
          params,
          collectionNames,
          filters,
          attributes,
      }: PaginationNoSqlProps<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<PaginationValues<RowWithBaseFieldsAndAttributesModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes
    >>> {
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
            let found: any[] = []
            try {
                const page = params.page || 1
                const rows: Row[] = []
                
                for (const collectionName of collectionNames) {
                    let model: IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey> | null = null
                    try {
                        model = await getModelCb(collectionName)
                    } catch (error) {
                        appLogger.error('os-core: Error paginationTypes get nosql api:', error)
                    }
                    if (!model) {
                        continue
                    }
                    found = await model.findAll({
                        where: params.where,
                        filters,
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
                    rows: rows as any,
                }
            } catch (error) {
                appLogger.error('os-core:Error paginationTypes by api nosql', error)
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: 0,
                    rows: [],
                }
            }
        }
        
        
        const page = params.page || 1
        const perPage = params.per_page || 10
        
        let skipCount = (page - 1) * perPage
        let countAllRows = 0
        let totalRowsInPage = perPage
        let found: any[] = []
        const rows: Row[] = []
        try {
            
            for (const collectionName of collectionNames) {
                let model: IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey> | null = null
                try {
                    model = await getModelCb(collectionName)
                } catch (error) {
                    appLogger.error('os-core: Error paginationTypes get nosql api:', error)
                }
                if (!model) {
                    continue
                }
                if (skipCount > 0) {
                    const count = await model.count({
                        where: params.where,
                        filters,
                    })
                    if (!count) {
                        continue
                    }
                    countAllRows += count
                    if (count >= skipCount) {
                        found = await model.findAll({
                            where: params.where,
                            filters,
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
                    const count = await model.count({
                        where: params.where,
                        filters,
                    })
                    countAllRows += count
                    continue
                }
                const count = await model.count({
                    where: params.where,
                    filters,
                })
                countAllRows += count
                found = await model.findAll({
                    where: params.where,
                    filters,
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
                rows: rows as any,
                
            }
        } catch (error) {
            appLogger.error('os-core:Error paginationTypes by api nosql', error)
            return {
                page: 1,
                all_pages: 1,
                per_page: 0,
                all_rows: 0,
                rows: [],
            }
        }
    }
}
