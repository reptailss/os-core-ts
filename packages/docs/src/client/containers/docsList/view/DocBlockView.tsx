import React from 'react'
import {DockBlockJson} from '@docJson/types'
import CodeBlockView from '@docsList/view/CodeBlockView'
import StepperBlockView from '@docsList/view/StepperBlockView'
import TableBlockView from '@docsList/view/TableBlockView'
import TitleBlockView from '@docsList/view/TitleBlockView'


const DocBlockView = ({block}: {
    block: DockBlockJson
}) => {
    switch (block.type) {
        case 'code':
            return (
                <CodeBlockView
                    block={block}
                />
            )
        
        case 'title':
            return (
                <TitleBlockView
                    block={block}
                />
            )
        
        case 'stepper':
            return (
                <StepperBlockView
                    block={block}
                />
            )
        
        case 'table':
            return (
                <TableBlockView
                    block={block}
                />
            )
        
    }
}

export default DocBlockView
