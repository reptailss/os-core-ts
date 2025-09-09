import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {SxStyle} from "@baseTypes/sx";
import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";
import moment from "moment/moment";
import {MOBILE_APP_LOG_CELLS} from "@packages/mobileAppLogs/containers/mobileAppLogs/list/view/constants/cells";


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
    onClick: (mobileAppLog: MobileAppLog) => void,
    mobileAppLog: MobileAppLog
}

const MobileAppLogListItem = ({
                               onClick,
                               mobileAppLog,
                           }: Props) => {
    return (
        <TableRow
            hover
            tabIndex={-1}
        >
            <TableCell
                key={'info'}
                size={'small'}
            >
                <IconButton
                    onClick={() => onClick(mobileAppLog)}
                >
                    <InfoIcon/>
                </IconButton>
            </TableCell>
			{MOBILE_APP_LOG_CELLS.map((cell,index) => {
                
                if(cell.id === 'description'){
                    return (
                        <TableCell
                            size={'small'}
                            key={cell.id}
                        >
                            { mobileAppLog.description && mobileAppLog.description?.length > 25 ? `${mobileAppLog.description?.slice(0,25)}...` : mobileAppLog.description}
                        </TableCell>
                    )
                }
				return (
					<TableCell
						key={cell.id}
                        size={'small'}
					>
						{mobileAppLog[cell.id] as string}
					</TableCell>
				)
			})}
        </TableRow>
    );
};

export default MobileAppLogListItem;