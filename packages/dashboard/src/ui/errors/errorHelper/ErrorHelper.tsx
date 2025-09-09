import {FormHelperText} from '@mui/material';
import React, {ReactNode} from 'react';
import {SxStyle} from "@baseTypes/sx";



interface IProps {
    children: ReactNode,
    sx?:SxStyle
}

const ErrorHelper = ({children,sx}: IProps) => {

    return (
        <FormHelperText
            error
            sx={sx}
        >
            {children}
        </FormHelperText>
    );
};

export default ErrorHelper;
