import {DocsModule} from '@docModule/impl/DocsModule'
import {DynamicRedisDocPage} from '@appDocs/modules/redis/pages/DynamicRedisDocPage'
import {StaticRedisDocPage} from '@appDocs/modules/redis/pages/StaticRedisDocPage'

export const redisDocModule = new DocsModule({
    staticRedis: new StaticRedisDocPage(),
    dynamicRedis: new DynamicRedisDocPage()
}).setTitle('redis')