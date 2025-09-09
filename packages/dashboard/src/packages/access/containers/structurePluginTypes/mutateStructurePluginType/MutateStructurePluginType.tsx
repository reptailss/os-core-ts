import React, {useState} from 'react';
import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {OnSaveStructurePluginType} from "@packages/access/containers/structurePluginTypes/types/events";
import {StructurePluginType, StructurePluginTypeService} from "@packages/access/containers/structurePluginTypes/types";
import MutateStructurePluginTypeServices
    from "@packages/access/containers/structurePluginTypes/mutateStructurePluginType/services/MutateStructurePluginTypeServices";
import SwitchCustom from "@ui/switch/SwitchCustom";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Props {
    onSave: OnSaveStructurePluginType
    initial?: StructurePluginType | null
}

const MutateStructurePluginType = ({
                                       onSave,
                                       initial
                                   }: Props) => {

    const [services, setServices] = useState<StructurePluginTypeService[]>(initial?.services || [])
    const [key, setKey] = useState<string>(initial?.key || '')
    const [legalEntityId, setLegalEntityId] = useState<string>(initial?.legal_entity_id?.toString() || '')
    const [active, setActive] = useState<boolean>(typeof initial?.active !== 'undefined' ? Boolean(initial.active) : true)

    const [response, setResponse] = useState<{
        api_key: string
        id: number
    } | null>(null)

    const handleSave = async () => {
        if (initial) {
            await onSave({
                id: initial.id,
                services,
                key,
                active: active ? 1 : 0,
            })
            setResponse(null)
            return
        }
        const res = await onSave({
            services,
            key,
            legal_entity_id: Number(legalEntityId),
            active: active ? 1 : 0,
        })
        setResponse(res?.api_key ? res : null)
    }

    return (
        <Stack
            alignItems={'flex-start'}
            gap={3}
            sx={{
                minHeight: '100%',
                width:'100%'
            }}
            justifyContent={'center'}
        >

            {response && <Stack
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                    width:'100%'
                }}
            >
                <Stack
                    gap={1}
                    direction={'row'}
                    alignItems={'center'}
                >
                    <CheckCircleOutlineIcon/>

                    <Typography>
                        Ви успішно згенерували доступ до плагіну!
                    </Typography>
                </Stack>

                <Stack
                    gap={1}
                    direction={'row'}
                    alignItems={'center'}
                >
                    <Typography>
                        Api token:
                    </Typography>
                    <Typography>
                        {response.api_key}
                    </Typography>
                </Stack>

                <Typography
                    variant={'caption'}
                >
                    (Збережіть ключ, повторно отримати його не можливо)
                </Typography>
            </Stack>}

            {!response && <>
                <TextField
                    size={'small'}
                    fullWidth
                    value={key}
                    onChange={(event) => setKey(event.target.value)}
                    label={'Ключ типу'}

                />

                <TextField
                    size={'small'}
                    fullWidth
                    value={legalEntityId}
                    onChange={(event) => setLegalEntityId(event.target.value)}
                    label={'ID Юр особи'}
                    disabled={!!initial?.id}
                />

                <MutateStructurePluginTypeServices
                    services={services}
                    setServices={setServices}
                />

                <SwitchCustom
                    value={active}
                    onChange={setActive}
                    label={'Активний ключ'}
                />

                <Button
                    onClick={handleSave}
                    variant={'contained'}
                >
                    Зберегти
                </Button>
            </>}
        </Stack>
    );
};

export default MutateStructurePluginType;