"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRoutePaths = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleRoutePaths extends core_1.GmAbstractModuleConstant {
    constructor(config) {
        super(config);
    }
    getPropertyName() {
        return `${_helpers_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_ROUTE_PATHS`;
    }
    getDirName() {
        return 'constants';
    }
    getFileName() {
        return 'routePaths.ts';
    }
    getRoutePathPropertyName(type) {
        return `${this.getPropertyName()}.${type}`;
    }
    init() {
        if (this.getConfig().model.type === 'byDatabaseNameAndYearMonth') {
            this.setBody(`
        {
            add:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'add')}',
            list:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'list')}',
        } as const`);
        }
        else {
            this.setBody(`
        {
            add:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'add')}',
            update:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'update')}/:id',
            delete:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'delete')}/:id',
            get:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'get')}/:id',
            list:'/${this.getModuleKey()}${core_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'list')}',
        } as const`);
        }
    }
    getModuleKey() {
        return _helpers_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural).toLowerCase();
    }
}
exports.GmModuleRoutePaths = GmModuleRoutePaths;
//# sourceMappingURL=GmModuleRoutePaths.js.map