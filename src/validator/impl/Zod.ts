import {SafeParseResultZodValidator, ValidateResult, ValidatorErrorValuesHelper} from '@validator/core'
import {ZodTypeAny} from 'zod'
import {SchemaValidator} from '@validator'


export abstract class ZodValidatorImp<Value, ZodSchema extends ZodTypeAny = ZodTypeAny> {
    public _schema: ZodSchema

    constructor(schema: ZodSchema) {
        this._schema = schema
    }

    public validate(value: unknown): ValidateResult<Value> {
        const {
            data,
            error,
        } = this._schema.safeParse(value)

        if (error) {
            const errors = ValidatorErrorValuesHelper.buildErrorValuesBySchema(error)
            return {
                error: true,
                errors,
                data: null,
                success: false,
            }
        }

        return {
            error: false,
            errors: [],
            data: data as any,
            success: true,
        }
    }

    public optional(): this {
        this._schema = this._schema.optional() as any
        return this
    }

    public nullable(): this {
        this._schema = this._schema.nullable() as any
        return this
    }

    public refine<RefinedOutput extends Value>(checkCb: (arg: Value) => boolean, message?: string): this
    public refine<RefinedOutput extends Value>(
        checkCb: (arg: Value) => arg is Value,
        message?: string,
    ): this {
        this._schema = this._schema.refine(checkCb as any, message) as any
        return this
    }

    public transform<NewValue>(cb: (oldValue: Value) => NewValue): SchemaValidator<NewValue> {
        this._schema = this._schema.transform(cb) as any
        return this as any as SchemaValidator<NewValue>
    }

    //needed for zod
    public safeParse(value: unknown): SafeParseResultZodValidator<Value, Value> {
        return this._schema.safeParse(value)
    }

    //needed for zod
    public _parse(input: any) {
        return this._schema._parse(input)
    }

    //needed for zod
    public _parseSync(input: any) {
        return this._schema._parse(input)
    }


}
