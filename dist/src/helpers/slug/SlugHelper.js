"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugHelper = void 0;
const _helpers_1 = require("..");
class SlugHelper {
    static generateSlug(input, options) {
        const res = input
            .trim()
            .replace(/[^a-zA-Zа-яА-ЯёЁїЇєЄґҐіІ]/g, '-')
            .toLocaleLowerCase();
        return _helpers_1.TransliterateHelper.transliterate(res, options);
    }
}
exports.SlugHelper = SlugHelper;
//# sourceMappingURL=SlugHelper.js.map