import {GetComponentSwagger, GetConfigsSwagger} from "@baseTypes/getters";
import {ParameterSwagger} from "@baseTypes/params";
import React, {FC} from "react";
import {Oas3ActionsSwagger} from "@baseTypes/oas3Actions";
import {Oas3SelectorsSwagger} from "@baseTypes/oas3Selectors";
import {getHasRequiredGroupSwagger} from "@plugins/params/groupParams/helpers/getHasRequired";
import {getHasErrorsGroupSwagger} from "@plugins/params/groupParams/helpers/getHasErrors";
import {SpecSelectorsSwagger} from "@baseTypes/specSelectorsSwagger";
import ParamAccordionSwagger from "@plugins/params/paramAccordion/ParamAccordion";
import {SpecActionsSwagger} from "@baseTypes/specActions";
import {FnSwagger} from "@baseTypes/fn";
import {SpecPathSwagger} from "@baseTypes/specPath";


interface Props {
    fn: FnSwagger;
    specPath: SpecPathSwagger;
    groupValue: string;
    params: ParameterSwagger[];
    getComponent: GetComponentSwagger;
    getConfigs: GetConfigsSwagger;
    specSelectors: SpecSelectorsSwagger;
    onChange: (param: ParameterSwagger, value: any, isXml?: boolean) => void;
    specActions: SpecActionsSwagger;
    oas3Actions: Oas3ActionsSwagger;
    oas3Selectors: Oas3SelectorsSwagger;
    pathMethod: string[];
    isExecute: boolean;
    onChangeConsumesWrapper: (val: any) => void;
}

const GroupParamsSwagger: FC<Props> = ({
                                           groupValue,
                                           params,
                                           fn,
                                           specPath,
                                           getComponent,
                                           getConfigs,
                                           specSelectors,
                                           onChange,
                                           specActions,
                                           oas3Actions,
                                           oas3Selectors,
                                           pathMethod,
                                           isExecute,
                                           onChangeConsumesWrapper,
                                       }: Props) => {

    const ParameterRow = getComponent('parameterRow')

    const list = params.map((parameter, i) => {
        const inValue: string = parameter.get('in')
        const name: string = parameter.get('name')
        return (
            <ParameterRow
                fn={fn}
                specPath={specPath.push(i.toString())}
                getComponent={getComponent}
                getConfigs={getConfigs}
                rawParam={parameter}
                param={specSelectors.parameterWithMetaByIdentity(pathMethod, parameter)}
                key={`${inValue}.${name}`}
                onChange={onChange}
                onChangeConsumes={onChangeConsumesWrapper}
                specSelectors={specSelectors}
                specActions={specActions}
                oas3Actions={oas3Actions}
                oas3Selectors={oas3Selectors}
                pathMethod={pathMethod}
                isExecute={isExecute}
            />
        )
    })

    if (params.length <= 2) {
        return list
    }

    const required = getHasRequiredGroupSwagger({
        params,
        pathMethod,
        specSelectors,
    })
    const error = getHasErrorsGroupSwagger({
        params,
        pathMethod,
        specSelectors,
    })

    return (
        <ParamAccordionSwagger
            groupValue={groupValue}
            error={error}
            required={required}
        >
            {list}
        </ParamAccordionSwagger>
    )
}

export default GroupParamsSwagger
