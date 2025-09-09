
export interface CustomData {
    sections: SectionCustomInfo[]
}

export interface SectionCustomInfo {
    label?: string,
    blocks: BlockCustomInfo[],

}


export type BlockCustomInfo =
    DividerBlockCustomInfo |
    JsonBlockCustomInfo |
    CardsBlockCustomInfo


export type DividerBlockCustomInfo = {
    type: 'divider'
    label: string,
}


export type JsonBlockCustomInfo = {
    type: 'json'
    label?: string,
    json:object
}

export type CardsBlockCustomInfo = {
    type: 'cards'
    cards: CardBlockCustomInfo[]
}

export type CardBlockCustomInfo = {
    type: 'card'
    title?: string
    subtitle?: string
    description?: string
    chipColor?: 'green' | 'red' | 'gray',
    chip?: string,
}
