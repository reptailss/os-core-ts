import React, {ReactNode, useMemo} from 'react'

import {Box} from '@mui/material'
import StepperView from '@ui/stepper/StepperView'
import {StepperDocBlockJson} from '@docJson/types'
import DockBlockListView from '@docsList/view/DockBlockListView'
import TextsBlockView from '@docsList/view/TextsBlockView'


const StepperBlockView = ({
                              block,
                          }: {
    block: StepperDocBlockJson
}) => {
    const steps: {
        anchor?: string | null
        title: string | ReactNode,
        children?: string | ReactNode
        subtitle: string | ReactNode
    }[] = useMemo(() => {
        return block.steps.map((step) => {
            return {
                anchor: step.anchor,
                title: step.title,
                subtitle: <TextsBlockView texts={step.texts}/>,
                children: <DockBlockListView blocks={step.children}/>
            }
        })
    }, [block])
    
    return (
        <Box
            data-block={block.anchor}
            id={block.anchor}
        >
            {block.texts?.length >= 1 && <TextsBlockView
                texts={block.texts}
            />}
            
            <StepperView
                steps={steps}
                anchor={block.anchor}
            />
            
            {block?.children && block?.children?.length >= 1 &&
                <DockBlockListView
                    blocks={block.children}
                />}
        </Box>
    )
}

export default StepperBlockView
