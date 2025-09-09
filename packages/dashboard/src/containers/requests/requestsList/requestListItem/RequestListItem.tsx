import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {getColorByStatusCode} from "@containers/requests/requestsList/helpers/getColorByStatusCode";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {SxStyle} from "@baseTypes/sx";


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
    onClick: (request: TransformServerMeta) => void,
    request: TransformServerMeta
}

const RequestListItem = ({
                             onClick,
                             request,
                         }: Props) => {
    return (
        <TableRow
            hover
            tabIndex={-1}
        >
            <TableCell
                sx={sx.date}
            >
                <IconButton
                    onClick={() => onClick(request)}
                >
                    <InfoIcon/>
                </IconButton>

                {request.__dateFormat}
            </TableCell>

            <TableCell
                sx={sx.service}
            >
                {request.service_key}
            </TableCell>

            <TableCell align="right" sx={sx.endpoint}>
                {request.route_path}
            </TableCell>

            <TableCell
                sx={{
                    color: getColorByStatusCode(request.response_status_code)
                }}
                align={'right'}
            >
                {request.response_status_code}
            </TableCell>


            <TableCell>
                {request.error ? 'так' : 'ні'}
            </TableCell>

            <TableCell>
                {request.error_code || '---'}
            </TableCell>

            <TableCell>
                {request.is_system ? 'так' : 'ні'}
            </TableCell>

            <TableCell>
                {request.open_user_id || '---'}
            </TableCell>

            <TableCell align="right">
                {request.response_time}
            </TableCell>
        </TableRow>
    );
};

export default RequestListItem;