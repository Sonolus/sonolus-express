import { LocalizationText } from 'sonolus-core'

export type SearchSelectOptionInfo = {
    name: LocalizationText
    type: 'select'
    def: number
    values: string[]
}
