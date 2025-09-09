import {AppModule} from '@appModule'
import {DashboardController} from '@dashboard/core'


export const dashboardAppModule  = new AppModule({
    controllers:[
        DashboardController
    ]
})