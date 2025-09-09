import React, {useState} from 'react';
import {
    useGetImageGeneratorTypes
} from "@packages/imageGenerator/containers/imageGeneratorTypes/hooks/UseGetImageGeneratorTypes";
import ImageGeneratorTypesList
    from "@packages/imageGenerator/containers/imageGeneratorTypes/list/ImageGeneratorTypesList";
import Stack from '@mui/material/Stack';
import {
    OnDeleteBtnClickImageGenerationType,
    OnReadBtnClickImageGenerationType,
    OnSaveImageGenerationType
} from "@packages/imageGenerator/containers/imageGeneratorTypes/types/events";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Spinner from '@ui/spinner/Spinner';
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import MutateImageGeneratorTypeModal
    from "@packages/imageGenerator/containers/imageGeneratorTypes/mutateImageGeneratorType/MutateImageGeneratorTypeModal";
import {ImageGeneratorType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import Button from '@mui/material/Button';
import {
    addImageGeneratorTypes,
    deleteImageGeneratorTypes,
    updateImageGeneratorTypes
} from "@packages/imageGenerator/containers/imageGeneratorTypes/api/imageGeneratorTypes";
import {useShowError} from "@hooks/useShowError";

const ImageGeneratorTypes = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [targetImageGeneratorType, setTargetImageGeneratorType] = useState<ImageGeneratorType | null>(null)

    const {
        imageGeneratorTypes,
        fetchTypes,
        isLoading
    } = useGetImageGeneratorTypes()

    const {onShowError} = useShowError()

    const onReadBtnClick: OnReadBtnClickImageGenerationType = async (imageGeneratorType) => {
        setTargetImageGeneratorType(imageGeneratorType)
        setOpenModal(true)
    }
    const onDeleteBtnClick: OnDeleteBtnClickImageGenerationType = async (imageGeneratorType) => {
       try{
           await deleteImageGeneratorTypes({
               id: imageGeneratorType.id
           })
           await fetchTypes()
       }catch (error){
           onShowError(error)
       }
    }

    const onSave: OnSaveImageGenerationType = async (body) => {
        try {
            if ('id' in body) {
                await updateImageGeneratorTypes(body)
            } else {
                await addImageGeneratorTypes(body)
            }
            setOpenModal(false)

            await fetchTypes()
        } catch (error) {
            onShowError(error)
        }
    }

    const onAdd = () => {
        setTargetImageGeneratorType(null)
        setOpenModal(true)
    }
    return (
        <Stack
            gap={1}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            <MutateImageGeneratorTypeModal
                onSave={onSave}
                targetImageGeneratorType={targetImageGeneratorType}
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
                    onClick={fetchTypes}
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

            {!imageGeneratorTypes?.length && !isLoading && <NotFoundMessage/>}

            <ImageGeneratorTypesList
                imageGeneratorTypes={imageGeneratorTypes}
                onReadBtnClick={onReadBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
            />
        </Stack>
    );
};

export default ImageGeneratorTypes;