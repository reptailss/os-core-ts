"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodDelete = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleControllerMethodDelete extends core_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new core_1.GmServiceBuildResponseFormat();
        this.gmServiceMutateRowResultType = new core_1.GmServiceMutateRowResultType();
        this.gmServiceUserInfoType = new core_1.GmServiceUserInfoType();
        this.gmModuleRoutePaths = new core_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `delete${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceMutateRowResultType);
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type)}>`);
        this.appendDecorator(new core_1.GmSwaggerInfoDec(`Delete ${this.getConfig().dtoName.singular.toLowerCase()}`));
        this.appendDecorator(new core_1.GmDeleteDec(this.gmModuleRoutePaths.getRoutePathPropertyName('delete')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (core_1.GmConfigChecker.hasAuth(this.getConfig(), 'delete')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new core_1.GmAuthDec(),
            });
        }
        this.addProp({
            type: core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            varName: this.varNames.id,
            callVarName: this.varNames.id,
            decorator: core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new core_1.GmParamDec('id') : new core_1.GmParamNumDec('id')
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getOldDtoPropertyVarName()} = await ${this.api.delete()}`,
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getOldDtoPropertyVarName()}.${core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        });
    }
    getOldDtoPropertyVarName() {
        return 'oldDto';
    }
}
exports.GmModuleControllerMethodDelete = GmModuleControllerMethodDelete;
//# sourceMappingURL=GmModuleControllerMethodDelete.js.map