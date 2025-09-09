import React from 'react';
import {GetComponentSwagger} from "@baseTypes/getters";
import {Oas3SelectorsSwagger} from "@baseTypes/oas3Selectors";
import {SpecActionsSwagger} from '@baseTypes/specActions';


interface Props {
    isOAS3: boolean,
    allowTryItOut: boolean,
    parametersVisible: boolean,
    operation: any,
    callbackVisible: boolean,
    oas3Selectors: Oas3SelectorsSwagger,
    pathMethod: string[],
    tryItOutEnabled: boolean,
    onTryoutClick: () => void;
    onResetClick: (pathMethod: string[]) => void;
    getComponent: GetComponentSwagger,
    setParametersVisible:(value:boolean)=>void
    setCallbackVisible:(value:boolean)=>void,
    onCancelClick:()=>void
}

const HeaderParamsSwagger = ({
                                 isOAS3,
                                 operation,
                                 callbackVisible,
                                 parametersVisible,
                                 allowTryItOut,
                                 pathMethod,
                                 onTryoutClick,
                                 oas3Selectors,
                                 tryItOutEnabled,
                                 onResetClick,
                                 getComponent,
                                 setParametersVisible,
                                 setCallbackVisible,
                                 onCancelClick,
                             }: Props) => {


    const TryItOutButton = getComponent('TryItOutButton')

    const toggleTab = (tab: string) => {
        if (tab === 'parameters') {
            setParametersVisible(true)
            setCallbackVisible(false)
        } else if (tab === 'callbacks') {
            setCallbackVisible(true)
            setParametersVisible(false)
        }
    }

    return (
        <>
            {isOAS3 ? (
                <div className="tab-header">
                    <div
                        onClick={() => toggleTab('parameters')}
                        className={`tab-item ${parametersVisible ? 'active' : ''}`}
                    >
                        <h4 className="opblock-title">
                            <span>Parameters</span>
                        </h4>
                    </div>
                    {operation.callbacks && (
                        <div
                            onClick={() => toggleTab('callbacks')}
                            className={`tab-item ${callbackVisible ? 'active' : ''}`}
                        >
                            <h4 className="opblock-title">
                                <span>Callbacks</span>
                            </h4>
                        </div>
                    )}
                </div>
            ) : (
                <div className="tab-header">
                    <h4 className="opblock-title">Parameters</h4>
                </div>
            )}
            {allowTryItOut && (
                <TryItOutButton
                    isOAS3={isOAS3}
                    hasUserEditedBody={oas3Selectors.hasUserEditedBody(...pathMethod)}
                    enabled={tryItOutEnabled}
                    onCancelClick={onCancelClick}
                    onTryoutClick={onTryoutClick}
                    onResetClick={() => onResetClick(pathMethod)}
                />
            )}
        </>
    );
};

export default HeaderParamsSwagger;
