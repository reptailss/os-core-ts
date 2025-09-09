"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodGetById = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleControllerMethodGetById extends core_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new core_1.GmServiceBuildResponseFormat();
        this.gmServiceRowResultType = new core_1.GmServiceRowResultType();
        this.gmServiceUserInfoType = new core_1.GmServiceUserInfoType();
        this.gmServiceThrowAppError = new core_1.GmServiceThrowAppError();
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleRoutePaths = new core_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}ById`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceRowResultType);
        this.addService(this.gmServiceThrowAppError);
        this.setReturnType(`Promise<${this.gmServiceRowResultType.getRowResultType(this.gmModuleDto.getPropertyName())}>`);
        this.appendDecorator(new core_1.GmSwaggerInfoDec(`Get ${this.getConfig().dtoName.singular.toLowerCase()} by id`));
        this.appendDecorator(new core_1.GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('get')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (core_1.GmConfigChecker.hasAuth(this.getConfig(), 'get')) {
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
            value: `const ${this.getDtoPropertyVarName()} = await ${this.api.getById()}`,
        });
        this.appendBodyElement({
            name: 'check has row',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getDtoPropertyVarName()}`,
            }),
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.row(this.getDtoPropertyVarName())}`,
        });
    }
    getDtoPropertyVarName() {
        return 'dto';
    }
}
exports.GmModuleControllerMethodGetById = GmModuleControllerMethodGetById;
//# sourceMappingURL=GmModuleControllerMethodGetById.js.map