"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
class FileHelper {
    static getUniqName({ originalName, format, subPathMiddle, subPathStart, } = {}) {
        const randomString = Date.now() + '-' + Math.floor(Math.random() * 100);
        const formatFromName = originalName ? this.getFormatFromName(originalName) : '';
        const formatStr = format ? `.${format}` : formatFromName ? `.${formatFromName}` : '';
        const subPathMiddleStr = subPathMiddle ? `${subPathStart ? '/' : ''}${subPathMiddle}` : '';
        return `${subPathStart || ''}${subPathMiddleStr}-${randomString}${formatStr}`;
    }
    static getFormatFromName(name) {
        const arr = name.split('.');
        if ((arr === null || arr === void 0 ? void 0 : arr.length) < 2) {
            return '';
        }
        return arr[arr.length - 1];
    }
}
exports.FileHelper = FileHelper;
//# sourceMappingURL=FileHelper.js.map