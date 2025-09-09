import { SchemaValidator } from "..";
export interface EnumValidator<T extends readonly string[]> extends SchemaValidator<T[number]> {
}
