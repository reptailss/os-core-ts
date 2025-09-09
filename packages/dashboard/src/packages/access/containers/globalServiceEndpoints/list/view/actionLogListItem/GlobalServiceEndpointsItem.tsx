import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {SxStyle} from "@baseTypes/sx";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";


const sx: SxStyle = {
    date: {
        whiteSpace: 'nowrap',
        position: 'sticky',
        left: '0',
        backgroundColor: '#121212',
        width: '170px',
    },
    service: {
        position: 'sticky',
        left: '170px',
        backgroundColor: '#121212',
    },
    endpoint: {
        whiteSpace: 'nowrap'
    }
}

interface Props {
    onClick: (globalServiceEndpoint: GlobalServiceEndpoints) => void,
    globalServiceEndpoints: GlobalServiceEndpoints
    onDeleteServiceEndpoints: (globalServiceEndpoints: GlobalServiceEndpoints) => Promise<void>
    onDeleteServiceEndpoint: (globalServiceEndpoint: {
        serviceKey: string
        endpoint: string
    }) => Promise<void>
}

const GlobalServiceEndpointsItem = ({
                                        globalServiceEndpoints,
                                        onDeleteServiceEndpoints,
                                        onClick,
                                        onDeleteServiceEndpoint,
                                    }: Props) => {

    const handleDeleteServiceEndpoints = async () => {
        await onDeleteServiceEndpoints(globalServiceEndpoints)
    }

    const handleDeleteServiceEndpoint = async (endpoint: string) => {
        await onDeleteServiceEndpoint({
            serviceKey: globalServiceEndpoints.service_key,
            endpoint
        })
    }
    return (
        <TableRow
            hover
            tabIndex={-1}
        >
            <TableCell
                sx={sx.date}
            >
                <IconButton
                    onClick={() => onClick(globalServiceEndpoints)}
                >
                    <InfoIcon/>
                </IconButton>

                <IconButton
                    onClick={handleDeleteServiceEndpoints}
                >
                    <DeleteIcon/>
                </IconButton>

                {globalServiceEndpoints?.service_key}
            </TableCell>

            <TableCell
                sx={sx.date}
            >
                {globalServiceEndpoints?.type}
            </TableCell>


            <TableCell
                align={'right'}
            >
                <Stack
                    gap={'5px'}
                    direction={'row'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                >
                    {globalServiceEndpoints?.endpoints?.map((endpoint) => {
                        return (
                            <Chip
                                key={endpoint.key}
                                label={endpoint.key}
                                size={'small'}
                                onDelete={() => handleDeleteServiceEndpoint(endpoint.key)}
                            />
                        )
                    })}
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default GlobalServiceEndpointsItem;