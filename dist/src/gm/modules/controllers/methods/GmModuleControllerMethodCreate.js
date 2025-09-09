"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodCreate = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleControllerMethodCreate extends core_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new core_1.GmServiceBuildResponseFormat();
        this.gmServiceMutateRowResultType = new core_1.GmServiceMutateRowResultType();
        this.gmServiceUserInfoType = new core_1.GmServiceUserInfoType();
        this.gmModuleCreateDto = new core_1.GmModuleCreateDto(config);
        this.gmModuleRoutePaths = new core_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleCreateDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceMutateRowResultType);
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type)}>`);
        this.appendDecorator(new core_1.GmSwaggerInfoDec(`Add new ${this.getConfig().dtoName.singular.toLowerCase()}`));
        this.appendDecorator(new core_1.GmPostDec(this.gmModuleRoutePaths.getRoutePathPropertyName('add')));
        this.setAsyncType('async');
        this.setMethodScope('public');
        this.addProp({
            type: this.varNames.createDtoType || this.gmModuleCreateDto.getPropertyName(),
            varName: this.varNames.createDto,
            callVarName: this.varNames.createDto,
            decorator: new core_1.GmBodyDec(this.varNames.createDtoSchema),
        });
        if (core_1.GmConfigChecker.hasAuth(this.getConfig(), 'add')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new core_1.GmAuthDec(),
            });
        }
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.create()}`,
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
exports.GmModuleControllerMethodCreate = GmModuleControllerMethodCreate;
//# sourceMappingURL=GmModuleControllerMethodCreate.js.map