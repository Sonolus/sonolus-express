import { Icon, LocalizationText, ServerOptionsSection } from 'sonolus-core'
import { Localize } from '../localization'
import { ServerOptionModel, toServerOption } from '../option/option'

export type SearchesModel = Record<string, SearchModel>

export type SearchModel = {
    title: LocalizationText
    icon?: Icon
    options: Record<string, ServerOptionModel>
}

export const toSearches = (localize: Localize, searches: SearchesModel): ServerOptionsSection[] =>
    Object.entries(searches).map(([type, search]) => ({
        type,
        title: localize(search.title),
        icon: search.icon,
        options: Object.entries(search.options).map(([query, option]) =>
            toServerOption(localize, query, option),
        ),
    }))
