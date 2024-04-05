import { Icon, LocalizationText, ServerOptionsSection } from '@sonolus/core'
import { Localize } from '../localization'
import { ServerOptionModel, toServerOption } from '../option/option'

export type SectionsModel = Record<string, SectionModel>

export type SectionModel = {
    title: LocalizationText
    icon?: Icon
    options: Record<string, ServerOptionModel>
}

export const toSections = (localize: Localize, sections: SectionsModel): ServerOptionsSection[] =>
    Object.entries(sections).map(([type, section]) => ({
        type,
        title: localize(section.title),
        icon: section.icon,
        options: Object.entries(section.options).map(([query, option]) =>
            toServerOption(localize, query, option),
        ),
    }))
