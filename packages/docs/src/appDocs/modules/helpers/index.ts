import {DocsModule} from '@docModule/impl/DocsModule'
import {DateHelperDocPage} from '@appDocs/modules/helpers/pages/DateHelperDocPage'
import {HashHelperDocPage} from '@appDocs/modules/helpers/pages/HashHelperDocPage'
import {RequestHelperDocPage} from '@appDocs/modules/helpers/pages/RequestHelperDocPage'
import {SystemRequestHelperDocPage} from '@appDocs/modules/helpers/pages/SystemRequestHelperDocPage'
import {SlugHelperDocPage} from '@appDocs/modules/helpers/pages/SlugHelperDocPage'
import {SystemEndpointsHelperDocPage} from '@appDocs/modules/helpers/pages/SystemEndpointsHelperDocPage'
import {StringCaseHelperDocPage} from '@appDocs/modules/helpers/pages/StringCaseHelperDocPage'

export const helpersDocModule = new DocsModule({
    dateHelper: new DateHelperDocPage(),
    hashHelper: new HashHelperDocPage(),
    requestHelper: new RequestHelperDocPage(),
    systemRequestHelper: new SystemRequestHelperDocPage(),
    slugHelper: new SlugHelperDocPage(),
    systemEndpoints: new SystemEndpointsHelperDocPage(),
    stringCaseHelper: new StringCaseHelperDocPage(),
}).setTitle('helpers')
