import React from 'react'

import {Box} from '@mui/material'
import CodeView from '@ui/code/CodeView'
import {CodeDocBlockJson} from '@docJson/types'
import DockBlockListView from '@docsList/view/DockBlockListView'
import TextsBlockView from '@docsList/view/TextsBlockView'


const CodeBlockView = ({
                           block,
                       }: {
    block: CodeDocBlockJson
}) => {
    return (
        <Box
            data-block={block.anchor}
            id={block.anchor}
        >
            {block.texts?.length >= 1 && <TextsBlockView
                texts={block.texts}
            />}
            
            <CodeView
                code={block.code}
                fileName={block?.fileName}
                anchor={!block.title ? block.anchor : undefined}
            />
            
            {block?.children && block?.children?.length >= 1 &&
                <DockBlockListView
                    blocks={block.children}
                />}
        </Box>
    )
}

export default CodeBlockView
