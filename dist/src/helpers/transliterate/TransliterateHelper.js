"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransliterateHelper = void 0;
function invert(obj) {
    const inverted = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            inverted[obj[key]] = key;
        }
    }
    return inverted;
}
const baseLetters = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'д': 'd',
    'з': 'z',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'ь': '',
    'г': 'g',
    'и': 'i',
    'ъ': '',
    'ы': 'i',
    'э': 'e',
    'ґ': 'g',
    'е': 'e',
    'і': 'i',
    'є': 'ye',
    'ї': 'yi',
};
const associations = Object.assign(Object.assign({}, baseLetters), { 'г': 'g', 'и': 'i', 'э': 'e', 'ґ': 'g', 'е': 'e', 'і': 'i' });
const invertAssociations = invert(associations);
class TransliterateHelper {
    static transliterate(input, config) {
        if (!input) {
            return '';
        }
        const normalizedInput = input.normalize();
        let result = '';
        let isWordBoundary = false;
        for (let i = 0; i < normalizedInput.length; i++) {
            const isUpperCase = normalizedInput[i] === normalizedInput[i].toUpperCase();
            const strLowerCase = normalizedInput[i].toLowerCase();
            if (strLowerCase === ' ') {
                result += (config === null || config === void 0 ? void 0 : config.spaceReplacement) || ' ';
                isWordBoundary = true;
                continue;
            }
            const replacement = (isWordBoundary ? associations[strLowerCase] : baseLetters[strLowerCase]) || strLowerCase;
            result += isUpperCase ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
            isWordBoundary = false;
        }
        return result;
    }
    static reverseTransliterate(input) {
        if (!input) {
            return '';
        }
        let result = '';
        let i = 0;
        while (i < input.length) {
            const digraph = input.slice(i, i + 2).toLowerCase();
            const letter = input[i].toLowerCase();
            const replacement = invertAssociations[digraph] || digraph;
            result += replacement || letter;
            i += replacement && replacement.length === 2 ? 2 : 1;
        }
        return result;
    }
}
exports.TransliterateHelper = TransliterateHelper;
//# sourceMappingURL=TransliterateHelper.js.map