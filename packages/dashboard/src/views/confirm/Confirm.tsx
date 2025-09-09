import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

import {useViewContext} from "@viewContext/hooks/useViewContext";

const Confirm = () => {

    const {confirm, setConfirm} = useViewContext()
    const {
        open,
        message,
        callback,
        cancelCallback,
        title
    } = confirm;


    const handleClose = () => {
        if (typeof cancelCallback === 'function') {
            cancelCallback()
        }
        setConfirm({
            open: false,
            message: '',
            title: '',
            callback: () => {
            },
            cancelCallback: null
        })
    };
    const onAgree = async () => {
        try {
            await callback();
        } catch (e) {
            throw e;
        } finally {
            setConfirm({
                open: false,
                message: '',
                title: '',
                callback: () => {
                },
                cancelCallback: null
            })
        }
    };

    if (!open) {
        return
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {title || 'Підтвердіть дію'}
            </DialogTitle>

            <DialogContent>
                <DialogContent>
                    <Typography>
                        {message}
                    </Typography>
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Відмінити</Button>

                <Button variant={'contained'} onClick={onAgree} autoFocus>
                    Підтвердити
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;