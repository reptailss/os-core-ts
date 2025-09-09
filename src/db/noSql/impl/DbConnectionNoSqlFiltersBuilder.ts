import {NoSqlFilters, RowWithBaseFieldsModelNoSql} from '@model/core'
import {OrderParams, PermittedWhereOperator, WhereKeys, WhereParams} from '@params'
import {RootFilterQuery} from 'mongoose'

 type OperatorMongoose = string

 type ValueWhereOpMongooseParams = string | number | string[] | number[] | RegExp

 type WhereOpParamsMongoose<T> = {
    [K in keyof T]?: Record<OperatorMongoose, ValueWhereOpMongooseParams>;
};

 type OrderParamsMongoose<T> = [keyof T, 1 | -1][]

const permittedOptions: PermittedReplaceOperatorsMongoose = {
    '>': '$gt',
    '<': '$lt',
    '>=': '$gte',
    '<=': '$lte',
    '=': '$eq',
    IN: '$in',
    'NOT IN': '$nin',
    'NOT': '$not',
    LIKE: '$regex',
    'NOT LIKE': '$not',
}

export type PermittedReplaceOperatorsMongoose = Record<PermittedWhereOperator, OperatorMongoose>


export class DbConnectionNoSqlFiltersBuilder {

    public buildFilters<
        Row extends object,
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update'
    >({
          where,
          filters,
      }: {
        where?: WhereParams<RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >>,
        filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
    }): RootFilterQuery<any> {


        if (!where && !filters) {
            return {}
        }

        if (!filters && where) {
            return this.parseWhereParamsToOpMongoose<any>(where)
        }

        if (!where && filters) {
            return filters
        }

        return {
            ...this.parseWhereParamsToOpMongoose<any>(where),
            ...filters,
        }

    }

     public buildOrders = <T extends Record<keyof T, unknown>>(orders?: OrderParams<T>): OrderParamsMongoose<T> => {
        if (!orders || !Object.keys(orders).length) {
            return [];
        }
        const orderMongoose: OrderParamsMongoose<T> = [];

        for (const columnKey in orders) {
            const value = orders[columnKey];
            const currentValue = value?.toUpperCase() === 'ASC' ? 1 : -1
            //@ts-ignore
            orderMongoose.push([columnKey, currentValue]);
        }

        return orderMongoose;
    };



    private parseWhereParamsToOpMongoose<T extends object>(
        where: WhereParams<T> | undefined,
    ): WhereOpParamsMongoose<T> {

        if (!where) {
            return {}
        }

        const filters: WhereOpParamsMongoose<T> = {}

        for (const k in where) {
            const key = k as keyof T | WhereKeys<T>
            //@ts-ignore
            const value = where[key]
            const arr = key?.toString().split(' ')
            if (arr?.length >= 2) {
                const operator: PermittedWhereOperator = arr[1]?.toUpperCase() as PermittedWhereOperator
                if (!(operator in permittedOptions)) {
                    continue
                }
                const targetKey: keyof T = arr[0] as keyof T
                if (!(targetKey in filters)) {
                    filters[targetKey] = {}
                }
                const targetOperator = this.getTargetOperator(operator)
                //@ts-ignore
                filters[targetKey][targetOperator] = this.getTargetValue(operator, value)
                continue
            }

            const targetKey = key as keyof T

            if (!(targetKey in filters)) {
                filters[targetKey] = {}
            }

            const targetOperator = this.getTargetOperator('=')
            //@ts-ignore
            filters[targetKey][targetOperator] = this.getTargetValue('=', value)
        }
        return filters
    }


    private getTargetOperator(operator: PermittedWhereOperator): OperatorMongoose {
        if (!(operator in permittedOptions)) {
            return '$eq'
        }

        return permittedOptions[operator]
    }

    private getTargetValue(operator: PermittedWhereOperator, value: unknown): ValueWhereOpMongooseParams {

        switch (operator) {
            case 'LIKE': {
                if (typeof value === 'string') {
                    return new RegExp(value?.replace('%', '') as string, 'i')
                }
                return value as ValueWhereOpMongooseParams
            }
            case 'IN': {
                if (typeof value === 'string') {
                    return value?.split(',')
                }
                return value as ValueWhereOpMongooseParams
            }
            case 'NOT IN': {
                if (typeof value === 'string') {
                    return value?.split(',')
                }
                return value as ValueWhereOpMongooseParams
            }
            default :
                return value as ValueWhereOpMongooseParams
        }

    }


}