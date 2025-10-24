import React from 'react'
import {DockBlockJson} from '@docJson/types'
import DocBlockView from './DocBlockView'


const DockBlockListView = ({blocks}: {
                               blocks: DockBlockJson[]
                           },
) => {
    return (
        <>
            {blocks.map((block, index) => {
                return (
                    <DocBlockView
                        block={block}
                        key={index}
                    />
                )
            })}
        
        </>
    )
}

export default DockBlockListView
