import {
    DefinitionsSwagger,
    GetSwaggerTSService,
    Swagger,
    SwaggerConfigBuilder,
    SwaggerHelper,
    SwaggerPathsBuilder,
} from '@swagger/core'

import {APP_CONFIG_OS_CORE} from '@appConfig'


export class GetSwaggerService {

    constructor(
        private readonly getSwaggerTSService: GetSwaggerTSService = new GetSwaggerTSService(),
        private readonly swaggerPathsBuilder: SwaggerPathsBuilder = new SwaggerPathsBuilder(),
        private readonly swaggerConfigBuilder: SwaggerConfigBuilder = new SwaggerConfigBuilder(),
    ) {
    }

    public async getSwagger(): Promise<Swagger> {

        const swaggerConfig =  this.swaggerConfigBuilder.getFromBuildFile()

        const {
            host,
            schemes,
            url,
        } = SwaggerHelper.getSwaggerUrlProps()

        const tsSchemas = this.getSwaggerTSService.getFromFile()

        return {
            swagger: '2.0',
            info: {
                title: swaggerConfig?.title || 'Swagger',
                description: swaggerConfig?.description || 'Swagger',
                version: '1.0.0',
            },
            host,
            schemes,
            externalDocs: {
                url,
            },
            paths: this.swaggerPathsBuilder.getPathsByTSSchemas(tsSchemas),
            ...(swaggerConfig?.hasAuth !== false ? SwaggerHelper.buildAuthSwagger() : {}),
            definitions: tsSchemas as DefinitionsSwagger,
            defaultAuthToken: APP_CONFIG_OS_CORE.swagger.defaultAuthToken,
        }
    }


}