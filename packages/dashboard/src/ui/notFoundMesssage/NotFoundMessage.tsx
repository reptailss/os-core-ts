import React from 'react';
import {sx} from "./sx";
import {Typography} from "@mui/material";

const NotFoundMessage = () => {
    return (
        <Typography
            sx={sx.root}
        >
            Нічого не знайдено...
        </Typography>
    );
};

export default NotFoundMessage;
