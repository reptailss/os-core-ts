import {createTheme, ThemeProvider} from '@mui/material';
import React, {ReactNode} from 'react';

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

interface Props {
    children: ReactNode
}

const AppTheme = ({children}: Props) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
