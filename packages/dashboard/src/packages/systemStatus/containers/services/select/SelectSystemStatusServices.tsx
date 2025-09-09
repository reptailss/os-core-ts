import React, {useMemo} from 'react';
import {useGetSystemStatusServices} from "@packages/systemStatus/containers/services/hooks/useGetSystemStatusServices";
import SelectMultiSearch from "@ui/select/selectMultiSearch/SelectMultiSearch";
import Spinner from '@ui/spinner/Spinner';

interface Props {
    value: string[],
    onChange: (value: string[]) => void,
    width?: string | number
}

const SelectSystemStatusServices = ({
                                        value,
                                        onChange,
                                        width
                                    }: Props) => {

    const {services, isLoading} = useGetSystemStatusServices()

    const dataSelect = useMemo(() => {
        return services?.map((service) => {
            return {
                value: service,
                label: service
            }
        })
    }, [services])
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <SelectMultiSearch
            value={value}
            onChange={onChange}
            data={dataSelect}
            label={'Сервіси'}
            width={width}
        />
    );
};

export default SelectSystemStatusServices;