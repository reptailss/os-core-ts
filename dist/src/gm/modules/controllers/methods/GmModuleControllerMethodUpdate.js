"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodUpdate = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleControllerMethodUpdate extends core_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new core_1.GmServiceBuildResponseFormat();
        this.gmServiceMutateRowResultType = new core_1.GmServiceMutateRowResultType();
        this.gmServiceUserInfoType = new core_1.GmServiceUserInfoType();
        this.gmModuleUpdateDto = new core_1.GmModuleUpdateDto(config);
        this.gmModuleRoutePaths = new core_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `update${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleUpdateDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceMutateRowResultType);
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type)}>`);
        this.appendDecorator(new core_1.GmSwaggerInfoDec(`Update ${this.getConfig().dtoName.singular.toLowerCase()} by id`));
        this.appendDecorator(new core_1.GmPutDec(this.gmModuleRoutePaths.getRoutePathPropertyName('update')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            type: this.varNames.updateDtoType || this.gmModuleUpdateDto.getPropertyName(),
            varName: this.varNames.updateDto,
            callVarName: this.varNames.updateDto,
            decorator: new core_1.GmBodyDec(this.varNames.updateDtoSchema),
        });
        if (core_1.GmConfigChecker.hasAuth(this.getConfig(), 'update')) {
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
            decorator: core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new core_1.GmParamDec('id') : new core_1.GmParamNumDec('id'),
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.update()}`,
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getNewDtoPropertyVarName()}.${core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        });
    }
    getNewDtoPropertyVarName() {
        return 'newDto';
    }
}
exports.GmModuleControllerMethodUpdate = GmModuleControllerMethodUpdate;
//# sourceMappingURL=GmModuleControllerMethodUpdate.js.map