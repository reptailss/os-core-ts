import {powerSetPermutationsCode} from "@ui/code/custom/helpers/powerSetPermutations";


const classNameCombinations = {};
export function getClassNameCombinationsCode(classNames:string[]) {
    if (classNames.length === 0 || classNames.length === 1) return classNames;
    const key = classNames.join('.');
    if (!classNameCombinations[key]) {
        classNameCombinations[key] = powerSetPermutationsCode(classNames);
    }
    return classNameCombinations[key];
}
