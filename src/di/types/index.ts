
export type DiLifetime = 'singleton' | 'transient'
export type DiToken<T = any> = string | symbol | (new (...args: any[]) => T)
export type DiFactory<T = any> = () => T
export type DiProviderRecord =  {
    target: any
    lifetime: DiLifetime
    instance?: any
    useClass?: any
    useValue?: any
    useFactory?: DiFactory
}