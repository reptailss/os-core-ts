import React, {useState} from "react";
import ParamsLayout from "@plugins/params/layouts/ParamsLayout";
import HeaderParamsSwagger from "@plugins/params/headerParams/HeaderParams";
import ParamsListSwagger from "@plugins/params/paramsList/ParamsListSwagger";
import ParamsCallbacksSwagger from "@plugins/params/paramsCallbacks/ParamsCallbacks";
import BodyParamsSwagger from "@plugins/params/body/BodyParamsSwagger";
import {ParamsPropsSwagger} from "@plugins/params/types";


const ParamsSwagger = ({
                           onTryoutClick,
                           onResetClick,
                           parameters,
                           allowTryItOut,
                           tryItOutEnabled,
                           specPath,
                           fn,
                           getComponent,
                           getConfigs,
                           specSelectors,
                           specActions,
                           pathMethod,
                           oas3Actions,
                           oas3Selectors,
                           operation,
                           onChangeKey,
                           onCancelClick,
                       }: ParamsPropsSwagger
) => {
    const [callbackVisible, setCallbackVisible] = useState<boolean>(false)
    const [parametersVisible, setParametersVisible] = useState<boolean>(true)

    const isExecute: boolean = tryItOutEnabled && allowTryItOut
    const isOAS3: boolean = specSelectors.isOAS3()
    const requestBody = operation.get('requestBody')

    return (
        <ParamsLayout
            header={<HeaderParamsSwagger
                isOAS3={isOAS3}
                operation={operation}
                callbackVisible={callbackVisible}
                setParametersVisible={setParametersVisible}
                setCallbackVisible={setCallbackVisible}
                parametersVisible={parametersVisible}
                allowTryItOut={allowTryItOut}
                pathMethod={pathMethod}
                onTryoutClick={onTryoutClick}
                oas3Selectors={oas3Selectors}
                tryItOutEnabled={tryItOutEnabled}
                onResetClick={onResetClick}
                getComponent={getComponent}
                onCancelClick={onCancelClick}
            />}
        >
            {parametersVisible && <ParamsListSwagger
                pathMethod={pathMethod}
                oas3Selectors={oas3Selectors}
                isExecute={isExecute}
                getComponent={getComponent}
                oas3Actions={oas3Actions}
                specSelectors={specSelectors}
                specActions={specActions}
                specPath={specPath}
                fn={fn}
                parameters={parameters}
                getConfigs={getConfigs}
                onChangeKey={onChangeKey}

            />}

            {callbackVisible && <ParamsCallbacksSwagger
                getComponent={getComponent}
                specPath={specPath}
                operation={operation}
            />}
            {
                isOAS3 &&
                requestBody &&
                parametersVisible &&
                <BodyParamsSwagger
                    pathMethod={pathMethod}
                    requestBody={requestBody}
                    oas3Selectors={oas3Selectors}
                    getConfigs={getConfigs}
                    oas3Actions={oas3Actions}
                    isExecute={isExecute}
                    specActions={specActions}
                    getComponent={getComponent}
                    specPath={specPath}
                />}
        </ParamsLayout>
    )
}

export default ParamsSwagger
