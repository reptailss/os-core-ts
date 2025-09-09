import React from 'react';
import Spinner from "@ui/spinner/Spinner";
import {
    useGetGlobalServiceEndpointsListState
} from "@packages/access/containers/globalServiceEndpoints/list/hooks/useGetGlobalServiceEndpointsListState";
import {
    useGetGlobalServiceEndpoints
} from "@packages/access/containers/globalServiceEndpoints/hooks/useGetGlobalServiceEndpoints";
import GlobalServiceEndpointsListView
    from "@packages/access/containers/globalServiceEndpoints/list/view/GlobalServiceEndpointsListView";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";
import GlobalServiceEndpointsListSidebar
    from "@packages/access/containers/globalServiceEndpoints/list/view/sidebar/GlobalServiceEndpointsListSidebar";
import {
    deleteGlobalServiceEndpointApi,
    deleteGlobalServiceEndpointsApi
} from "@packages/access/containers/globalServiceEndpoints/api/getGlobalServiceEndpoints";
import Stack from '@mui/material/Stack';


const GlobalServiceEndpointsList = () => {

    const globalServiceEndpointsListState = useGetGlobalServiceEndpointsListState()

    const {
        getGlobalEndpoints,
        totalPage,
        globalServiceEndpointsList,
        isLoading
    } = useGetGlobalServiceEndpoints()

    const onChangeSort = ({
                              order,
                              orderBy,
                          }: {
        order: 'desc' | 'asc',
        orderBy: keyof GlobalServiceEndpoints
    }) => {
        getGlobalEndpoints({
            page: globalServiceEndpointsListState.page,
            perPage: 20,
            orderBy,
            order,
            serviceKey: globalServiceEndpointsListState.serviceKey,
            type: globalServiceEndpointsListState.type,
        })
    }

    const onChangePage = (page: number) => {
        getGlobalEndpoints({
            page,
            perPage: 20,
            orderBy: globalServiceEndpointsListState.orderBy,
            order: globalServiceEndpointsListState.order,
            serviceKey: globalServiceEndpointsListState.serviceKey,
            type: globalServiceEndpointsListState.type,
        })
    }

    const onDeleteServiceEndpoints = async (
        globalServiceEndpoints: GlobalServiceEndpoints
    ) => {
        try {
            await deleteGlobalServiceEndpointsApi({
                serviceKey: globalServiceEndpoints.service_key,
            })
            const isLastRowInPage = globalServiceEndpointsList.length === 1
            if (isLastRowInPage) {
                globalServiceEndpointsListState.setPage(1)
            }
            await getGlobalEndpoints({
                page: isLastRowInPage ? 1 : globalServiceEndpointsListState.page,
                perPage: 20,
                orderBy: globalServiceEndpointsListState.orderBy,
                order: globalServiceEndpointsListState.order,
                serviceKey: globalServiceEndpointsListState.serviceKey,
                type: globalServiceEndpointsListState.type,
            })
        } catch (error) {
        }
    }

    const onDeleteServiceEndpoint = async (
        globalServiceEndpoint: {
            serviceKey: string
            endpoint: string
        }
    ) => {
        try {
            await deleteGlobalServiceEndpointApi({
                serviceKey: globalServiceEndpoint.serviceKey,
                endpoint: globalServiceEndpoint.endpoint
            })
            await getGlobalEndpoints({
                page: globalServiceEndpointsList.length === 1 ? 1 : globalServiceEndpointsListState.page,
                perPage: 20,
                orderBy: globalServiceEndpointsListState.orderBy,
                order: globalServiceEndpointsListState.order,
                serviceKey: globalServiceEndpointsListState.serviceKey,
                type: globalServiceEndpointsListState.type,
            })
        } catch (error) {
        }
    }

    return (
        <>
            {isLoading && <Spinner variant={'overlay'}/>}

            <Stack
                gap={1}
            >
                <GlobalServiceEndpointsListSidebar
                    globalServiceEndpointsListState={globalServiceEndpointsListState}
                    getGlobalEndpoints={getGlobalEndpoints}
                />

                <GlobalServiceEndpointsListView
                    isLoading={isLoading}
                    globalServiceEndpointsListState={globalServiceEndpointsListState}
                    globalServiceEndpointsList={globalServiceEndpointsList}
                    totalPage={totalPage}
                    onChangeSort={onChangeSort}
                    onChangePage={onChangePage}
                    onDeleteServiceEndpoints={onDeleteServiceEndpoints}
                    onDeleteServiceEndpoint={onDeleteServiceEndpoint}
                />
            </Stack>
        </>
    );
};

export default GlobalServiceEndpointsList;

