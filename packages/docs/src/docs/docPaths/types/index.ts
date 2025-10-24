


type DocsPagePaths<Sections extends string> = {
    path: string
    blocks: Record<Sections, string>
}

export type PathsDocsModules = {
    appConfig: DocsPagePaths<
        'osCoreAppConfig'
       
    >,
  
}

export type SectionKeyDocModule<Module extends keyof PathsDocsModules> = keyof PathsDocsModules[Module]['blocks']

export const PATHS_DOCS_MODULES: PathsDocsModules = {
    appConfig: {
        path: 'appConfig',
        blocks: {
            osCoreAppConfig: 'osCoreAppConfig'
        }
    },
   
};