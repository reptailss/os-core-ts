import React from 'react'
import {TextDocBlockJson} from '@docJson/types'
import TextBlockView from '@docsList/view/TextBlockView'

const TextsBlockView = ({
                            texts,
                        }: {
    texts: TextDocBlockJson[]
}) => {
    
    return (
        <span>
           {texts.map((text, i) => {
               return (
                   <TextBlockView
                       block={text}
                       key={i}
                   />
               )
           })}
       </span>
    )
    
    
}

export default TextsBlockView
