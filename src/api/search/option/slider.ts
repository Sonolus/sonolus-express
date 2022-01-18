import { LocalizationText } from 'sonolus-core'

export type SearchSliderOptionInfo = {
    name: LocalizationText
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    display: 'number' | 'percentage'
}
