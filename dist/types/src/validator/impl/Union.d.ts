import { ZodUnion } from 'zod';
import { SchemaValidatorType, UnionValidator, UnionValueSchemaValidator, ZodValidatorImp } from "../core";
export declare class UnionValidatorIml<T extends UnionValueSchemaValidator> extends ZodValidatorImp<T[number]['_value'], ZodUnion<any>> implements UnionValidator<T> {
    readonly _value: T[number]['_value'];
    constructor(schema: T);
    getType(): SchemaValidatorType;
}
