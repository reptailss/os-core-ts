import React, {ReactNode} from 'react'
import {TableRow} from '@mui/material'
import sx from './sx'


const RowTableView = ({children}: {
    children: ReactNode
}) => {
    return (
        <TableRow
            sx={sx.row}
        >
            {children}
        </TableRow>
    )
}

export default RowTableView
