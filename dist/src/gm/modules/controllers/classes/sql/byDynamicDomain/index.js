"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllBySqlDynamicDomain = exports.GmModuleControllerClassGetBySqlDynamicDomain = exports.GmModuleControllerClassDeleteBySqlDynamicDomain = exports.GmModuleControllerClassUpdateBySqlDynamicDomain = exports.GmModuleControllerClassCreateBySqlDynamicDomain = exports.GmModuleControllerClassCrudBySqlDynamicDomain = void 0;
const core_1 = require("../../../../../core");
const _helpers_1 = require("../../../../../../helpers");
const CREATE_VAR_NAMES = {
    domain: 'domain',
    createDto: 'createDto',
    createDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
};
const UPDATE_VAR_NAMES = {
    domain: 'domain',
    updateDto: 'updateDto',
    updateDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
    id: 'id',
};
const DELETE_VAR_NAMES = {
    domain: 'domain',
    userInfo: 'userInfo',
    id: 'id',
};
const GET_VAR_NAMES = {
    domain: 'domain',
    userInfo: 'userInfo',
    id: 'id',
};
const GET_ALL_VAR_NAMES = {
    domain: 'domain',
    params: 'params',
    userInfo: 'userInfo',
};
class GmAccessStructureMethodProcessorByDynamicDomain extends core_1.GmAccessStructureMethodProcessor {
    constructor(config) {
        super(config, {
            add: {
                openUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            update: {
                openUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            delete: {
                openUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            get: {
                openUserId: `${GET_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            list: {
                openUserId: `${GET_ALL_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
        });
    }
    add(method) {
        super.add(method);
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        });
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${CREATE_VAR_NAMES.domain})`,
        });
    }
    update(method) {
        super.update(method);
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        });
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${UPDATE_VAR_NAMES.domain})`,
        });
    }
    delete(method) {
        super.delete(method);
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        });
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${DELETE_VAR_NAMES.domain})`,
        });
    }
    get(method) {
        super.get(method);
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        });
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${GET_VAR_NAMES.domain})`,
        });
    }
    list(method) {
        super.list(method);
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        });
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${GET_ALL_VAR_NAMES.domain})`,
        });
    }
}
class GmModuleControllerClassCrudBySqlDynamicDomain extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`);
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new core_1.GmModuleServiceClassCrudBySqlDynamicDomain(config, `this.${this.getServiceVarName()}`, {
            create: {
                domain: CREATE_VAR_NAMES.domain,
                createDto: CREATE_VAR_NAMES.createDto,
                initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
            },
            update: {
                domain: UPDATE_VAR_NAMES.domain,
                id: UPDATE_VAR_NAMES.id,
                updateDto: UPDATE_VAR_NAMES.updateDto,
                initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
            },
            delete: {
                domain: DELETE_VAR_NAMES.domain,
                id: DELETE_VAR_NAMES.id,
                initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
            },
            getById: {
                domain: GET_VAR_NAMES.domain,
                id: GET_VAR_NAMES.id,
            },
            getPagination: {
                domain: GET_ALL_VAR_NAMES.domain,
                params: GET_ALL_VAR_NAMES.params,
            },
        });
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodCreate = new core_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: CREATE_VAR_NAMES.createDto,
            userInfo: CREATE_VAR_NAMES.userInfo,
            createDtoSchema: this.getValidatorCreateDtoVarName(),
        }).addProp({
            varName: CREATE_VAR_NAMES.domain,
            callVarName: CREATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.add(methodCreate);
        }
        const methodUpdate = new core_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: UPDATE_VAR_NAMES.updateDto,
            userInfo: UPDATE_VAR_NAMES.userInfo,
            updateDtoSchema: this.getValidatorUpdateDtoVarName(),
            id: UPDATE_VAR_NAMES.id,
        }).addProp({
            varName: UPDATE_VAR_NAMES.domain,
            callVarName: UPDATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.update(methodUpdate);
        }
        const methodDelete = new core_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userInfo: DELETE_VAR_NAMES.userInfo,
            id: DELETE_VAR_NAMES.id,
        }).addProp({
            varName: DELETE_VAR_NAMES.domain,
            callVarName: DELETE_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.delete(methodDelete);
        }
        const methodGetById = new core_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userInfo: GET_VAR_NAMES.userInfo,
            id: GET_VAR_NAMES.id,
        }).addProp({
            varName: GET_VAR_NAMES.domain,
            callVarName: GET_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.get(methodGetById);
        }
        const methodPagination = new core_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: GET_ALL_VAR_NAMES.params,
            userInfo: GET_ALL_VAR_NAMES.userInfo,
            paramsSchema: this.getValidatorParamsDtoVarName(),
        }).addProp({
            varName: GET_ALL_VAR_NAMES.domain,
            callVarName: GET_ALL_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.list(methodPagination);
        }
        this.addMethod(methodCreate);
        this.addMethod(methodUpdate);
        this.addMethod(methodDelete);
        this.addMethod(methodGetById);
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
            const ${this.getValidatorCreateDtoVarName()} = ${this.validator.api.getCreateDtoSchema()}
            const ${this.getValidatorUpdateDtoVarName()} = ${this.validator.api.getUpdateDtoSchema()}
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorCreateDtoVarName() {
        return `create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`;
    }
    getValidatorUpdateDtoVarName() {
        return `update${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`;
    }
    getValidatorParamsDtoVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`;
    }
    getServiceVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCrudBySqlDynamicDomain = GmModuleControllerClassCrudBySqlDynamicDomain;
class GmModuleControllerClassCreateBySqlDynamicDomain extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Create${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new core_1.GmModuleServiceClassCreateBySqlDynamicDomain(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
            createDto: CREATE_VAR_NAMES.createDto,
            domain: CREATE_VAR_NAMES.domain,
        });
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodCreate = new core_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: CREATE_VAR_NAMES.createDto,
            userInfo: CREATE_VAR_NAMES.userInfo,
            createDtoSchema: this.getValidatorCreateDtoVarName(),
        }).addProp({
            varName: CREATE_VAR_NAMES.domain,
            callVarName: CREATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.add(methodCreate);
        }
        this.addMethod(methodCreate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `);
        this.addElementBeforeClass(`
            const ${this.getValidatorCreateDtoVarName()} = ${this.validator.api.getCreateDtoSchema()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorCreateDtoVarName() {
        return `create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`;
    }
    getServiceVarName() {
        return `create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCreateBySqlDynamicDomain = GmModuleControllerClassCreateBySqlDynamicDomain;
class GmModuleControllerClassUpdateBySqlDynamicDomain extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Update${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new core_1.GmModuleServiceClassUpdateBySqlDynamicDomain(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
            updateDto: UPDATE_VAR_NAMES.updateDto,
            domain: UPDATE_VAR_NAMES.domain,
            id: UPDATE_VAR_NAMES.id,
        });
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodUpdate = new core_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: UPDATE_VAR_NAMES.updateDto,
            userInfo: UPDATE_VAR_NAMES.userInfo,
            updateDtoSchema: this.getValidatorUpdateDtoVarName(),
            id: UPDATE_VAR_NAMES.id,
        }).addProp({
            varName: UPDATE_VAR_NAMES.domain,
            callVarName: UPDATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.update(methodUpdate);
        }
        this.addMethod(methodUpdate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `);
        this.addElementBeforeClass(`
            const ${this.getValidatorUpdateDtoVarName()} = ${this.validator.api.getUpdateDtoSchema()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorUpdateDtoVarName() {
        return `update${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`;
    }
    getServiceVarName() {
        return `update${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassUpdateBySqlDynamicDomain = GmModuleControllerClassUpdateBySqlDynamicDomain;
class GmModuleControllerClassDeleteBySqlDynamicDomain extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Delete${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.serviceCrud = new core_1.GmModuleServiceClassDeleteBySqlDynamicDomain(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
            domain: DELETE_VAR_NAMES.domain,
            id: DELETE_VAR_NAMES.id,
        });
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config);
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodDelete = new core_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userInfo: DELETE_VAR_NAMES.userInfo,
            id: DELETE_VAR_NAMES.id,
        }).addProp({
            varName: DELETE_VAR_NAMES.domain,
            callVarName: DELETE_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.delete(methodDelete);
        }
        this.addMethod(methodDelete);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
    }
    getServiceVarName() {
        return `delete${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassDeleteBySqlDynamicDomain = GmModuleControllerClassDeleteBySqlDynamicDomain;
class GmModuleControllerClassGetBySqlDynamicDomain extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Get${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.serviceCrud = new core_1.GmModuleServiceClassGetBySqlDynamicDomain(config, `this.${this.getServiceVarName()}`, {
            domain: GET_VAR_NAMES.domain,
            id: GET_VAR_NAMES.id,
        });
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config);
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodGetById = new core_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userInfo: GET_VAR_NAMES.userInfo,
            id: GET_VAR_NAMES.id,
        }).addProp({
            varName: GET_VAR_NAMES.domain,
            callVarName: GET_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.get(methodGetById);
        }
        this.addMethod(methodGetById);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
    }
    getServiceVarName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetBySqlDynamicDomain = GmModuleControllerClassGetBySqlDynamicDomain;
class GmModuleControllerClassGetAllBySqlDynamicDomain extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `GetAll${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new core_1.GmModuleServiceClassGetAllBySqlDynamicDomain(config, `this.${this.getServiceVarName()}`, {
            params: GET_ALL_VAR_NAMES.params,
            domain: GET_ALL_VAR_NAMES.domain,
        });
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodPagination = new core_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: GET_ALL_VAR_NAMES.params,
            userInfo: GET_ALL_VAR_NAMES.userInfo,
            paramsSchema: this.getValidatorParamsDtoVarName(),
        }).addProp({
            varName: GET_ALL_VAR_NAMES.domain,
            callVarName: GET_ALL_VAR_NAMES.domain,
            type: 'string',
            decorator: new core_1.GmDomainDec(),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.list(methodPagination);
        }
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `);
        this.addElementBeforeClass(`
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorParamsDtoVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`;
    }
    getServiceVarName() {
        return `getAll${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetAllBySqlDynamicDomain = GmModuleControllerClassGetAllBySqlDynamicDomain;
//# sourceMappingURL=index.js.map