import React from 'react'
import {Typography} from '@mui/material'
import {TextDocBlockJson} from '@docJson/types'
import sx from './sx'
import {CodeLink} from '@ui/code/custom/CreateElementCode'

const TextBlockView = ({
                           block
                       }: {
    block: TextDocBlockJson
}) => {
    return (
        <Typography
            variant={block.variant || 'body2'}
            component={'span'}
            sx={sx.text}
        >
            {block.texts.map((text, index) => {
                if (text.isLink) {
                    return (
                        <a
                            className={'link'}
                            href={text.link || ''}
                            data-block={text.id}
                            id={text.id || ''}
                            key={index}
                        >
                            {`${text.text} `}
                        </a>
                    )
                }
                if (text.isPrimary) {
                    return (
                        <span
                            className={'primary'}
                            key={index}
                        >
                      {`${text.text} `}
                  </span>
                    )
                }
                
                if (text.isCodeLink) {
                    return (
                        <CodeLink
                            value={text.text}
                        />
                    )
                }
                return (
                    <span
                        key={index}
                    >
                       {`${text.text} `}
                  </span>
                )
            })}
        </Typography>
    )
    
    
}

export default TextBlockView
