import { OrderParams, WhereParams } from "../../../params";
import { SqlAssociation, WhereSql } from "../../core";
export type SqlAssociationRow<Includes extends Record<string, SqlAssociation<any>> = {}, Key extends keyof Includes = keyof Includes> = {
    modelKey: Key;
    require?: boolean;
    clientWhere?: WhereParams<Includes[Key]['_entity']>;
    where?: WhereSql<Includes[Key]['_entity']>;
    order?: OrderParams<Includes[Key]['_entity']>;
};
