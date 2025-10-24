import {IStepBlock} from '@docBlocks/interfaces'
import {DocBlock} from '@docBlocks/impl/DocBlock'


export class StepBlock extends DocBlock<string> implements IStepBlock {
    public type = 'step' as const
    private hasLinkReplacementEnabled: boolean = false
    private shownInNavigation: boolean = false
    
    
    public enableLinkReplacement(): this {
        this.hasLinkReplacementEnabled = true
        return this
    }
    
    public isLinkReplacementEnabled(): boolean {
        return this.hasLinkReplacementEnabled
    }
    
    public showInNavigation(): this {
        this.shownInNavigation = true
        return this
    }
    
    public isShownInNavigation(): boolean {
        return this.shownInNavigation
    }
    
}