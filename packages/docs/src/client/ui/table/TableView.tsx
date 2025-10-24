import React from 'react'
import Paper from '@mui/material/Paper'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import sx from './sx'
import RowTableView from '@ui/table/RowTableView'
import ColTableView from '@ui/table/ColTableView'
import TextBlockView from '@docsList/view/TextBlockView'
import {TextDocBlockJson} from '@docJson/types'


function TableView<Row extends Record<string, string | TextDocBlockJson>>({
                                                                              columns,
                                                                              data,
                                                                          }: {
    columns: {
        title: string
        key: keyof Row
    }[]
    data: Row[]
}) {
    
    return (
        <Paper
            sx={sx.root}
        >
            <TableContainer
                sx={sx.container}
            >
                <Table
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => {
                                return (
                                    <TableCell
                                        align={'center'}
                                        key={column.key as string}
                                    >
                                        {column.title}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {data.map((row, index) => (
                            <RowTableView
                                key={index}
                            >
                                {columns.map((column) => {
                                    const value = row[column.key as string]
                                    if (!value) {
                                        return (
                                            <ColTableView
                                                key={column.key as string}
                                            >
                                            </ColTableView>
                                        )
                                    }
                                    return (
                                        <ColTableView
                                            key={column.key as string}
                                        >
                                            {typeof value === 'string' ? <Typography
                                                variant={'body2'}
                                            >
                                                {value}
                                            </Typography> : <TextBlockView
                                                block={value}
                                            />}
                                        </ColTableView>
                                    )
                                })}
                            
                            </RowTableView>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TableView
