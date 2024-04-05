import { Icon, ItemSection, LocalizationText } from '@sonolus/core'
import { SonolusBase } from '../core/sonolus'
import { ToItem, toItems } from './item'
import { Localize } from './localization'

export type ItemSectionModel<T> = {
    title: LocalizationText
    icon?: Icon
    items: T[]
}

export const toItemSection = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    section: ItemSectionModel<T>,
): ItemSection<U> => ({
    title: localize(section.title),
    icon: section.icon,
    items: toItems(sonolus, localize, toItem, section.items),
})

export const toItemSections = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    sections: ItemSectionModel<T>[],
): ItemSection<U>[] => sections.map((section) => toItemSection(sonolus, localize, toItem, section))
