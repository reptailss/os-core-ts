import React from 'react';
import Spinner from "@ui/spinner/Spinner";
import Box from '@mui/material/Box';
import {sx} from './sx'
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import JsonViewerCustom from "@ui/jsonViewer/JsonViewerCustom";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {OsInfo} from "@containers/osInfo/types";


interface Props {
    isLoading?: boolean,
    refetch?: () => Promise<void>,
    osInfo: OsInfo | null,
}

const OsInfoView = ({
                        isLoading,
                        refetch,
                        osInfo,
                    }: Props) => {

    return (
        <Box
            sx={sx.root}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            {refetch && <IconButton
                sx={sx.btn}
                onClick={refetch}
            >
                <RefreshIcon/>
            </IconButton>}

            {(!osInfo && !isLoading) && <NotFoundMessage/>}

            {osInfo && <JsonViewerCustom
                data={osInfo}
            />}
        </Box>
    );
};

export default OsInfoView;
