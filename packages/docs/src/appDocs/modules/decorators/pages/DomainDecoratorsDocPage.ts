import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiDecoratorsDocModule} from '@appDocs/modules/decorators/apiDecoratorsDocModule'
import {apiServicesDocModule} from '@appDocs/modules/apiServices'
import {domainDocModule} from '@appDocs/modules/domain'

type BlockNames = [
    'DomainDec',
    'LegalEntityIdByDomainDec',
]

export class DomainDecoratorsDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.setNavTitle('domain decorators')
        this.appendBlock(
            new CodeBlock('DomainDec', 'decorators/domainDecExample.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('DomainDec')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Декоратор для методу контролера. Повертає домен(string) з request.  Працює в парі з декораторами')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), 'api method decorators')
                        .appendText('(без них не буде працювати). Для роботи використовує')
                        .appendLink(domainDocModule.getPageBlockPath('domain', 'DomainHelper'), 'DomainHelper.getDomainFromReq')
                )
        )
        this.appendBlock(
            new CodeBlock('LegalEntityIdByDomainDec', 'decorators/legalEntityIdByDomainDec.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('legalEntityIdByDomainDec')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Декоратор для методу контролера. Повертає ід юр особи(number). Працює в парі з декораторами')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), 'api method decorators')
                        .appendText('(без них не буде працювати). Для роботи використовує: для отримання домену')
                        .appendLink(domainDocModule.getPageBlockPath('domain', 'DomainHelper'), 'DomainHelper.getDomainFromReq')
                        .appendText('та для отримання ід юр особи по цьому домену')
                        .appendLink(apiServicesDocModule.getPageBlockPath('legalEntityApiService', 'OsCoreLegalEntityService'), 'OsCoreLegalEntityService.getIdByDomain')
                )
        )
        
    }
}

