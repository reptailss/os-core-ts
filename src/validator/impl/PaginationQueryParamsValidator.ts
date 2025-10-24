import {OrderParams} from '@params'
import {SchemaValidator, Validator} from '@validator'
import {SchemaValidatorType} from '@validator/core'
import {PaginationQueryParams} from '@pagination'
import {WhereValidator} from './WhereValidator'


export class PaginationQueryParamsValidator {
    static getSchema<Row extends object>(
        rowSchema: SchemaValidator<Row>,
        options: {
            onlyWhereKeys?: (keyof Row)[],
            onlyOrderKeys?: (keyof Row)[],
        } = {}): SchemaValidator<PaginationQueryParams<Row>> {
        return Validator.object({
            where: WhereValidator.getSchema(rowSchema, options.onlyWhereKeys),
            order: this.getOrderSchemaByKeys(rowSchema, options.onlyOrderKeys),
            page: Validator.number().optional(),
            per_page: Validator.number().optional(),
        })
    }
    
    private static getOrderSchemaByKeys<Row extends object>(rowSchema: SchemaValidator<Row>, onlyOrderKeys?: (keyof Row)[]): SchemaValidator<OrderParams<Row>> {
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
    
    private static checkIsPrimitiveType(type: SchemaValidatorType): boolean {
        return type === 'boolean' ||
            type === 'booleanNum' ||
            type === 'date' ||
            type === 'literal' ||
            type === 'number' ||
            type === 'enum' ||
            type === 'string'
    }
}
