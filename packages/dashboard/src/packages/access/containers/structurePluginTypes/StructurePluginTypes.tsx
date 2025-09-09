import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Spinner from '@ui/spinner/Spinner';
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import Button from '@mui/material/Button';
import {useShowError} from "@hooks/useShowError";

import StructurePluginTypeList from "@packages/access/containers/structurePluginTypes/list/StructurePluginTypeList";
import {
    addStructurePluginTypes,
    deleteStructurePluginType,
    updateStructurePluginTypes
} from "@packages/access/containers/structurePluginTypes/api/structurePluginTypes";
import {
    OnDeleteBtnClickStructurePluginType,
    OnReadBtnClickStructurePluginType,
    OnSaveStructurePluginType
} from "@packages/access/containers/structurePluginTypes/types/events";
import MutateStructurePluginTypeModal
    from "@packages/access/containers/structurePluginTypes/mutateStructurePluginType/MutateStructurePluginTypeModal";
import {StructurePluginType} from "@packages/access/containers/structurePluginTypes/types";
import {
    useGetStructurePluginTypes
} from "@packages/access/containers/structurePluginTypes/hooks/UseGetStructurePluginTypes";


const StructurePluginTypes = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [targetStructurePluginType, setTargetStructurePluginType] = useState<StructurePluginType | null>(null)

    const {
        structurePluginTypes,
        fetchPluginTypes,
        isLoading
    } = useGetStructurePluginTypes()

    const {onShowError} = useShowError()

    const onReadBtnClick: OnReadBtnClickStructurePluginType = async (structurePluginType) => {
        setTargetStructurePluginType(structurePluginType)
        setOpenModal(true)
    }
    const onDeleteBtnClick: OnDeleteBtnClickStructurePluginType = async (structurePluginType) => {
        try {
            await deleteStructurePluginType({
                id: structurePluginType.id
            })
            await fetchPluginTypes()
        } catch (error) {
            onShowError(error)
        }
    }

    const onSave: OnSaveStructurePluginType = async (body) => {
        try {
            if ('id' in body) {
                await updateStructurePluginTypes(body)
                setOpenModal(false)
                await fetchPluginTypes()
                return null
            } else {
                const res = await addStructurePluginTypes(body)
                await fetchPluginTypes()
                return  res;
            }

        } catch (error) {
            onShowError(error)
            return null
        }
    }

    const onAdd = () => {
        setTargetStructurePluginType(null)
        setOpenModal(true)
    }
    return (
        <Stack
            gap={1}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            <MutateStructurePluginTypeModal
                onSave={onSave}
                targetStructurePluginType={targetStructurePluginType}
                open={openModal}
                setOpen={setOpenModal}
            />

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap={1}
            >
                <IconButton
                    onClick={fetchPluginTypes}
                >
                    <RefreshIcon/>
                </IconButton>

                <Button
                    onClick={onAdd}
                    variant={'outlined'}
                >
                    Додати тип
                </Button>
            </Stack>

            {!structurePluginTypes?.length && !isLoading && <NotFoundMessage/>}

            <StructurePluginTypeList
                structurePluginTypes={structurePluginTypes}
                onReadBtnClick={onReadBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
            />
        </Stack>
    );
};

export default StructurePluginTypes;