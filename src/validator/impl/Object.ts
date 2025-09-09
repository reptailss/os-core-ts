import { SchemaValidator } from '@validator'
import {
    ExtendObjectValidatorResult,
    ObjectResultTypeValidator,
    ObjectValidator,
    ObjectValueSchemaValidator, SafeParseResultZodValidator, SchemaValidatorType, ValidateResult,
    ZodValidatorImp,
} from '@validator/core'
import {z, ZodObject} from 'zod'


export class ObjectValidatorImpl<
    T extends ObjectValueSchemaValidator,
    Catchall extends SchemaValidator = SchemaValidator,
    Value = ObjectResultTypeValidator<T, Catchall>,
> extends ZodValidatorImp<Value, ZodObject<any>>
    implements ObjectValidator<T, Catchall, Value> {

    readonly _value!: Value

    private hasParseJsonIfString: boolean = false

    constructor(initialShape: T = {} as T) {
        super(z.object(initialShape as any))
    }


    public partial(): ObjectValidator<T, Catchall, Partial<Value>> {
        const newValidator = new ObjectValidatorImpl<T, Catchall, Value>()
        newValidator._schema = this._schema.partial()
        return newValidator
    }


    public merge<
        R extends ObjectValueSchemaValidator,
        Catchall extends SchemaValidator = SchemaValidator,
        NewValue = ObjectResultTypeValidator<R, Catchall>,
    >(
        newSchema: ObjectValidator<R, Catchall, NewValue>,
    ): ObjectValidator<
        ExtendObjectValidatorResult<T, R>,
        Catchall,
        ExtendObjectValidatorResult<Value, NewValue>
    > {
        const newValidator = new ObjectValidatorImpl<T, Catchall, Value>()
        //@ts-ignore
        newValidator._schema = this._schema.merge(newSchema._schema)
        return newValidator as ObjectValidator<
            ExtendObjectValidatorResult<T, R>,
            Catchall,
            ExtendObjectValidatorResult<Value, NewValue>
        >
    }

    public parseJsonIfString() {
        this.hasParseJsonIfString = true
        return this
    }


    public getShape(): T {
        return this._schema._getCached().shape
    }

    public getType(): SchemaValidatorType {
        return 'object'
    }

    public validate(data: unknown): ValidateResult<Value> {
        if (this.hasParseJsonIfString && typeof data === 'string') {
            try {
                return super.validate(JSON.parse(data))
            } catch (error) {
                return super.validate(data)
            }
        }
        return super.validate(data)
    }

    public safeParse(input: any): SafeParseResultZodValidator<Value, Value> {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data)
            } catch (error) {
            }
        }
        return super.safeParse(input)
    }

    public _parse(input: any) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data)
            } catch (error) {
            }
        }

        return super._parse(input)
    }

    public _parseSync(input: any) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data)
            } catch (error) {
            }
        }
        return super._parseSync(input)
    }

}


