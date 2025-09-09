import React from 'react';
import {ImageGeneratorType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {OnDeleteBtnClickImageGenerationType, OnReadBtnClickImageGenerationType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types/events";
import Grid2 from "@mui/material/Grid2";

interface Props {
    imageGeneratorType: ImageGeneratorType,
    onReadBtnClick: OnReadBtnClickImageGenerationType
    onDeleteBtnClick: OnDeleteBtnClickImageGenerationType
}

const ImageGeneratorTypesItem = ({
                                     imageGeneratorType,
                                     onReadBtnClick,
                                     onDeleteBtnClick,
                                 }: Props) => {
    const handleReadBtnClick = () => {
        onReadBtnClick(imageGeneratorType);
    }

    const handleDeleteBtnClick = () => {
        onDeleteBtnClick(imageGeneratorType);
    }

    return (
        <Grid2
            size={{
                xs: 12,
                lg: 4
            }}
        >
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {imageGeneratorType.key}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleDeleteBtnClick}
                        endIcon={<DeleteIcon/>}
                    >
                        Видалити
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleReadBtnClick}
                        endIcon={<EditIcon/>}
                        variant={'contained'}
                    >
                        Редагувати
                    </Button>
                </CardActions>
            </Card>
        </Grid2>
    );
};

export default ImageGeneratorTypesItem;