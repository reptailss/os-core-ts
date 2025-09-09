import React, {useEffect} from 'react';
import {Stack, TextField} from "@mui/material";
import {sx} from './sx'
import Button from "@mui/material/Button";
import {GlobalServiceEndpointsListState} from "@packages/access/containers/globalServiceEndpoints/list/types/state";
import {GetGlobalEndpoints} from "@packages/access/containers/globalServiceEndpoints/types/events";
import SelectTypeGlobalServiceEndpoints
    from "@packages/access/containers/globalServiceEndpoints/select/selectTypeGlobalServiceEndpoints/SelectTypeGlobalServiceEndpoints";

interface Props {
    globalServiceEndpointsListState: GlobalServiceEndpointsListState
    getGlobalEndpoints: GetGlobalEndpoints
}

const GlobalServiceEndpointsListSidebar = ({
                                               globalServiceEndpointsListState,
                                               getGlobalEndpoints,
                                           }: Props) => {


    const onFetchRequests = async () => {
        await getGlobalEndpoints({
            page: globalServiceEndpointsListState.page,
            perPage: 20,
            orderBy: globalServiceEndpointsListState.orderBy,
            order: globalServiceEndpointsListState.order,
            serviceKey: globalServiceEndpointsListState.serviceKey,
            type: globalServiceEndpointsListState.type,
        })
    }

    function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
        cb(value)
        globalServiceEndpointsListState.setPage(1)
    }

    useEffect(() => {
        onFetchRequests()
    }, [])

    return (
        <Stack
            direction={'row'}
            gap={2}
            sx={sx.root}
        >
            <TextField
                size={'small'}
                fullWidth
                value={globalServiceEndpointsListState.serviceKey}
                onChange={(event) => onChangeWithResetPage(event.target.value, globalServiceEndpointsListState.setServiceKey)}
                label={'Ключ сервісу'}
                sx={sx.input}
            />

            <SelectTypeGlobalServiceEndpoints
                value={globalServiceEndpointsListState.type}
                onChange={(value) => onChangeWithResetPage(value, globalServiceEndpointsListState.setType)}
            />

            <Button
                onClick={onFetchRequests}
                variant={'contained'}
                sx={sx.btn}
            >
                Пошук
            </Button>
        </Stack>
    );
};

export default GlobalServiceEndpointsListSidebar;

