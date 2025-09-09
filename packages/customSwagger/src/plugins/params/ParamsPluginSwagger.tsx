import React, {FC} from 'react'
import ParamsSwagger from './Params';
import {ParamsPropsSwagger} from "@plugins/params/types";


const ParamsCustomPlugin = () => {
    return {
        wrapComponents: {
            parameters: (Original: FC<any>, system: any) => (props: ParamsPropsSwagger) => {
                return <ParamsSwagger {...props} {...system} />
            },
        },
    }
}

export default ParamsCustomPlugin
