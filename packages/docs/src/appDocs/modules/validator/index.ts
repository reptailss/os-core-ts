import {DocsModule} from '@docModule/impl/DocsModule'
import {CronDocPage} from '@appDocs/modules/cron/pages/CronDocPage'
import {ValidatorDocPage} from '@appDocs/modules/validator/pages/ValidatorDocPage'


export const validatorDocModule = new DocsModule({
    validator: new ValidatorDocPage()
}).setTitle('validator')
