import {
    Database,
    LocalizationText,
    OptionName,
    SearchOption,
} from 'sonolus-core'

export type SearchOptionInfo =
    | SearchTextOptionInfo
    | SearchSliderOptionInfo
    | SearchToggleOptionInfo
    | SearchSelectOptionInfo

export type SearchTextOptionInfo = {
    query: string
    name: LocalizationText
    type: 'text'
    placeholder: string
}

export type SearchSliderOptionInfo = {
    query: string
    name: LocalizationText
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    display: 'number' | 'percentage'
}

export type SearchToggleOptionInfo = {
    query: string
    name: LocalizationText
    type: 'toggle'
    def: 0 | 1
}

export type SearchSelectOptionInfo = {
    query: string
    name: LocalizationText
    type: 'select'
    def: number
    values: string[]
}

export function toSearchOption(
    db: Database,
    localize: (text: LocalizationText) => string,
    info: SearchOptionInfo
): SearchOption {
    return {
        ...info,
        name: localize(info.name) as OptionName,
    }
}
