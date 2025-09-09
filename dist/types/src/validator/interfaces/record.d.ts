import { SchemaValidator } from "..";
import { StringValidator } from "../core";
export type KeySchemaRecordValidator = SchemaValidator<string | number | symbol>;
declare const BRAND: unique symbol;
type BRAND<T extends string | number | symbol> = {
    [BRAND]: {
        [k in T]: true;
    };
};
export type ValueRecordTypeValidator<K extends string | number | symbol, V> = [
    string
] extends [K] ? Record<K, V> : [number] extends [K] ? Record<K, V> : [symbol] extends [K] ? Record<K, V> : [BRAND<string | number | symbol>] extends [K] ? Record<K, V> : Partial<Record<K, V>>;
export interface RecordValidator<Key extends KeySchemaRecordValidator = StringValidator, Value extends SchemaValidator = SchemaValidator> extends SchemaValidator<ValueRecordTypeValidator<Key['_value'], Value['_value']>> {
    parseJsonIfString(): this;
}
export {};
