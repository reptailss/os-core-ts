import React from 'react';
import GroupParamsSwagger from "@plugins/params/groupParams/GroupParams";
import {ParameterSwagger} from "@baseTypes/params";
import {GetComponentSwagger, GetConfigsSwagger} from "@baseTypes/getters";
import {SpecSelectorsSwagger} from "@baseTypes/specSelectorsSwagger";
import {Oas3ActionsSwagger} from "@baseTypes/oas3Actions";
import {Oas3SelectorsSwagger} from "@baseTypes/oas3Selectors";
import {SpecPathSwagger} from "@baseTypes/specPath";
import { SpecActionsSwagger } from '@baseTypes/specActions';
import {GroupedParamsSwagger} from "@plugins/params/types";
import {groupedParamsSwagger} from "@plugins/params/groupParams/helpers/groupedParams";
import {FnSwagger} from "@baseTypes/fn";


interface Props {
    specPath: SpecPathSwagger;
    fn: FnSwagger;
    getComponent: GetComponentSwagger;
    getConfigs: GetConfigsSwagger;
    specSelectors: SpecSelectorsSwagger;
    specActions: SpecActionsSwagger;
    oas3Actions: Oas3ActionsSwagger;
    oas3Selectors: Oas3SelectorsSwagger;
    pathMethod: string[];
    isExecute: boolean;
    onChangeKey: string[];
    parameters:ParameterSwagger[]
}

const ParamsListSwagger = ({
                               pathMethod,
                               oas3Selectors,
                               isExecute,
                               getComponent,
                               oas3Actions,
                               specSelectors,
                               specActions,
                               specPath,
                               fn,
                               getConfigs,
                               onChangeKey,
                               parameters,
                           }: Props) => {


    const groupedParametersArr: ParameterSwagger[] = Object.values(
        parameters.reduce<Record<string, ParameterSwagger[]>>((acc, param) => {
            const key = param.get('in')
            acc[key] = acc[key] || []
            acc[key].push(param)
            return acc
        }, {}),
    ).flat()

    const groups: GroupedParamsSwagger[] = groupedParamsSwagger({
        params: groupedParametersArr,
        specSelectors,
        pathMethod,
    })

    const onChange = (
        param: ParameterSwagger,
        value: any,
        isXml: boolean = false
    ) => {
        specActions.changeParamByIdentity(onChangeKey, param, value, isXml)
    }

    const onChangeConsumesWrapper = (val: any) => {
        specActions.changeConsumesValue(onChangeKey, val)
    }

    return (
        <div className="parameters-container">
            {!groupedParametersArr.length ? (
                <div className="opblock-description-wrapper">
                    <p>No parameters</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="parameters">
                        <thead>
                        <tr>
                            <th className="col_header parameters-col_name">Name</th>
                            <th className="col_header parameters-col_description">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groups.map((group) => (
                            <GroupParamsSwagger
                                groupValue={group.groupValue}
                                params={group.params}
                                fn={fn}
                                specPath={specPath}
                                getComponent={getComponent}
                                getConfigs={getConfigs}
                                key={group.groupValue}
                                onChange={onChange}
                                onChangeConsumesWrapper={onChangeConsumesWrapper}
                                specSelectors={specSelectors}
                                specActions={specActions}
                                oas3Actions={oas3Actions}
                                oas3Selectors={oas3Selectors}
                                pathMethod={pathMethod}
                                isExecute={isExecute}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ParamsListSwagger;
