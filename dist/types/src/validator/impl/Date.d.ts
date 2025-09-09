import { ZodDate } from 'zod/lib/types';
import { DateValidator, SchemaValidatorType, ZodValidatorImp } from "../core";
export declare class DateValidatorImpl extends ZodValidatorImp<Date, ZodDate> implements DateValidator {
    readonly _value: Date;
    constructor(options?: {
        coerce?: boolean;
    });
    min(minDate: Date, message?: string): this;
    max(maxDate: Date, message?: string): this;
    getType(): SchemaValidatorType;
}
