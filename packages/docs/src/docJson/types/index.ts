export type DocsJson = {
    title: string | null
    modules: DocModuleJson[]
}


export type DocModuleJson = {
    pages: DocPageJson[]
    title: string
    navTitle: string | null
}

export type DocPageJson = {
    blocks: DockBlockJson[]
    path: string
    title: string
    navTitle:string | null
}

export type DockBlockJson =
    TitleDocBlockJson |
    CodeDocBlockJson |
    StepperDocBlockJson |
    TableDocBlockJson

export type TitleDocBlockJson = {
    type: 'title'
    
    id: string
    title: string
    children: DockBlockJson[]
    anchor: string
    navTitle: string | null
    texts: TextDocBlockJson[]
}

export type CodeDocBlockJson = {
    type: 'code'
    
    id: string
    title: string
    children: DockBlockJson[]
    anchor: string
    navTitle: string | null
    texts: TextDocBlockJson[]
    
    code: string
    fileName: string | null
}

export type StepperDocBlockItemJson = {
    type: 'step'
    
    id: string
    title: string
    children: DockBlockJson[]
    anchor: string
    navTitle: string | null
    texts: TextDocBlockJson[]
    showInNavigation:boolean
}
export type StepperDocBlockJson = {
    type: 'stepper'
    
    id: string
    title: string
    children: DockBlockJson[]
    anchor: string
    navTitle: string | null
    texts: TextDocBlockJson[]
    
    steps: StepperDocBlockItemJson[]
}


export type TableDocBlockJson<Row extends Record<string, string | TextDocBlockJson> = any> = {
    type: 'table'
    
    id: string
    title: string
    children: DockBlockJson[]
    anchor: string
    navTitle: string | null
    texts: TextDocBlockJson[]
    
    columns: {
        title: string
        key: keyof Row
    }[],
    data: Row[]
}

export type TextDocBlockJson = {
    type: 'text',
    texts: {
        text: string
        isLink: boolean
        link: string | null
        isPrimary: boolean
        id:string
        isCodeLink:boolean
    }[]
    variant:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'button'
        | 'overline'
}
