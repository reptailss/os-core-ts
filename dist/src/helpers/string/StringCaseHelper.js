"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringCaseHelper = void 0;
class StringCaseHelper {
    static toCamelCase(str) {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_\s-]+/g, ' ')
            .toLowerCase()
            .split(' ')
            .map((word, index) => index === 0
            ? word
            : word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
            .replace(/^./, (match) => match.toLowerCase());
    }
    static toPascalCase(str) {
        return str
            .split(/[_\s-]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }
    static toSnakeCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }
    static toSnakeUpperCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toUpperCase();
    }
    static toKebabCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }
}
exports.StringCaseHelper = StringCaseHelper;
//# sourceMappingURL=StringCaseHelper.js.map