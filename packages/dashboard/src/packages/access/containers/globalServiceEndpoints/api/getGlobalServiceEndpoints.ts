import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize';
import {
    DeleteGlobalServiceEndpointParams,
    DeleteGlobalServiceEndpointsParams,
    GetGlobalServiceEndpointsParams,
    GlobalServiceEndpointsResponse
} from "@packages/access/containers/globalServiceEndpoints/types";
import {
    buildGlobalServiceEndpointsFilters
} from "@packages/access/containers/globalServiceEndpoints/api/helpers/buildGlobalServiceEndpointsFilters";
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl';


export const getGlobalServiceEndpointsApi = async ({
                                                       page,
                                                       perPage,
                                                       order,
                                                       orderBy,
                                                       serviceKey,
                                                       type,
                                                   }: GetGlobalServiceEndpointsParams): Promise<GlobalServiceEndpointsResponse> => {
    return await apiRequestWithAuth<GlobalServiceEndpointsResponse>({
        url: `${getRootApiUrl()}global-service-endpoints/list?` + serialize({
            page,
            per_page: perPage,
            order: {
                [orderBy]: order
            },
            ...buildGlobalServiceEndpointsFilters({
                serviceKey,
                type,
            })
        }),
        options: {
            method: 'GET',
        },
    })
}

export const deleteGlobalServiceEndpointsApi = async ({
                                                          serviceKey,
                                                      }: DeleteGlobalServiceEndpointsParams) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}global-service-endpoints/delete-by-service?` + serialize({
            service_key: serviceKey
        }),
        options: {
            method: 'DELETE',
        },
    })
}

export const deleteGlobalServiceEndpointApi = async ({
                                                         serviceKey,
                                                         endpoint,
                                                     }: DeleteGlobalServiceEndpointParams) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}global-service-endpoints/delete-service-endpoint?` + serialize({
            service_key: serviceKey,
            endpoint
        }),
        options: {
            method: 'DELETE',
        },
    })
}