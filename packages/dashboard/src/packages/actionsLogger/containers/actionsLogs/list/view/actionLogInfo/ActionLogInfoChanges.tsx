import React, {useMemo} from 'react';
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";
import TableContainer from '@mui/material/TableContainer';
import TableBody from "@mui/material/TableBody";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';

interface Props {
    targetActionLog: ActionLog | null
}

const getStringValue = (value?: string | number | object) => {
    if (typeof value === 'string') {
        return value
    }
    if (typeof value === 'number') {
        return value.toString()
    }
    if (typeof value === 'undefined') {
        return ''
    }
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value);
        } catch (e) {
            return ''
        }
    }
}
const ActionLogInfoChanges = ({targetActionLog}: Props) => {

    const changes: {
        key: string
        after?: string | number | object
        before?: string | number | object
    } [] = useMemo(() => {
        if (!targetActionLog) {
            return []
        }
        const data: Record<string, {
            key: string
            after?: string | number | object
            before?: string | number | object
        }> = {}
        if (targetActionLog.after) {
            for (const key in targetActionLog.after) {
                if (!(key in data)) {
                    data[key] = {
                        key: key,
                    }
                }
                data[key].after = targetActionLog.after[key]
            }
        }
        if (targetActionLog.before) {
            for (const key in targetActionLog.before) {
                if (!(key in data)) {
                    data[key] = {
                        key: key,
                    }
                }
                data[key].before = targetActionLog.before[key]
            }
        }

        return Object.values(data)

    }, [targetActionLog])

    return (
        <TableContainer>
            <Table
                size={'small'}
                stickyHeader
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Ключ
                        </TableCell>

                        <TableCell>
                            До
                        </TableCell>
                        <TableCell>
                            Після
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {changes?.map((actionLog) => {
                        return (
                            <TableRow
                                key={actionLog.key}
                                hover
                                tabIndex={-1}
                            >
                                <TableCell>
                                    {actionLog.key}
                                </TableCell>
                                <TableCell>
                                    {getStringValue(actionLog.before)}
                                </TableCell>
                                <TableCell>
                                    {getStringValue(actionLog.after)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default ActionLogInfoChanges;