import {getClassNameCombinationsCode} from "@ui/code/custom/helpers/getClassNameCombinations";

export function createStyleObjectCode(classNames:string[], elementStyle:any = {}, stylesheet:any) {
    const nonTokenClassNames = classNames.filter(
        className => className !== 'token'
    );
    const classNamesCombinations = getClassNameCombinationsCode(nonTokenClassNames);
    return classNamesCombinations.reduce((styleObject, className) => {
        return {...styleObject, ...stylesheet[className]};
    }, elementStyle);
}
