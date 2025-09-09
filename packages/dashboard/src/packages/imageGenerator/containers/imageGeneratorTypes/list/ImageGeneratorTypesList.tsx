import React from 'react';
import {ImageGeneratorType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import ImageGeneratorTypesItem
    from "@packages/imageGenerator/containers/imageGeneratorTypes/list/ImageGeneratorTypesItem";
import {OnDeleteBtnClickImageGenerationType, OnReadBtnClickImageGenerationType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types/events";
import Grid2 from '@mui/material/Grid2';

interface Props {
    imageGeneratorTypes: ImageGeneratorType[]
    onReadBtnClick: OnReadBtnClickImageGenerationType
    onDeleteBtnClick: OnDeleteBtnClickImageGenerationType
}

const ImageGeneratorTypesList = ({
                                     imageGeneratorTypes,
                                     onReadBtnClick,
                                     onDeleteBtnClick,
                                 }: Props) => {

    const list = imageGeneratorTypes?.length >= 1 && imageGeneratorTypes?.map((imageGeneratorType) => {
        return (
            <ImageGeneratorTypesItem
                imageGeneratorType={imageGeneratorType}
                onReadBtnClick={onReadBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
            />
        )
    })
    return (
        <Grid2
            container
            spacing={2}
        >
            {list}
        </Grid2>
    );
};

export default ImageGeneratorTypesList;