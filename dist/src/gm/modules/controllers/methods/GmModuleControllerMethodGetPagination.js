"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodGetPagination = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleControllerMethodGetPagination extends core_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new core_1.GmServiceBuildResponseFormat();
        this.gmServicePaginationValues = new core_1.GmServicePaginationValues();
        this.gmServicePaginationQueryParamsType = new core_1.GmServicePaginationQueryParamsType();
        this.gmServiceUserInfoType = new core_1.GmServiceUserInfoType();
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleRoutePaths = new core_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServicePaginationValues);
        this.addService(this.gmServicePaginationQueryParamsType);
        this.setReturnType(`Promise<${this.gmServicePaginationValues.getPaginationResultType(this.gmModuleDto.getPropertyName())}>`);
        this.appendDecorator(new core_1.GmSwaggerInfoDec(`Get ${this.getConfig().dtoName.plural.toLowerCase()} list`));
        this.appendDecorator(new core_1.GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('list')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (core_1.GmConfigChecker.hasAuth(this.getConfig(), 'list')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new core_1.GmAuthDec(),
            });
        }
        this.addProp({
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: new core_1.GmPaginationQueryParamsDec(this.varNames.paramsSchema),
            callVarName: this.varNames.params,
            varName: this.varNames.params,
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getPaginationValuesVarName()} = await ${this.api.getPagination()}`,
        });
        this.appendBodyElement({
            name: 'return pagination',
            value: `return ${this.gmServiceBuildResponseFormat.pagination(this.getPaginationValuesVarName())}`,
        });
    }
    getPaginationValuesVarName() {
        return 'paginationValues';
    }
}
exports.GmModuleControllerMethodGetPagination = GmModuleControllerMethodGetPagination;
//# sourceMappingURL=GmModuleControllerMethodGetPagination.js.map