import React from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import Grid2 from "@mui/material/Grid2";
import {
    OnReadBtnClickMobAppNotificationSettings
} from "@packages/mobAppSettings/containers/notificationSettings/types/events";


interface Props {
    mobAppKey: string,
    onReadBtnClick: OnReadBtnClickMobAppNotificationSettings
}

const MobAppNotificationSettingsItem = ({
                                            mobAppKey,
                                            onReadBtnClick,
                                        }: Props) => {
    const handleReadBtnClick = () => {
        onReadBtnClick(mobAppKey);
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
                            {mobAppKey}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
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

export default MobAppNotificationSettingsItem;