import React from 'react';
import {GetComponentSwagger} from "@baseTypes/getters";

interface Props {
    getComponent: GetComponentSwagger;
    specPath: any;
    operation:any
}

const ParamsCallbacksSwagger = ({
                                    getComponent,
                                    specPath,
                                    operation,
                                }: Props) => {

    const Callbacks = getComponent('Callbacks', true)

    return (
        <div className="callbacks-container opblock-description-wrapper">

            <Callbacks
                callbacks={operation.callbacks}
                specPath={specPath.slice(0, -1).concat('callbacks')}
            />
        </div>
    );
};

export default ParamsCallbacksSwagger;
