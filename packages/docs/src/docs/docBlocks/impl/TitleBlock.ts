import {ITitleBlock} from '@docBlocks/interfaces'
import {DocBlock} from '@docBlocks/impl/DocBlock'


export class TitleBlock<Name extends string> extends DocBlock<Name> implements ITitleBlock<Name> {
    public type = 'title' as const
    
}