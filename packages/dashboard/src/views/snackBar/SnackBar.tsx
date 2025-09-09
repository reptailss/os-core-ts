import {Alert, AlertTitle, Portal, Slide, Snackbar as SnackbarMui, Typography} from "@mui/material";
import {sx} from './sx'
import React from "react";
import {useViewContext} from "@viewContext/hooks/useViewContext";


function TransitionLeftSnackbar(props: any) {
    return <Slide {...props} direction="left"/>;
}

const SnackBar = () => {
    const {snackBar, setSnackBar} = useViewContext()

    const {open, message, variant, title} = snackBar;

    const setOpen = (value: boolean) => {
        setSnackBar((prev) => {
            return {
                ...prev,
                open: value
            }
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Portal>
            <SnackbarMui
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                open={open}
                autoHideDuration={5000}
                TransitionComponent={TransitionLeftSnackbar}
                onClose={handleClose}
            >
                <Alert
                    elevation={6} variant="filled"
                    onClose={handleClose}
                    severity={variant || 'success'}
                    sx={sx.alert}>
                    {title && <AlertTitle>
                        <Typography variant={'body1'}>
                            {title}
                        </Typography>
                    </AlertTitle>}
                    <Typography component={'div'} variant={'body1'}>
                        <Typography variant={'body2'}>
                            {message}
                        </Typography>
                    </Typography>
                </Alert>
            </SnackbarMui>
        </Portal>
    );
};

export default SnackBar;