import React from 'react';
import {Typography} from "@mui/material";
import {sx} from './sx'

const Logo = () => {
    return (
        <Typography
            sx={sx.root}
            variant={'h5'}
        >
            {'<OneSoft dashboard />'}
        </Typography>
    )
};

export default Logo;
