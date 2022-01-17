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
    name: LocalizationText
    type: 'text'
    placeholder: string
}

export type SearchSliderOptionInfo = {
    name: LocalizationText
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    display: 'number' | 'percentage'
}

export type SearchToggleOptionInfo = {
    name: LocalizationText
    type: 'toggle'
    def: 0 | 1
}

export type SearchSelectOptionInfo = {
    name: LocalizationText
    type: 'select'
    def: number
    values: string[]
}

export function toSearchOption(
    db: Database,
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchOptionInfo
): SearchOption {
    return {
        ...info,
        query,
        name: localize(info.name) as OptionName,
    }
}
