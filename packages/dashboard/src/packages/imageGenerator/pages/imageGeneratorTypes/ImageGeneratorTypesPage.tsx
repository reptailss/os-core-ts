import React from 'react';
import ImageGeneratorTypes from "@packages/imageGenerator/containers/imageGeneratorTypes/ImageGeneratorTypes";
import Box from '@mui/material/Box';
import {sx} from './sx'

const ImageGeneratorTypesPage = () => {
    return (
        <Box
            sx={sx.root}
        >
            <ImageGeneratorTypes/>
        </Box>
    );
};

export default ImageGeneratorTypesPage;