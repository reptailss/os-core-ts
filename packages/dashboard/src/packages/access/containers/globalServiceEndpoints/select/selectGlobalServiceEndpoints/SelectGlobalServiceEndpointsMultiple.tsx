import React, {useEffect, useMemo} from 'react';
import SelectSearch from "@ui/select/selectSearch/SelectSearch";
import {
    useGetActionsLogsServices
} from "@packages/actionsLogger/containers/actionsLogs/hooks/useGetActionsLogsServices";
import SelectMultiSearch from "@ui/select/selectMultiSearch/SelectMultiSearch";
import {
    useGetGlobalServiceEndpoints
} from "@packages/access/containers/globalServiceEndpoints/hooks/useGetGlobalServiceEndpoints";


interface Props {
    value: string[]
    onChange: (value: string[]) => void
}

const SelectGlobalServiceEndpointsMultiple = ({
                                         value,
                                         onChange,
                                     }: Props) => {

    const {
        globalServiceEndpointsList,
        getGlobalEndpoints
    } = useGetGlobalServiceEndpoints()

    const data = useMemo(() => {
        if (!globalServiceEndpointsList?.length) {
            return []
        }
        return globalServiceEndpointsList.map((service) => {
            return {
                value: service.service_key,
                label: service.service_key
            }
        })
    }, [globalServiceEndpointsList])

    useEffect(() => {
        getGlobalEndpoints({
            page:1,
            perPage:0,
            order:'asc',
            orderBy:'id'
        })
    },[])
    return (
        <SelectMultiSearch
            data={data}
            value={value}
            onChange={onChange}
            label={'Сервіси'}

        />
    );
};

export default SelectGlobalServiceEndpointsMultiple;