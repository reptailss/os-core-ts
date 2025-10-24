import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {redisDocModule} from '@appDocs/modules/redis'
import {envDocModule} from '@appDocs/modules/env'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'DomainService',
    'DomainHelper',
]

export class DomainDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('DomainService', 'domain/DomainService.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('DomainService')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас для роботи з доменом')
                )
                .appendChildren(
                    new StepperBlock('domainServiceMethods')
                        .appendSteep(
                            new StepBlock('getDatabaseNameByDomain')
                                .appendText(new TextBlock()
                                    .appendText('Повертає назву бд по домену з')
                                    .appendLinkFromObject(redisDocModule.getBlockPathAndTitle('dynamicRedis', 'RedisDynamicService'))
                                    .appendText('Ключ для Redis береться з')
                                    .appendLink(envDocModule.getPageBlockPath('env', 'optionalEnvFields'), 'INIT_REDIS_CLIENT_DATABASE_PREFIX')
                                    .appendText(', по дефолту = " "')
                                )
                                .appendChildren(
                                    new CodeBlock('domainServiceExample', 'domain/domainServiceExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                )
        )
        this.appendBlock(
            new CodeBlock('DomainHelper', 'domain/DomainHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('DomainHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас хелпер для роботи з доменом')
                )
                .appendChildren(
                    new StepperBlock('domainHelperMethods')
                        .appendSteep(
                            new StepBlock('getDomainFromReq')
                                .appendText(new TextBlock()
                                    .appendText('Повертає домен з request хедерів по ключу request.headers?.domain || request.headers?.origin || request.headers?.host || request.headers?.referer')
                                )
                        )
                )
        )
    }
}

