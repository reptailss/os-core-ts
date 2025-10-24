import {IStepperBlock, IStepBlock} from '@docBlocks/interfaces'
import {DocBlock} from '@docBlocks/impl/DocBlock'


export class StepperBlock<Name extends string> extends DocBlock<Name> implements IStepperBlock<Name> {
    public type = 'stepper' as const
    
    private steeps: IStepBlock[] = []
    
    
    public appendSteep(steep: IStepBlock): this {
        this.steeps.push(steep)
        return this
    }
    
    public getSteeps(): IStepBlock[] {
        return this.steeps
    }
    
    
}