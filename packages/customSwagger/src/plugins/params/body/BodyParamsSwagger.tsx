import React from 'react';
import {ParameterSwagger} from "@baseTypes/params";
import {GetComponentSwagger, GetConfigsSwagger} from "@baseTypes/getters";
import {Oas3SelectorsSwagger} from "@baseTypes/oas3Selectors";
import {Oas3ActionsSwagger} from "@baseTypes/oas3Actions";
import {SpecPathSwagger} from "@baseTypes/specPath";
import {SpecActionsSwagger} from '@baseTypes/specActions';
import {RequestBody} from "@baseTypes/requestBody";
import { Map, List } from "immutable"


interface Props {
    requestBody: RequestBody,
    isExecute: boolean,
    specPath: SpecPathSwagger,
    oas3Actions: Oas3ActionsSwagger;
    oas3Selectors: Oas3SelectorsSwagger;
    getConfigs: GetConfigsSwagger;
    pathMethod: string[];
    getComponent: GetComponentSwagger,
    specActions: SpecActionsSwagger
}

const BodyParamsSwagger = ({
                               pathMethod,
                               requestBody,
                               oas3Selectors,
                               getConfigs,
                               oas3Actions,
                               isExecute,
                               getComponent,
                               specPath,
                               specActions,
                           }: Props) => {

    const RequestBody = getComponent('RequestBody', true)
    const ContentType = getComponent('contentType')


    const regionId = `${pathMethod[1]}${pathMethod[0]}_requests`.replace(/\W/g, '_')
    const controlId = `${regionId}_select`

    const onChangeMediaType = ({value, pathMethod}: { value: string; pathMethod: string[] }) => {

        const userHasEditedBody = oas3Selectors.hasUserEditedBody(...pathMethod)
        const shouldRetainRequestBodyValue = oas3Selectors.shouldRetainRequestBodyValue(...pathMethod)
        oas3Actions.setRequestContentType({ value, pathMethod })
        oas3Actions.initRequestBodyValidateError({ pathMethod })
        if (!userHasEditedBody) {
            if(!shouldRetainRequestBodyValue) {
                oas3Actions.setRequestBodyValue({ value: undefined, pathMethod })
            }
            specActions.clearResponse(...pathMethod)
            specActions.clearRequest(...pathMethod)
            specActions.clearValidateParams(pathMethod)
        }
    }

    const retainRequestBodyValueFlagForOperation = (f: boolean) => {
        return oas3Actions.setRetainRequestBodyValueFlag({value: f, pathMethod})
    }

    return (
        <div className="opblock-section opblock-section-request-body">
            <div className="opblock-section-header">
                <h4 className={`opblock-title parameter__name ${requestBody.get('required') ? 'required' : ''}`}>
                    Request body
                </h4>
                <label htmlFor={controlId}>
                    <ContentType
                        value={oas3Selectors.requestContentType(...pathMethod)}
                        contentTypes={requestBody.get("content", List()).keySeq()}
                        onChange={(value: string) => onChangeMediaType({value, pathMethod})}
                        className="body-param-content-type"
                        ariaLabel="Request content type"
                        controlId={controlId}
                    />
                </label>
            </div>
            <div
                className="opblock-description-wrapper"
            >
                <RequestBody
                    setRetainRequestBodyValueFlag={retainRequestBodyValueFlagForOperation}
                    userHasEditedBody={oas3Selectors.hasUserEditedBody(...pathMethod)}
                    specPath={specPath.slice(0, -1).push("requestBody")}
                    requestBody={requestBody}
                    requestBodyValue={oas3Selectors.requestBodyValue(...pathMethod)}
                    requestBodyInclusionSetting={oas3Selectors.requestBodyInclusionSetting(...pathMethod)}
                    requestBodyErrors={oas3Selectors.requestBodyErrors(...pathMethod)}
                    isExecute={isExecute}
                    getConfigs={getConfigs}
                    activeExamplesKey={oas3Selectors.activeExamplesMember(
                        ...pathMethod,
                        "requestBody",
                        "requestBody", // RBs are currently not stored per-mediaType
                    )}
                    updateActiveExamplesKey={ key => {
                        oas3Actions.setActiveExamplesMember({
                            name: key,
                            pathMethod: pathMethod,
                            contextType: "requestBody",
                            contextName: "requestBody", // RBs are currently not stored per-mediaType
                        })
                    }
                    }
                    onChange={(value, path) => {
                        if (path) {
                            const lastValue = oas3Selectors.requestBodyValue(...pathMethod)
                            const usableValue = Map.isMap(lastValue) ? lastValue : Map()
                            return oas3Actions.setRequestBodyValue({
                                pathMethod,
                                value: usableValue.setIn(path, value),
                            })
                        }
                        oas3Actions.setRequestBodyValue({ value, pathMethod })
                    }}
                    onChangeIncludeEmpty={(name, value) => {
                        oas3Actions.setRequestBodyInclusion({
                            pathMethod,
                            value,
                            name,
                        })
                    }}
                    contentType={oas3Selectors.requestContentType(...pathMethod)} />
            </div>
        </div>
    );
};

export default BodyParamsSwagger;
