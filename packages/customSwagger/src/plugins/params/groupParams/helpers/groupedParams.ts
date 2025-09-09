import {ParameterSwagger} from "@baseTypes/params";
import {SpecSelectorsSwagger} from "@baseTypes/specSelectorsSwagger";
import {GroupedParamsSwagger} from "@plugins/params/types";


interface Props {
    params?: ParameterSwagger[];
    specSelectors: SpecSelectorsSwagger;
    pathMethod: string[];
}

export const groupedParamsSwagger = ({
                                         params,
                                         specSelectors,
                                         pathMethod,
                                     }: Props): GroupedParamsSwagger[] => {
    if (!params?.length) {
        return []
    }
    const map: Record<string, ParameterSwagger[]> = {}

    params.forEach((parameter) => {
        const param = specSelectors.parameterWithMetaByIdentity(pathMethod, parameter) || parameter
        const name: string = param.get('name')
        const groupValue = name?.split('[')[0]
        if (!(groupValue in map)) {
            map[groupValue] = []
        }
        map[groupValue].push(parameter)
    })

    return Object.entries(map).map(([groupValue, params]) => ({
        groupValue,
        params,
    }))
}
