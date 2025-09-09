import { GmModuleDtoField } from "../../../core";
import { ModelSqlColumnTypeKey } from "../../../../model/core";
import { GmConfig } from "../../..";
export declare class GmModuleDtoHelper {
    static getDtoPrimaryKeyByConfig: (config: GmConfig) => GmModuleDtoField;
    static getTypeByColumn: (type: ModelSqlColumnTypeKey | 'FILE' | 'OBJECT' | 'OPEN_USER_ID') => GmModuleDtoField['type'];
}
