import React, {useState} from "react";
import {getInitialPageParamRequestsList} from "@containers/requests/requestsList/helpers/getInitialParams";
import {
    GlobalServiceEndpoints,
    GlobalServiceEndpointsType
} from "@packages/access/containers/globalServiceEndpoints/types";
import {GlobalServiceEndpointsListState} from "@packages/access/containers/globalServiceEndpoints/list/types/state";


export function useGetGlobalServiceEndpointsListState(): GlobalServiceEndpointsListState {

    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof GlobalServiceEndpoints>('date_add');
    const [page, setPage] = React.useState<number>(() => getInitialPageParamRequestsList());
    const [targetGlobalServiceEndpoints, setTargetGlobalServiceEndpoints] = React.useState<GlobalServiceEndpoints | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [serviceKey, setServiceKey] = useState<string>('')
    const [type, setType] = useState<GlobalServiceEndpointsType | ''>('')

    return {
        order,
        setOrder,
        orderBy,
        setOrderBy,
        page,
        setPage,
        targetGlobalServiceEndpoints,
        setTargetGlobalServiceEndpoints,
        openModal,
        setOpenModal,
        serviceKey,
        setServiceKey,
        type,
        setType
    }
}