"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModeApiSql = void 0;
const core_1 = require("../../../core");
class GmModuleModeApiSql {
    constructor(modelVarName) {
        this.modelVarName = modelVarName;
    }
    create(createDtoVarName) {
        return `${this.modelVarName}.create(${createDtoVarName})`;
    }
    update(updateDtoVarName, props) {
        return `${this.modelVarName}.update(${updateDtoVarName},
                     {
                           filters:${core_1.GmObjectStringifyHelper.objectOptionsToString(props.filters)},
                             returning:${props.returning ? 'true' : 'false'}
                      }
                )`;
    }
    destroy(props) {
        return `${this.modelVarName}.destroy({
                           filters:${core_1.GmObjectStringifyHelper.objectOptionsToString(props.filters)}
                      })`;
    }
    findOne(props) {
        return `${this.modelVarName}.findOne({
                           filters:${core_1.GmObjectStringifyHelper.objectOptionsToString(props.filters)},
                      })`;
    }
    findByPk(idVarName) {
        return `${this.modelVarName}.findByPk(${idVarName})`;
    }
    pagination(paramsVarName) {
        return `${this.modelVarName}.pagination(${paramsVarName})`;
    }
    getConfig() {
        return `${this.modelVarName}.getConfig()`;
    }
    getModelVarName() {
        return this.modelVarName;
    }
}
exports.GmModuleModeApiSql = GmModuleModeApiSql;
//# sourceMappingURL=GmModuleModeApiSql.js.map