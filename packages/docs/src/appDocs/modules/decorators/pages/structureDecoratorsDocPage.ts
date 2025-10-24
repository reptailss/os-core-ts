import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiServicesDocModule} from '@appDocs/modules/apiServices'

type BlockNames = [
    'ImportStructureServiceEndpointDec',
]

export class StructureDecoratorsDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.setNavTitle('structure decorators')
        this.appendBlock(
            new CodeBlock('ImportStructureServiceEndpointDec', 'decorators/importStructureServiceEndpointDecExample.tse')
                .setHeaderTitle('Приклад')
                .setNavTitle('import structure decorator')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('ImportStructureServiceEndpointDec')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Декоратор для методу контролера. Імпортує даний ендпоінт в сервіс')
                        .appendLink(apiServicesDocModule.getPageBlockPath('structureApiService', 'structureApiService'), 'structure api service')
                        .appendText('Для подальшої перевірки доступу на цьому ендпоінту')
                )
        )
    }
}

