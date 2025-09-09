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
import {BankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types";
import {
    OnDeleteBtnClickBankSyncParsingType,
    OnReadBtnClickBankSyncParsingType
} from "@packages/bankSync/containers/bankParsingTypes/types/events";

interface Props {
    bankSyncParsingType: BankSyncParsingType,
    onReadBtnClick: OnReadBtnClickBankSyncParsingType
    onDeleteBtnClick: OnDeleteBtnClickBankSyncParsingType
}

const BankSyncTypesItem = ({
                               bankSyncParsingType,
                               onReadBtnClick,
                               onDeleteBtnClick,
                           }: Props) => {
    const handleReadBtnClick = () => {
        onReadBtnClick(bankSyncParsingType);
    }

    const handleDeleteBtnClick = () => {
        onDeleteBtnClick(bankSyncParsingType);
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
                            {bankSyncParsingType.key}
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

export default BankSyncTypesItem;