import { LocalizationText, SearchToggleOption } from 'sonolus-core'

export type SearchToggleOptionInfo = {
    name: LocalizationText
    type: 'toggle'
    def: boolean
}

export const parseToggleQuery = (value: unknown, option: SearchToggleOptionInfo): boolean => {
    if (typeof value !== 'string') return option.def

    return value !== '0'
}

export const toSearchToggleOption = (
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchToggleOptionInfo,
): SearchToggleOption => ({
    query,
    name: localize(info.name),
    type: 'toggle',
    def: info.def ? 1 : 0,
})
