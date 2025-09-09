import React from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid2 from "@mui/material/Grid2";
import {StructurePluginType} from "@packages/access/containers/structurePluginTypes/types";
import {
    OnDeleteBtnClickStructurePluginType,
    OnReadBtnClickStructurePluginType
} from "@packages/access/containers/structurePluginTypes/types/events";
import Divider from '@mui/material/Divider';


interface Props {
    structurePluginType: StructurePluginType,
    onReadBtnClick: OnReadBtnClickStructurePluginType
    onDeleteBtnClick: OnDeleteBtnClickStructurePluginType
}

const StructurePluginTypeItem = ({
                                     structurePluginType,
                                     onReadBtnClick,
                                     onDeleteBtnClick,
                                 }: Props) => {
    const handleReadBtnClick = () => {
        onReadBtnClick(structurePluginType);
    }

    const handleDeleteBtnClick = () => {
        onDeleteBtnClick(structurePluginType);
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
                            {structurePluginType.key}
                        </Typography>

                        <Divider/>

                        <Typography
                            sx={{
                                margin: '10px 0'
                            }}
                            variant="body2"
                        >
                            Активний: {structurePluginType.active ? 'Так' : 'Ні'}
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                        >
                            ID Юр особи: {structurePluginType.legal_entity_id}
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

export default StructurePluginTypeItem;