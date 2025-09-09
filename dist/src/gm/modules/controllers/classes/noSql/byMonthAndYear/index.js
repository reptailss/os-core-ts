"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllByNoSqlMonthAndYear = exports.GmModuleControllerClassCreateByNoSqlMonthAndYear = exports.GmModuleControllerClassCrudByNoSqlMonthAndYear = void 0;
const core_1 = require("../../../../../core");
const _helpers_1 = require("../../../../../../helpers");
class GmGetVarNamesByMonthAndYear {
    constructor(config) {
        this.config = config;
    }
    userInfo() {
        return 'userInfo';
    }
    add() {
        const createBody = 'body';
        return {
            openUserId: `${this.userInfo()}.open_user_id`,
            createBody,
            createBodySchema: `create${_helpers_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            legalEntityId: `${createBody}.legal_entity_id`,
            createBodyType: !core_1.GmConfigChecker.hasStructureAccess(this.config, 'add') ||
                core_1.GmConfigChecker.hasStructureAccess(this.config, 'add') && this.checkHasLeIdColumn()
                ? undefined : `Create${_helpers_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body`,
        };
    }
    update() {
        const updateBody = 'body';
        return {
            updateBody,
            updateBodySchema: `update${_helpers_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: `${updateBody}.legal_entity_id`,
            updateBodyType: core_1.GmConfigChecker.hasStructureAccess(this.config, 'update') ? `Update${_helpers_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body` : undefined,
        };
    }
    delete() {
        return {
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    get() {
        return {
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    list() {
        return {
            params: 'params',
            dateStart: 'dateStart',
            dateEnd: 'dateEnd',
            paramsSchema: `${_helpers_1.StringCaseHelper.toCamelCase(this.config.dtoName.singular)}DtoPaginationQueryParamsSchema`,
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    checkHasLeIdColumn() {
        return 'legal_entity_id' in this.config.model.columns &&
            (this.config.model.columns.legal_entity_id.type === 'INTEGER' ||
                this.config.model.columns.legal_entity_id.type === 'BIGINT');
    }
}
class GmAccessStructureMethodProcessorByMonthAndYear extends core_1.GmAccessStructureMethodProcessor {
    constructor(config) {
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        super(config, {
            add: {
                openUserId: gmGetVarNames.add().openUserId,
                legalEntityId: gmGetVarNames.add().legalEntityId,
            },
            update: {
                openUserId: gmGetVarNames.update().openUserId,
                legalEntityId: gmGetVarNames.update().legalEntityId,
            },
            delete: {
                openUserId: gmGetVarNames.delete().openUserId,
                legalEntityId: gmGetVarNames.delete().legalEntityId,
            },
            get: {
                openUserId: gmGetVarNames.get().openUserId,
                legalEntityId: gmGetVarNames.get().legalEntityId,
            },
            list: {
                openUserId: gmGetVarNames.list().openUserId,
                legalEntityId: gmGetVarNames.list().legalEntityId,
            },
        });
    }
    list(method) {
        super.list(method);
        method.appendPropDecorator({
            decorator: new core_1.GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        });
    }
}
class GmValidatorBuilderByMonthAndYear {
    constructor(config, validatorVarName, validator) {
        this.config = config;
        this.validatorVarName = validatorVarName;
        this.validator = validator;
        this.gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.gmServiceValidator = new core_1.GmServiceValidator();
        this.gmServiceSchemaValidatorType = new core_1.GmServiceSchemaValidatorType();
    }
    initValidator() {
        return `const ${this.validatorVarName} = new ${this.validator.getPropertyName()}()`;
    }
    add() {
        const schemaTypeStr = this.gmGetVarNames.add().createBodyType ? ` :${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmGetVarNames.add().createBodyType || '')}` : '';
        if (!core_1.GmConfigChecker.hasStructureAccess(this.config, 'add')) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`;
        }
        if (this.gmGetVarNames.checkHasLeIdColumn()) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`;
        }
        return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})`;
    }
    list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`;
    }
    checkHasAddValidatorService(type) {
        return core_1.GmConfigChecker.hasStructureAccess(this.config, type) && !this.gmGetVarNames.checkHasLeIdColumn();
    }
}
class GmModuleControllerClassCrudByNoSqlMonthAndYear extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.gmServiceDateHelper = new core_1.GmServiceDateHelper();
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(config, this.getValidatorVarName(), this.validator);
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.serviceCrud = new core_1.GmModuleServiceClassCrudByNoSqlMonthAndYear(config, `this.${this.getServiceVarName()}`, {
            create: {
                createDto: gmGetVarNames.add().createBody,
                initiatorOpenUserId: gmGetVarNames.add().openUserId,
                month: this.gmServiceDateHelper.getCurrentMonth(),
                year: this.gmServiceDateHelper.getCurrentYear(),
            },
            getPagination: {
                params: gmGetVarNames.list().params,
                dateStart: gmGetVarNames.list().dateStart,
                dateEnd: gmGetVarNames.list().dateEnd,
            },
        });
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config);
        this.gmGetVarNames = gmGetVarNames;
        this.gmModuleCreateDto = new core_1.GmModuleCreateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addService(this.gmServiceDateHelper);
        if (this.gmValidatorBuilder.checkHasAddValidatorService('add')) {
            this.addService(new core_1.GmServiceValidator());
            this.addService(new core_1.GmServiceSchemaValidatorType());
            this.addModule(this.gmModuleCreateDto);
        }
        const methodCreate = new core_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            createDtoType: this.gmGetVarNames.add().createBodyType,
            userInfo: this.gmGetVarNames.userInfo(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.add(methodCreate);
        }
        const methodPagination = new core_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: this.gmGetVarNames.list().params,
            userInfo: this.gmGetVarNames.userInfo(),
            paramsSchema: this.gmGetVarNames.list().paramsSchema,
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateStart,
            callVarName: this.gmGetVarNames.list().dateStart,
            decorator: new core_1.GmQueryParamDateDec('date_start'),
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateEnd,
            callVarName: this.gmGetVarNames.list().dateEnd,
            decorator: new core_1.GmQueryParamDateDec('date_end'),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.list(methodPagination);
        }
        this.addMethod(methodCreate);
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `);
        }
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
             
            ${this.gmValidatorBuilder.add()}
              
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCrudByNoSqlMonthAndYear = GmModuleControllerClassCrudByNoSqlMonthAndYear;
class GmModuleControllerClassCreateByNoSqlMonthAndYear extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Create${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.gmServiceDateHelper = new core_1.GmServiceDateHelper();
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(config, this.getValidatorVarName(), this.validator);
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.serviceCrud = new core_1.GmModuleServiceClassCreateByNoSqlMonthAndYear(config, `this.${this.getServiceVarName()}`, {
            createDto: gmGetVarNames.add().createBody,
            initiatorOpenUserId: gmGetVarNames.add().openUserId,
            month: this.gmServiceDateHelper.getCurrentMonth(),
            year: this.gmServiceDateHelper.getCurrentYear(),
        });
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config);
        this.gmGetVarNames = gmGetVarNames;
        this.gmModuleCreateDto = new core_1.GmModuleCreateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addService(this.gmServiceDateHelper);
        if (this.gmValidatorBuilder.checkHasAddValidatorService('add')) {
            this.addService(new core_1.GmServiceValidator());
            this.addService(new core_1.GmServiceSchemaValidatorType());
            this.addModule(this.gmModuleCreateDto);
        }
        const methodCreate = new core_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            createDtoType: this.gmGetVarNames.add().createBodyType,
            userInfo: this.gmGetVarNames.userInfo(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.add(methodCreate);
        }
        this.addMethod(methodCreate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `);
        }
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
             
            ${this.gmValidatorBuilder.add()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCreateByNoSqlMonthAndYear = GmModuleControllerClassCreateByNoSqlMonthAndYear;
class GmModuleControllerClassGetAllByNoSqlMonthAndYear extends core_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `GetAll${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new core_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(config, this.getValidatorVarName(), this.validator);
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.serviceCrud = new core_1.GmModuleServiceClassGetAllByNoSqlMonthAndYear(config, `this.${this.getServiceVarName()}`, {
            params: gmGetVarNames.list().params,
            dateStart: gmGetVarNames.list().dateStart,
            dateEnd: gmGetVarNames.list().dateEnd,
        });
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config);
        this.gmGetVarNames = gmGetVarNames;
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodPagination = new core_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: this.gmGetVarNames.list().params,
            userInfo: this.gmGetVarNames.userInfo(),
            paramsSchema: this.gmGetVarNames.list().paramsSchema,
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateStart,
            callVarName: this.gmGetVarNames.list().dateStart,
            decorator: new core_1.GmQueryParamDateDec('date_start'),
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateEnd,
            callVarName: this.gmGetVarNames.list().dateEnd,
            decorator: new core_1.GmQueryParamDateDec('date_end'),
        });
        if (core_1.GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.list(methodPagination);
        }
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
             
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getValidatorVarName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `getAll${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetAllByNoSqlMonthAndYear = GmModuleControllerClassGetAllByNoSqlMonthAndYear;
//# sourceMappingURL=index.js.map