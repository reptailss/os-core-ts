import React from 'react'
import Stack from '@mui/material/Stack'
import {DocPageJson} from '@docJson/types'
import DockBlockListView from '@docsList/view/DockBlockListView'
import sx from './sx'

const DocPageView = ({
                         docPage
                     }: {
                         docPage: DocPageJson
                     }
) => {
    
    return (
        <Stack
            gap={3}
            sx={sx.docPage}
        >
            <DockBlockListView
                blocks={docPage.blocks}
            />
        </Stack>
    )
}

export default DocPageView
