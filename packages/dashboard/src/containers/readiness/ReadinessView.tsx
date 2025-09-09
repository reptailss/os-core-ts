import React from 'react';
import Spinner from "@ui/spinner/Spinner";
import Box from '@mui/material/Box';
import {sx} from './sx'
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import JsonViewerCustom from "@ui/jsonViewer/JsonViewerCustom";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {Divider} from '@mui/material';
import {LivenessResult, ReadinessResult} from "@containers/readiness/types";


interface Props {
    isLoading: boolean,
    refetchReadiness?: () => Promise<void>,
    refetchLiveness?: () => Promise<void>,
    readiness: ReadinessResult | null,
    liveness: LivenessResult | null,
}

const ReadinessView = ({
                       readiness,
                       isLoading,
                       refetchReadiness,
                       refetchLiveness,
                       liveness
                   }: Props) => {

    return (
        <Box
            sx={sx.root}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            <Divider>
                Сервіси
                {refetchReadiness && <IconButton
                    sx={sx.btn}
                    onClick={refetchReadiness}
                >
                    <RefreshIcon/>
                </IconButton>}
            </Divider>


            {(!readiness && !isLoading) && <NotFoundMessage/>}

            {readiness && <JsonViewerCustom
                data={readiness}
            />}


            <Divider>
                Сервер

                {refetchLiveness && <IconButton
                    sx={sx.btn}
                    onClick={refetchLiveness}
                >
                    <RefreshIcon/>
                </IconButton>}
            </Divider>


            {(!liveness && !isLoading) && <NotFoundMessage/>}

            {liveness && <JsonViewerCustom
                data={liveness}
            />}

        </Box>
    );
};

export default ReadinessView;
