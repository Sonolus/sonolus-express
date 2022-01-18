import { LocalizationText, Search } from 'sonolus-core'
import { SearchOptionInfo, toSearchOption } from './option/info'

export type SearchInfo = {
    options: {
        [query: string]: SearchOptionInfo
    }
}

export function toSearch(
    localize: (text: LocalizationText) => string,
    info: SearchInfo
): Search {
    return {
        options: Object.entries(info.options).map(([query, option]) =>
            toSearchOption(localize, query, option)
        ),
    }
}
