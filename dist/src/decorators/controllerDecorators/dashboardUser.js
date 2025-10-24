"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUser = void 0;
const core_1 = require("../core");
const DashboardUser = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'DashboardUser',
            },
        });
    };
};
exports.DashboardUser = DashboardUser;
//# sourceMappingURL=dashboardUser.js.map