import React, {useMemo} from 'react';
import SelectSearch from "@ui/select/selectSearch/SelectSearch";
import {
    useGetActionsLogsServices
} from "@packages/actionsLogger/containers/actionsLogs/hooks/useGetActionsLogsServices";


interface Props {
    value: string
    onChange: (value: string) => void
}

const SelectActionsLogsServiceKey = ({
                                         value,
                                         onChange,
                                     }: Props) => {

    const {services} = useGetActionsLogsServices()

    const data = useMemo(() => {
        if (!services?.length) {
            return []
        }
        return services.map((service) => {
            return {
                value: service.service_key,
                label: service.service_key
            }
        })
    }, [services])
    return (
        <SelectSearch
            data={data}
            value={value}
            onChange={onChange}
            label={'Сервіс'}

        />
    );
};

export default SelectActionsLogsServiceKey;