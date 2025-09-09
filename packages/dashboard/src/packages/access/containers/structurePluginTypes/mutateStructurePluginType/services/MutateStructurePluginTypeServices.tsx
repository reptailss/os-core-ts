import React, {useEffect} from 'react';
import {StructurePluginTypeService} from "@packages/access/containers/structurePluginTypes/types";
import {SetStateFn} from "@baseTypes/state";
import {
    useGetGlobalServiceEndpoints
} from "@packages/access/containers/globalServiceEndpoints/hooks/useGetGlobalServiceEndpoints";
import MutateStructurePluginTypeServicesItem
    from "@packages/access/containers/structurePluginTypes/mutateStructurePluginType/services/MutateStructurePluginTypeServicesItem";
import Stack from "@mui/material/Stack";
import MutateStructurePluginTypeAddService
    from "@packages/access/containers/structurePluginTypes/mutateStructurePluginType/services/MutateStructurePluginTypeAddService";

interface Props {
    services: StructurePluginTypeService[]
    setServices: SetStateFn<StructurePluginTypeService[]>
}

const MutateStructurePluginTypeServices = ({
                                               services,
                                               setServices,
                                           }: Props) => {

    const {
        globalServiceEndpointsList,
        getGlobalEndpoints
    } = useGetGlobalServiceEndpoints()


    const list = services?.length >= 1 && services.map((service) => {
        return (
            <MutateStructurePluginTypeServicesItem
                service={service}
                setServices={setServices}
                globalServiceEndpointsList={globalServiceEndpointsList}
                key={service.service_key}
            />
        )
    })

    useEffect(() => {
        getGlobalEndpoints({
            page: 1,
            perPage: 0,
            order: 'asc',
            orderBy: 'id'
        })
    }, [])


    return (
        <Stack
            gap={1}
            sx={{
                width:'100%'
            }}
        >
            <Stack
                direction={'row'}
                justifyContent={'flex-end'}
            >
                <MutateStructurePluginTypeAddService
                    services={services}
                    setServices={setServices}
                    globalServiceEndpointsList={globalServiceEndpointsList}
                />
            </Stack>

            {list}
        </Stack>
    );
};

export default MutateStructurePluginTypeServices;