export interface NavigateItem {
    path?: string | null
    title: string
    anchor: string | null
    children?: NavigateItem[]
    initialOpen?:boolean
}
