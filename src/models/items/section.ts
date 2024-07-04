import { Icon, LocalizationText, ServerItemSection } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { ToItem, toItems } from './item'

export type ItemSectionModel<T> = {
    title: LocalizationText
    icon?: Icon
    items: T[]
}

export const toItemSection = <TItemModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    section: ItemSectionModel<TItemModel>,
): ServerItemSection => ({
    title: localize(section.title),
    icon: section.icon,
    itemType: '' as never,
    items: toItems(sonolus, localize, toItem, section.items) as never,
})

export const toItemSections = <TItemModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    sections: ItemSectionModel<TItemModel>[],
): ServerItemSection[] =>
    sections.map((section) => toItemSection(sonolus, localize, toItem, section))
