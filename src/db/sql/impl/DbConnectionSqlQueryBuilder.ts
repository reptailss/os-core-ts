import {OrderParams, PermittedWhereOperator, WhereKeys, WhereParams} from '@params'
import sequelize, {Op, Sequelize} from 'sequelize'
import {SqlAggregate, SqlAssociation, SqlAssociationRow, SqlOrderWithAggregate, WhereSql} from '@repository/core'
import {Entity} from '@entity'


type Operators = {
    eq: symbol
    ne: symbol
    gte: symbol
    gt: symbol
    lte: symbol
    lt: symbol
    not: symbol
    is: symbol
    in: symbol
    notIn: symbol
    like: symbol
    notLike: symbol
    iLike: symbol
    notILike: symbol
    regexp: symbol
    notRegexp: symbol
    iRegexp: symbol
    notIRegexp: symbol
    between: symbol
    notBetween: symbol
    overlap: symbol
    contains: symbol
    contained: symbol
    adjacent: symbol
    strictLeft: symbol
    strictRight: symbol
    noExtendRight: symbol
    noExtendLeft: symbol
    and: symbol
    or: symbol
    any: symbol
    all: symbol
    values: symbol
    col: symbol
    placeholder: symbol
    join: symbol
    raw: symbol
}

type OperatorSequelize = Operators[keyof Operators]

type ValueWhereOpSequelizeParams<T> = Partial<Record<keyof Operators, T[keyof T]>>
type ValueSequelizeParams = number | string | number[] | string[]


type WhereOpParamsSequelize<T> = {
    [K in keyof T]?: ValueWhereOpSequelizeParams<T>;
};

type PermittedReplaceOperatorsSequelize = Record<PermittedWhereOperator, OperatorSequelize>

const PERMITTED_OPTIONS: PermittedReplaceOperatorsSequelize = {
    '=': Op.eq,
    '>': Op.gt,
    '>=': Op.gte,
    IN: Op.in,
    '<': Op.lt,
    '<=': Op.lte,
    'NOT IN': Op.notIn,
    'NOT': Op.not,
    LIKE: Op.like,
    'NOT LIKE': Op.notILike,
}

const OPERATOR_MAP = {
    $eq: Op.eq,
    $gt: Op.gt,
    $gte: Op.gte,
    $in: Op.in,
    $lt: Op.lt,
    $lte: Op.lte,
    $nin: Op.notIn,
    $not: Op.not,
    $like: Op.like,
    $notLike: Op.notLike,
    $between: Op.between,
    $contains: Op.contains,
}

export class DbConnectionSqlQueryBuilder<
    ClassEntity extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
> {
    
    private readonly includes: Includes
    private readonly dbConnection: Sequelize
    
    constructor(
        dbConnection: Sequelize,
        includes?: Includes,
    ) {
        this.dbConnection = dbConnection
        this.includes = includes || {} as Includes
    }
    
    
    public buildAttributes(
        attributes?: (string | keyof ClassEntity)[],
        aggregates?: Record<string, SqlAggregate<Entity<ClassEntity>>>,
    ): any | undefined {
        if (!attributes?.length && !aggregates) {
            return
        }
        const res: any = []
        if (attributes && attributes.length > 0) {
            res.push(...attributes as string[])
        }
        if (aggregates) {
            for (const key in aggregates) {
                const aggregate = aggregates[key]
                if (aggregate.literal) {
                    res.push([Sequelize.literal(aggregate.literal), key])
                } else {
                    res.push([Sequelize.fn(aggregate.fn, Sequelize.col(aggregate.columnKey as string)), key])
                }
            }
        }
        return res
    }
    
    public buildWhere(
        where?: WhereSql<ClassEntity>,
        clientWhere?: WhereParams<Entity<ClassEntity>>,
    ): any {
        if (!clientWhere && !where) {
            return {}
        }
        
        if (!where && clientWhere) {
            return this.parseWhereParamsToOpSequelize(clientWhere)
        }
        
        if (!clientWhere && where) {
            return this.parseFiltersToOpSequelize(where)
        }
        
        return {
            ...this.parseWhereParamsToOpSequelize(clientWhere),
            ...this.parseFiltersToOpSequelize(where),
        }
    }
    
    public buildOrder<Aggregates extends Record<string, SqlAggregate<ClassEntity>> = {}, >(
        order?: OrderParams<any> | undefined,
        include?: Array<SqlAssociationRow<Includes>>,
        orderAggregate?: SqlOrderWithAggregate<Aggregates>,
    ): any {
        if (!include?.length && !order && !orderAggregate) {
            return []
        }
        const ordersSequelize: any = []
        
        if (order) {
            for (const columnKey in order) {
                const value = order[columnKey]
                const currenValue = value?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
                ordersSequelize.push([columnKey, currenValue])
            }
        }
        
        if (orderAggregate) {
            for (const columnKey in orderAggregate) {
                const value = orderAggregate[columnKey]
                const currenValue = value?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
                ordersSequelize.push([Sequelize.literal(columnKey) as any, currenValue])
            }
        }
        
        if (include?.length) {
            for (const inc of include) {
                if (inc.order) {
                    for (const columnKey in inc.order) {
                        const value = inc.order[columnKey]
                        const currenValue = value?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
                        ordersSequelize.push([inc.modelKey as string, columnKey, currenValue])
                    }
                }
            }
            
        }
        
        return ordersSequelize
        
    }
    
    public getIncludes(
        incl?: Array<SqlAssociationRow<Includes>>,
    ) {
        if (!incl?.length || !this.includes) {
            return []
        }
        const res: any[] = []
        
        for (const inc of incl) {
            if (
                !(inc.modelKey in this.includes) ||
                !(this.includes[inc.modelKey].tableName in this.dbConnection.models)
            ) {
                continue
            }
            if (!inc.clientWhere && !inc.where) {
                res.push({
                    model: this.dbConnection.models[this.includes[inc.modelKey].tableName],
                    as: inc.modelKey,
                    require: inc.require,
                })
                continue
            }
            res.push({
                model: this.dbConnection.models[this.includes[inc.modelKey].tableName],
                as: inc.modelKey,
                require: inc.require,
                where: this.buildWhere(
                    inc.where,
                    inc.clientWhere,
                ),
            })
            
            
        }
        return res
    }
    
    public getRawOption(incl?: Array<SqlAssociationRow<Includes>>): boolean {
        if (
            !incl?.length ||
            !this.includes
        ) {
            return true
        }
        const currentIncl = incl.find((inc) => inc.modelKey in this.includes)
        if (!currentIncl) {
            return true
        }
        const include = this.includes[currentIncl.modelKey]
        
        return include.type !== 'hasMany'
    }
    
    private parseWhereParamsToOpSequelize(where?: WhereParams<Entity<ClassEntity>> | undefined): WhereOpParamsSequelize<Entity<ClassEntity>> {
        if (!where) {
            return {}
        }
        
        const filters: WhereOpParamsSequelize<Entity<ClassEntity>> = {}
        
        for (const k in where) {
            const key = k as keyof Entity<ClassEntity> | WhereKeys<Entity<ClassEntity>>
            //@ts-ignore
            const value = where[key]
            const arr = key?.toString().split(' ')
            if (arr?.length >= 2) {
                const operator: PermittedWhereOperator = arr[1]?.toUpperCase() as PermittedWhereOperator
                if (!(operator in PERMITTED_OPTIONS)) {
                    continue
                }
                const targetKey: keyof Entity<ClassEntity> = arr[0] as keyof Entity<ClassEntity>
                if (!(targetKey in filters)) {
                    filters[targetKey] = {}
                }
                const targetOperator = this.getTargetOperator(operator)
                //@ts-ignore
                filters[targetKey][targetOperator] = this.getTargetValue(operator, value)
                continue
            }
            
            const targetKey = key as keyof Entity<ClassEntity>
            
            if (!(targetKey in filters)) {
                filters[targetKey] = {}
            }
            
            //@ts-ignore
            filters[targetKey][this.getTargetOperator('=')] = this.getTargetValue('=', value)
        }
        
        return filters
    }
    
    private parseFiltersToOpSequelize<Row extends object>(filters?: WhereSql<Row>): WhereOpParamsSequelize<Row> {
        if (!filters) {
            return {}
        }
        
        const sequelizeWhere: Record<string | symbol, any> = {}
        
        for (const key in filters) {
            if (key === '$or') {
                sequelizeWhere[Op.or] = filters.$or?.map(condition => this.parseFiltersToOpSequelize(condition)) || []
                continue
            }
            
            const condition = filters[key as keyof Row] as any
            
            if (typeof condition === 'object' && condition !== null) {
                if ('$contains' in condition) {
                    const values = condition.$contains
                    if (values && values?.length >= 1) {
                        sequelizeWhere[key as string] = this.buildContainsFilterArray(key, values)
                    }
                } else {
                    const fieldConditions: Record<symbol | string, any> = {}
                    for (const operator in condition) {
                        //@ts-ignore
                        const sequelizeOperator = OPERATOR_MAP[operator]
                        
                        if (sequelizeOperator) {
                            //@ts-ignore
                            fieldConditions[sequelizeOperator] = (condition as QuerySelectorModelSql<any>)[operator]
                        }
                    }
                    sequelizeWhere[key as string] = fieldConditions
                }
                
            } else {
                sequelizeWhere[key as string] = condition
            }
        }
        return sequelizeWhere
    }
    
    private getTargetOperator(operator: PermittedWhereOperator) {
        if (!(operator in PERMITTED_OPTIONS)) {
            return Op.eq
        }
        
        return PERMITTED_OPTIONS[operator]
    }
    
    private buildContainsFilterArray(columnName: string, value: (string | number)[]) {
        if (value.length === 1) {
            return this.buildContainsFilter(columnName, value[0])
        }
        return value.map((v) => this.buildContainsFilter(columnName, v)).join(' OR ')
    }
    
    private buildContainsFilter(columnName: string, value: string | number) {
        const escapedValue = this.escapeValue(value)
        if (typeof value === 'string') {
            return sequelize.literal(`JSON_CONTAINS(${columnName}, '"${escapedValue}"')`)
        }
        return sequelize.literal(`JSON_CONTAINS(${columnName}, '${escapedValue}')`)
    }
    
    private escapeValue(value: string | number): string {
        if (typeof value === 'string') {
            return value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/"/g, '\\"')
        }
        return String(value)
    }
    
    private getTargetValue(operator: PermittedWhereOperator, value: unknown): ValueSequelizeParams {
        switch (operator) {
            case 'IN': {
                if (typeof value === 'string') {
                    return value.split(',') as ValueSequelizeParams
                }
                return value as ValueSequelizeParams
            }
            case 'NOT IN': {
                if (typeof value === 'string') {
                    return value.split(',') as ValueSequelizeParams
                }
                return value as ValueSequelizeParams
            }
            default :
                return value as ValueSequelizeParams
        }
    }
    
}