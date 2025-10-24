import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'UserInfo',
    'FullUserInfo',
    'PtpClientUserInfo',
    'PtpCoreUserInfo'
]

export class UserInfoDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        
        this.setNavTitle('User info')
            .appendBlock(
                new CodeBlock('UserInfo', 'auth/UserInfo.tse')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('UserInfo')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Об\'єкт з інформацією про користувача')
                    )
            )
            .appendBlock(
                new CodeBlock('FullUserInfo', 'auth/FullUserInfo.tse')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('FullUserInfo')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Об\'єкт з повною інформацією про користувача')
                    )
            )
            .appendBlock(
                new CodeBlock('PtpClientUserInfo', 'auth/PtpClientUserInfo.tse')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('PtpClientUserInfo')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Об\'єкт з інформацією про користувача ptp client, наслідується від')
                            .appendLink(this.getBlockPath('UserInfo'), 'UserInfo')
                            .appendText('. Та додатково містить в собі поле is_admin яке відповідає за те чи є користувач адміном')
                    )
            )
            .appendBlock(
                new CodeBlock('PtpCoreUserInfo', 'auth/PtpCoreUserInfo.tse')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('PtpCoreUserInfo')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Об\'єкт з інформацією про користувача ptp core, наслідується від')
                            .appendLink(this.getBlockPath('UserInfo'), 'UserInfo')
                            .appendText('. Та додатково містить в собі поле is_admin яке відповідає за те чи є користувач адміном')
                    )
            )
        
    }
}
