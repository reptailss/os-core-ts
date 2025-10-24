import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {IDocPage} from '@docPage/interfaces'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'


type BlockNames = [
    'IModelSql',
    'SqlAssociationsBuilder',
    'SqlAssociation',
    'SqlAssociationRow',

]

export class ModelSqlDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('IModelSql','model/IModelSql.tse')
        )
        this.appendBlock(
            new CodeBlock('SqlAssociationsBuilder','model/SqlAssociationsBuilder.tse')
        
        )
        this.appendBlock(
            new CodeBlock('SqlAssociation','model/SqlAssociation.tse')
        )
        this.appendBlock(
            new CodeBlock('SqlAssociationRow','model/SqlAssociationRow.tse')
        )
       
    }
}

