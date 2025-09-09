import {AppModule} from '@appModule'
import {SwaggerController} from '@swagger/core'


export const swaggerAppModule = new AppModule({
    controllers: [
        SwaggerController,
    ],
})