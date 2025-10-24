import React from 'react'
import TableView from '@ui/table/TableView'
import Box from '@mui/material/Box'
import {TableDocBlockJson} from '@docJson/types'
import DockBlockListView from '@docsList/view/DockBlockListView'
import TextsBlockView from '@docsList/view/TextsBlockView'

const TableBlockView = ({
                            block,
                        }: {
    block: TableDocBlockJson
}) => {
    return (
        <Box
            data-block={block.anchor}
            id={block.anchor}
        >
            {block.texts?.length >= 1 && <TextsBlockView
                texts={block.texts}
            />}
            
            {<TableView
                columns={block.columns as any}
                data={block.data}
            />}
            
            {block?.children && block?.children?.length >= 1 && <DockBlockListView
                blocks={block.children}
            />}
        </Box>
    )
}

export default TableBlockView
