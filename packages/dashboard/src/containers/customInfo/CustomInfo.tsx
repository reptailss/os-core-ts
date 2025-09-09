import React from 'react';
import {useGetCustomData} from "@containers/customInfo/hooks/useGetCustomData";
import Spinner from "@ui/spinner/Spinner";
import Box from '@mui/material/Box';
import {sx} from "./sx";
import SectionsCustomInfoView from "@containers/customInfo/section/SectionsCustomInfoView";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";


interface Props {
    endpointPath: string
}

const CustomInfo = ({endpointPath}: Props) => {

    const {
        customData,
        isLoading,
        refetch,
    } = useGetCustomData({
        endpointPath
    })

    return (
        <Box
            sx={sx.root}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            <IconButton
                onClick={refetch}
                sx={sx.refetch}
            >
                <RefreshIcon/>
            </IconButton>

            <SectionsCustomInfoView
                sections={customData?.sections || []}
            />
        </Box>
    );
};

export default CustomInfo;
