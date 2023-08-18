import { LocalizationText, Search } from 'sonolus-core'
import { SearchOptionInfo, toSearchOption } from './option/info'

export type SearchInfo = {
    options: Record<string, SearchOptionInfo>
}

export const toSearch = (
    localize: (text: LocalizationText) => string,
    info: SearchInfo,
): Search => ({
    options: Object.entries(info.options).map(([query, option]) =>
        toSearchOption(localize, query, option),
    ),
})
