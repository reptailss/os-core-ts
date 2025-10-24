const isProdType = process.env.ENV_TYPE === 'production'
const isDevBuildType = process.env.ENV_TYPE === 'build_development'
const docListPath = isDevBuildType ? '/node-ts-core-docs/doc' : isProdType  ?  '/doc' : '/docs/doc'


export const ROUTE_PATHS = {
    home: isDevBuildType ? '/node-ts-core-docs' : isProdType  ?  '/' : '/docs',
    docsList:docListPath,
    docsListWithKey:`${docListPath}/:key`,
} as const