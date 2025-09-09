import { SchemaValidator } from "..";
export type UnionValueSchemaValidator = Readonly<[SchemaValidator, ...SchemaValidator[]]>;
export interface UnionValidator<T extends UnionValueSchemaValidator> extends SchemaValidator<T[number]['_value']> {
}
