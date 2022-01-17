import { Database, LocalizationText, Search } from 'sonolus-core'
import { SearchOptionInfo, toSearchOption } from './option-info'

export type SearchInfo = {
    options: SearchOptionInfo[]
}

export function toSearch(
    db: Database,
    localize: (text: LocalizationText) => string,
    info: SearchInfo
): Search {
    return {
        options: info.options.map((option) =>
            toSearchOption(db, localize, option)
        ),
    }
}
