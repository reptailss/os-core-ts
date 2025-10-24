import {DocsModule} from '@docModule/impl/DocsModule'
import {CronDocPage} from '@appDocs/modules/cron/pages/CronDocPage'


export const cronDocModule = new DocsModule({
    cron: new CronDocPage()
}).setTitle('Cron')
