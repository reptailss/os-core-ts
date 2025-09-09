import { SchemaValidator } from "..";
export type InferValidator<T extends SchemaValidator> = T['_value'];
