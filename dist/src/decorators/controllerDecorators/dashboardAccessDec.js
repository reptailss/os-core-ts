"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardAccessDec = void 0;
const core_1 = require("../core");
const DashboardAccessDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'DashboardAccessDec',
        },
    });
};
exports.DashboardAccessDec = DashboardAccessDec;
//# sourceMappingURL=dashboardAccessDec.js.map