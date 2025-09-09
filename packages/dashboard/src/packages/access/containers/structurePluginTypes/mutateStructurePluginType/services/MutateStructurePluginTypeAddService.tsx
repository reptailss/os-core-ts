import React, {useMemo, useState} from 'react';
import {StructurePluginTypeService} from "@packages/access/containers/structurePluginTypes/types";
import {SetStateFn} from "@baseTypes/state";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";
import Button from "@mui/material/Button";
import {Popover} from "@mui/material";
import SelectSearch from "@ui/select/selectSearch/SelectSearch";
import Stack from "@mui/material/Stack";

interface Props {
    services: StructurePluginTypeService[]
    globalServiceEndpointsList: GlobalServiceEndpoints[]
    setServices: SetStateFn<StructurePluginTypeService[]>
}

const MutateStructurePluginTypeAddService = ({
                                                 services,
                                                 setServices,
                                                 globalServiceEndpointsList,
                                             }: Props) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [service, setService] = useState('')

    const dataSelect = useMemo(() => {
        return globalServiceEndpointsList?.filter((service) => {
            const targetService = services.find((item) => item.service_key === service.service_key)
            return !targetService
        })?.map((service) => {
            return {
                label: service.service_key,
                value: service.service_key,
            }
        })
    }, [services, globalServiceEndpointsList])

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onAdd = () => {
        setServices((prev) => {
            return [
                ...prev,
                {
                    service_key: service,
                    has_all_access: 0,
                    endpoints: {}
                }
            ]
        })
        handleClose()
        setService('')
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                onClick={handleOpen}
                variant={'outlined'}
            >
                Додати сервіс
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack
                    gap={1}
                    sx={{
                        padding: '10px',
                        width: '250px'
                    }}
                >
                    <SelectSearch
                        value={service}
                        onChange={setService}
                        data={dataSelect}
                    />
                    <Button
                        onClick={onAdd}
                        disabled={!service}
                    >
                        Додати
                    </Button>
                </Stack>
            </Popover>
        </>
    );
};

export default MutateStructurePluginTypeAddService;