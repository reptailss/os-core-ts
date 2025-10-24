"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const _di_1 = require("../../di");
function Injectable(options = {}) {
    return (target) => {
        _di_1.DiContainer.register(target, { lifetime: options.lifetime || 'singleton' });
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.js.map