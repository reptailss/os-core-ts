import React, {useMemo} from 'react';
import {StructurePluginTypeService} from "@packages/access/containers/structurePluginTypes/types";
import {SetStateFn} from "@baseTypes/state";
import Paper from "@mui/material/Paper";
import {SxStyle} from "@baseTypes/sx";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";
import SelectMultiSearch from "@ui/select/selectMultiSearch/SelectMultiSearch";
import SwitchCustom from "@ui/switch/SwitchCustom";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const sx: SxStyle = {
    root: {
        padding: '10px'
    }
}

interface Props {
    service: StructurePluginTypeService
    setServices: SetStateFn<StructurePluginTypeService[]>
    globalServiceEndpointsList: GlobalServiceEndpoints[]
}

const MutateStructurePluginTypeServicesItem = ({
                                                   service,
                                                   setServices,
                                                   globalServiceEndpointsList,
                                               }: Props) => {


    const dataSelect = useMemo(() => {
        const currentService = globalServiceEndpointsList.find((serviceItem) => {
            return service.service_key === serviceItem.service_key
        })
        if (!currentService) {
            return []
        }
        return currentService.endpoints?.map((endpoint) => {
            return {
                value: endpoint.key,
                label: endpoint.name
            }
        })
    }, [globalServiceEndpointsList, service])

    const handleChange = (value: string[]) => {
        setServices((prev) => {
            return prev.map((serviceItem) => {
                if (serviceItem.service_key === service.service_key) {
                    const endpoints = {}
                    if (value.length) {
                        value.forEach((key) => {
                            endpoints[key] = 1
                        })
                    }
                    return {
                        ...serviceItem,
                        endpoints
                    }
                }
                return serviceItem
            })
        })
    }

    const handleChangeAllAccess = (value: boolean) => {
        setServices((prev) => {
            return prev?.map((serviceItem) => {
                if (serviceItem.service_key === service.service_key) {
                    return {
                        ...serviceItem,
                        has_all_access: value ? 1 : 0
                    }
                }
                return serviceItem
            })
        })
    }

    const handleDelete = () => {
        setServices((prev) => {
            return prev.filter((item) => item.service_key !== service.service_key)
        })
    }

    return (
        <Paper
            elevation={4}
            sx={sx.root}
        >
            <Stack
                gap={1}
            >

                <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                >
                    <IconButton
                        onClick={handleDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Stack>

                <Typography>
                    {service.service_key}
                </Typography>

                <SwitchCustom
                    value={service.has_all_access === 1}
                    onChange={handleChangeAllAccess}
                    label={'Має доступи до всіх ендпоінтів'}
                />

                {service.has_all_access !== 1 && <SelectMultiSearch
                    value={Object.entries(service.endpoints)?.filter(([key, access]) => access === 1)?.map(([key, access]) => key)}
                    data={dataSelect}
                    onChange={handleChange}
                />}
            </Stack>
        </Paper>
    );
};

export default MutateStructurePluginTypeServicesItem;