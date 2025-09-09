import {ParameterSwagger} from "@baseTypes/params";
import { SpecSelectorsSwagger } from "@baseTypes/specSelectorsSwagger";

interface Props {
    params: ParameterSwagger[] | undefined;
    specSelectors: SpecSelectorsSwagger;
    pathMethod: string[];
}

export const getHasRequiredGroupSwagger = ({
                                          params,
                                          specSelectors,
                                          pathMethod,
                                      }: Props): boolean => {
    return !!params?.find((parameter) => {

        const param = specSelectors ? specSelectors.parameterWithMetaByIdentity(pathMethod, parameter) : parameter

        return param.get('required')
    })
}
