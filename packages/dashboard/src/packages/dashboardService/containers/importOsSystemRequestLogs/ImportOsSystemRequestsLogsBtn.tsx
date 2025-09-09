import React, {useState} from 'react';

import {Button, Modal, Paper} from "@mui/material";
import JsonViewerCustom from "@ui/jsonViewer/JsonViewerCustom";
import {SxStyle} from "@baseTypes/sx";
import {
    useImportOsSystemRequestLogs
} from "@packages/dashboardService/containers/importOsSystemRequestLogs/hooks/useImportOsSystemRequestLogs";
import Spinner from "@ui/spinner/Spinner";
import ErrorBlock from "@ui/errors/errorBlock/ErrorBlock";
import Typography from "@mui/material/Typography";


const sx: SxStyle = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: {
            xs: 'flex-end',
            lg: 'center'
        },
        paddingBottom: '10px',
        alignItems: 'center',

    },
    content: {
        width: {
            xs: '300px',
        },
        maxHeight: '94vh',
        minHeight: '400px',
        borderRadius: '8px',
        boxShadow: 24,
        color: '#ffffff',
        overflow: 'auto',
        display: 'flex',
        gap: '15px',
        flexDirection: 'column',
        padding: '10px',
        justifyContent: 'center',
    },
    btn: {
        fontSize: '10px',
        textTransform: 'initial',
        minWith: 'auto',
    }
}
const ImportOsSystemRequestsLogsBtn = () => {

    const [open, setOpen] = useState<boolean>(false);

    const {
        onImport,
        isPending,
        result,
        isError,
        reset,
    } = useImportOsSystemRequestLogs()

    const handleClose = () => {
        setOpen(false)
        reset()
    }
    const handleOpen = () => setOpen(true)

    return (
        <>
            <Button
                onClick={handleOpen}
                disabled={isPending}
                fullWidth
                variant={'outlined'}
                size={'small'}
                sx={sx.btn}
            >
                Імпортувати логи до сервісу OS-SYSTEM
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                sx={sx.root}
            >
                <Paper
                    sx={sx.content}
                >
                    {isPending && <Spinner variant={'overlay'}/>}

                    {!isPending && <>
                        {isError || (result && result?.import_count !== result?.count) && <ErrorBlock
                            variant={'default'}
                            message={'Під час імпорту трапилась помилка...'}
                        />}
                        {result && result.count === 0 && <Typography
                            textAlign={'center'}
                        >
                            Відсутні логи для імпорту
                        </Typography>}
                        {result && result?.import_count >= 1 && !result?.error && <Typography
                            textAlign={'center'}
                        >
                            Ви успішно імпортували дані!
                        </Typography>}

                        {result && <JsonViewerCustom
                            data={result || {}}
                        />}

                        <Button
                            onClick={onImport}
                            disabled={isPending}
                            fullWidth
                            variant={'contained'}
                        >
                            Імпортувати
                        </Button>
                    </>}

                </Paper>
            </Modal>
        </>
    );
};

export default ImportOsSystemRequestsLogsBtn;