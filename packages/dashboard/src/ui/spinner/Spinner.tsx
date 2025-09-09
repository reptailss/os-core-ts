import React from 'react';
import './styles.css'
import Box from "@mui/material/Box";
import {sx} from './sx'

interface Props {
    variant?: 'overlay'
}

const Spinner = ({variant}: Props) => {

    if (variant === 'overlay') {
        return (
            <Box
                sx={sx.overlay}
            >
                <Box
                    sx={sx.root}
                >
                    <div className={'loader'}></div>
                </Box>
            </Box>
        )
    }
    return (
        <Box
            sx={sx.root}
        >
            <div className={'loader'}></div>
        </Box>
    );
};

export default Spinner;
