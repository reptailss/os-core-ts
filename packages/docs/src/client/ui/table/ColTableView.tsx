import React, {ReactNode} from 'react'
import {TableCell} from '@mui/material'
import {SxStyle} from '@sx'

const ColTableView = ({
                          children,
                          sx,
                      }: {
                          children: ReactNode
                          sx?: SxStyle
                      },
) => {
    return (
        <TableCell
            component="th"
            scope="row"
            sx={sx}
        >
            {children}
        </TableCell>
    )
}

export default ColTableView
