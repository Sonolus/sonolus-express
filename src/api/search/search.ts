import { Icon, LocalizationText, Search } from 'sonolus-core'
import { Localize } from '../localization'
import { SearchOptionModel, toSearchOption } from './option/option'

export type SearchesModel = Record<string, SearchModel>

export type SearchModel = {
    title: LocalizationText
    icon?: Icon
    options: Record<string, SearchOptionModel>
}

export const toSearches = (localize: Localize, searches: SearchesModel): Search[] =>
    Object.entries(searches).map(([type, search]) => ({
        type,
        title: localize(search.title),
        icon: search.icon,
        options: Object.entries(search.options).map(([query, option]) =>
            toSearchOption(localize, query, option),
        ),
    }))
