import {HealthController} from '@health/core'
import {AppModule} from '@appModule'

export const healthAppModule = new AppModule({
    controllers: [
        HealthController,
    ],
})