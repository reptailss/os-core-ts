import {
    BASE_WHERE_DATE_OPERATORS,
    BASE_WHERE_NUMBER_OPERATORS,
    BASE_WHERE_STRING_OPERATORS,
    OrderParams,
    WhereParams,
} from '@params'
import {SchemaValidator, Validator} from '@validator'
import {SchemaValidatorType} from '@validator/core'
import {PaginationQueryParams} from '@pagination'


export class PaginationQueryParamsValidator {
    static getSchema<Row extends object>(
        rowSchema: SchemaValidator<Row>,
        options: {
            onlyWhereKeys?: (keyof Row)[],
            onlyOrderKeys?: (keyof Row)[],
        } = {}): SchemaValidator<PaginationQueryParams<Row>> {
        return Validator.object({
            where: this.getWhereSchemaByKeys(rowSchema, options.onlyWhereKeys),
            order: this.getOrderSchemaByKeys(rowSchema, options.onlyOrderKeys),
            page: Validator.number().optional(),
            per_page: Validator.number().optional(),
        })
    }

    static getWhereSchemaByKeys<Row extends object>(rowSchema: SchemaValidator<Row>, onlyWhereKeys?: (keyof Row)[]): SchemaValidator<WhereParams<Row>> {
        const newShape: Record<string, SchemaValidator> = {}
//@ts-ignore
        const shapes: Record<string, SchemaValidator> = rowSchema.getShape()
        for (const key in shapes) {
            if (
                onlyWhereKeys &&
                onlyWhereKeys.length >= 1 &&
                !onlyWhereKeys.includes(key as keyof Row)
            ) {
                continue
            }
            const schema = shapes[key]
            const type = schema.getType()
            if (!this.checkIsPrimitiveType(type)) {
                continue
            }
            newShape[key] = schema
            if (
                this.checkIsStringType(type)
            ) {
                BASE_WHERE_STRING_OPERATORS.forEach((operator) => {
                    const keyWithOperator = `${key} ${operator}`
                    if (
                        operator === 'IN' ||
                        operator === 'NOT IN'
                    ) {
                        newShape[keyWithOperator] = Validator.array(schema)
                        return
                    }
                    newShape[keyWithOperator] = schema

                })
            }
            if (this.checkIsNumberType(type)) {
                BASE_WHERE_NUMBER_OPERATORS.forEach((operator) => {
                    const keyWithOperator = `${key} ${operator}`
                    if (
                        operator === 'IN' ||
                        operator === 'NOT IN'
                    ) {
                        newShape[keyWithOperator] = Validator.array(schema)
                        return
                    }
                    newShape[keyWithOperator] = schema
                })
            }

            if (this.checkIsDateType(type)) {
                BASE_WHERE_DATE_OPERATORS.forEach((operator) => {
                    const keyWithOperator = `${key} ${operator}`
                    newShape[keyWithOperator] = schema
                })
            }
        }
        return Validator.object(newShape).partial().optional() as SchemaValidator<WhereParams<Row>>
    }

    static getOrderSchemaByKeys<Row extends object>(rowSchema: SchemaValidator<Row>, onlyOrderKeys?: (keyof Row)[]): SchemaValidator<OrderParams<Row>> {
        const newShape: Record<string, SchemaValidator> = {}
//@ts-ignore
        const shapes: Record<string, SchemaValidator> = rowSchema.getShape()
        for (const key in shapes) {
            if (
                onlyOrderKeys &&
                onlyOrderKeys.length >= 1 &&
                !onlyOrderKeys.includes(key as keyof Row)
            ) {
                continue
            }
            const schema = shapes[key]
            const type = schema.getType()
            if (!this.checkIsPrimitiveType(type)) {
                continue
            }
            newShape[key] = Validator.enum(['asc', 'desc', 'ASC', 'DESC'] as const)
        }
        return Validator.object(newShape).partial().optional() as SchemaValidator<OrderParams<Row>>
    }

    static checkIsStringType(type: SchemaValidatorType): boolean {
        return type === 'string' ||
            type === 'literal' ||
            type === 'enum'

    }

    static checkIsNumberType(type: SchemaValidatorType): boolean {
        return type === 'number' ||
            type === 'booleanNum'

    }

    static checkIsDateType(type: SchemaValidatorType): boolean {
        return type === 'date'
    }

    static checkIsPrimitiveType(type: SchemaValidatorType): boolean {
        return type === 'boolean' ||
            type === 'booleanNum' ||
            type === 'date' ||
            type === 'literal' ||
            type === 'number' ||
            type === 'enum' ||
            type === 'string'
    }
}
