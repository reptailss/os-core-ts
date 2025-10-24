import {DocsModule} from '@docModule/impl/DocsModule'
import {ActionsLoggerApiServiceDocPage} from '@appDocs/modules/apiServices/pages/ActionsLoggerApiServiceDocPage'
import {AuthApiServiceDocPage} from '@appDocs/modules/apiServices/pages/AuthApiServiceDocPage'
import {PtpClientUsersApiServiceDocPage} from '@appDocs/modules/apiServices/pages/PtpClientUsersApiServiceDocPage'
import {PtpCoreUsersApiServiceDocPage} from '@appDocs/modules/apiServices/pages/PtpCoreUsersApiServiceDocPage'
import {StructureAccessApiServiceDocPage} from '@appDocs/modules/apiServices/pages/StructureAccessApiServiceDocPage'
import {SystemLoggerApiServiceDocPage} from '@appDocs/modules/apiServices/pages/SystemLoggerApiServiceDocPage'
import {LegalEntityApiServiceDocPage} from '@appDocs/modules/apiServices/pages/LegalEntityApiServiceDocPage'
import {StructureApiServiceDocPage} from '@appDocs/modules/apiServices/pages/StructureApiServiceDocPage'

export const apiServicesDocModule = new DocsModule({
    actionsLoggerApiService: new ActionsLoggerApiServiceDocPage(),
    authApiService: new AuthApiServiceDocPage(),
    ptpClientUsersApiService: new PtpClientUsersApiServiceDocPage(),
    ptpCoreUsersApiService: new PtpCoreUsersApiServiceDocPage(),
    structureAccessApiService: new StructureAccessApiServiceDocPage(),
    systemLoggerApiService: new SystemLoggerApiServiceDocPage(),
    legalEntityApiService: new LegalEntityApiServiceDocPage(),
    structureApiService: new StructureApiServiceDocPage(),
}).setTitle('apiServices').setNavTitle('api services')

  