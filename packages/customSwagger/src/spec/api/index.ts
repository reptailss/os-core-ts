import {SpecSwagger} from '../types'
import {transformSwagger} from './transformSwagger'
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";

export const getSwaggerSpecApi = async (): Promise<SpecSwagger> => {
    const res = await fetch(`${getRootApiUrl()}swagger/swaggerSpec`, {
        method: 'GET',
        mode: 'cors',
    })

    const swagger = await res.json()
    return await transformSwagger(swagger)
}
