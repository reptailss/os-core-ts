import {DocsModule} from '@docModule/impl/DocsModule'
import {UserInfoDocPage} from '@appDocs/modules/userInfo/pages/UserInfoDocPage'

export const userInfoDocModule = new DocsModule({
    userInfo: new UserInfoDocPage()
}).setTitle('User Info')

 