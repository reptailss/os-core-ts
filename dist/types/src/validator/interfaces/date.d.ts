import { SchemaValidator } from "..";
export interface DateValidator extends SchemaValidator<Date> {
    min(minDate: Date, message?: string): this;
    max(maxDate: Date, message?: string): this;
}
