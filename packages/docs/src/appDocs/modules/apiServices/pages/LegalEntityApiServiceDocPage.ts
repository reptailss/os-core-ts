import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {IDocPage} from '@docPage/interfaces'

type BlockNames = [
    'legalEntityApiService',
    'OsCoreLegalEntityService',
]

export class LegalEntityApiServiceDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init(): void {
    }
}



    