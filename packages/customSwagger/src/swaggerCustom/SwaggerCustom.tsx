import React from 'react'
import {useGetSwaggerSpec} from '../spec/hooks/useGetSwaggerSpec'
import "swagger-ui-react/swagger-ui.css";
import './darkTheme/dark.css'

import Spinner from "../ui/Spinner";
import SwaggerUiCustom from "./SwaggerUiCustom";

const SwaggerCustom = () => {


    const {
        spec,
        isLoading,
    } = useGetSwaggerSpec()


    if (isLoading) {
        return <Spinner/>
    }

    return (
        <SwaggerUiCustom
            spec={spec}
        />
    )
}

export default SwaggerCustom
