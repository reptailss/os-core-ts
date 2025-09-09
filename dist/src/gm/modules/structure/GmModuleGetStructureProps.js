"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleGetStructureProps = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleAbstractMethodGetStructureProps extends core_1.GmAbstractModuleClassMethod {
    constructor(config, methodName, callVarNames) {
        super(config);
        this.methodName = methodName;
        this.callVarNames = callVarNames;
        this.gmModuleRoutePaths = new core_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return this.methodName;
    }
    init() {
        this.addModule(this.gmModuleRoutePaths);
        this.setMethodScope('static');
        this.setAsyncType('sync');
        this.setPropsType('object');
        this.addProp({
            type: 'number',
            varName: 'openUserId',
            callVarName: this.callVarNames.openUserId,
            decorator: null,
        });
        this.addProp({
            type: 'number',
            varName: 'legalEntityId',
            callVarName: this.callVarNames.legalEntityId,
            decorator: null,
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'CheckStructureAccessProps',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'StructureServiceEndpointsHelper',
        });
        this.setReturnType('CheckStructureAccessProps');
        this.appendBodyElement({
            name: 'returnProps',
            value: `
                return {
                    service,
                    endpoint:StructureServiceEndpointsHelper.getEndpointKeyFromRoutePath(${this.gmModuleRoutePaths.getRoutePathPropertyName(this.methodName)}),
                    legalEntityId,
                    openUserId,
                }
            `,
        });
    }
}
class GmModuleCreateMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(config, callVarNames) {
        super(config, 'add', callVarNames);
    }
}
class GmModuleUpdateMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(config, callVarNames) {
        super(config, 'update', callVarNames);
    }
}
class GmModuleDeleteMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(config, callVarNames) {
        super(config, 'delete', callVarNames);
    }
}
class GmModuleGetByIdMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(config, callVarNames) {
        super(config, 'get', callVarNames);
    }
}
class GmModuleListMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(config, callVarNames) {
        super(config, 'list', callVarNames);
    }
}
class GmModuleGetStructureProps extends core_1.GmAbstractModuleClass {
    constructor(config, varNames) {
        super(config);
        this.varNames = varNames;
        if (config.model.type === 'byDatabaseNameAndYearMonth') {
            this.api = {
                add: () => `${this.getPropertyName()}.${this.getMethodByIndex(0).renderMethodCall()}`,
                update: () => '',
                delete: () => '',
                get: () => '',
                list: () => `${this.getPropertyName()}.${this.getMethodByIndex(1).renderMethodCall()}`,
            };
        }
        else {
            this.api = {
                add: () => `${this.getPropertyName()}.${this.getMethodByIndex(0).renderMethodCall()}`,
                update: () => `${this.getPropertyName()}.${this.getMethodByIndex(1).renderMethodCall()}`,
                delete: () => `${this.getPropertyName()}.${this.getMethodByIndex(2).renderMethodCall()}`,
                get: () => `${this.getPropertyName()}.${this.getMethodByIndex(3).renderMethodCall()}`,
                list: () => `${this.getPropertyName()}.${this.getMethodByIndex(4).renderMethodCall()}`,
            };
        }
    }
    getPropertyName() {
        return `Get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}StructureProps`;
    }
    getDirName() {
        return 'structure';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreAppConfig',
        });
        this.addElementBeforeClass('const service = OsCoreAppConfig.getServiceKey()');
        if (this.getConfig().model.type === 'byDatabaseNameAndYearMonth') {
            this.addMethod(new GmModuleCreateMethodGetStructureProps(this.getConfig(), this.varNames.add));
            this.addMethod(new GmModuleListMethodGetStructureProps(this.getConfig(), this.varNames.list));
        }
        else {
            this.addMethod(new GmModuleCreateMethodGetStructureProps(this.getConfig(), this.varNames.add));
            this.addMethod(new GmModuleUpdateMethodGetStructureProps(this.getConfig(), this.varNames.update));
            this.addMethod(new GmModuleDeleteMethodGetStructureProps(this.getConfig(), this.varNames.delete));
            this.addMethod(new GmModuleGetByIdMethodGetStructureProps(this.getConfig(), this.varNames.get));
            this.addMethod(new GmModuleListMethodGetStructureProps(this.getConfig(), this.varNames.list));
        }
    }
}
exports.GmModuleGetStructureProps = GmModuleGetStructureProps;
//# sourceMappingURL=GmModuleGetStructureProps.js.map