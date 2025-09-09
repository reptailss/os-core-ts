import { ParameterSwagger } from "@baseTypes/params";
import { SpecSelectorsSwagger } from "@baseTypes/specSelectorsSwagger";

interface Props {
    params: ParameterSwagger[] | undefined;
    specSelectors: SpecSelectorsSwagger;
    pathMethod: string[];
}

export const getHasErrorsGroupSwagger = ({
                          params,
                          specSelectors,
                          pathMethod,
                      }: Props): boolean => {
    if (!params?.length) {
        return false
    }
    let res = false
    params.forEach((parameter) => {
        const param = specSelectors
            ? specSelectors.parameterWithMetaByIdentity(pathMethod, parameter)
            : parameter
        const errors = param.get('errors')

        if (!errors) {
            return
        }
        const count: number = errors.count()
        if (count >= 1) {
            res = true
        }
    })
    return res
}
