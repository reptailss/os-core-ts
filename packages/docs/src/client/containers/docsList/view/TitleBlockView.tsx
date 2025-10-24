import React from 'react'

import {Box} from '@mui/material'
import {TitleDocBlockJson} from '@docJson/types'
import DockBlockListView from '@docsList/view/DockBlockListView'
import TextsBlockView from '@docsList/view/TextsBlockView'


const TitleBlockView = ({
                            block,
                        }: {
    block: TitleDocBlockJson
}) => {
    return (
        <Box
            data-block={block.anchor}
            id={block.anchor}
        >
            {block.texts?.length >= 1 && <TextsBlockView
                texts={block.texts}
            />}
            
            {block?.children && block?.children?.length >= 1 &&
                <DockBlockListView
                    blocks={block.children}
                />}
        </Box>
    )
}

export default TitleBlockView
