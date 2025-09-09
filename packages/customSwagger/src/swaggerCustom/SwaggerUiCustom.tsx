import React, {useCallback} from 'react'
import {GenerateFormDataCustomSwaggerPlugin} from '../plugins/formData/GenerateFormData'
import SwaggerUI from 'swagger-ui-react'
import {SpecSwagger} from '../spec/types'
import ParamsCustomPlugin from '../plugins/params/ParamsPluginSwagger'

interface Props {
    spec: SpecSwagger | null
}

const SwaggerUiCustom = ({spec}: Props) => {

        const onComplete = useCallback((swaggerUIInstance: any) => {

            if (!swaggerUIInstance || !spec?.defaultAuthToken) {
                return
            }
            swaggerUIInstance.authActions.authorize({
                BearerAuth: {
                    name: 'BearerAuth',
                    schema: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: '',
                    },
                    value: spec.defaultAuthToken,
                },
            })
        }, [spec])

        return (
            <SwaggerUI
                requestInterceptor={(request) => GenerateFormDataCustomSwaggerPlugin({
                    request: request as any,
                    spec: spec,
                })}
                deepLinking={true}
                plugins={[ParamsCustomPlugin]}
                spec={spec as any}
                onComplete={onComplete}
            />
        )
    }


export default SwaggerUiCustom
