import { ItemList } from 'sonolus-core'
import { SonolusBase } from '../core/sonolus'
import { ToItem, toItems } from './item'
import { Localize } from './localization'
import { SectionsModel, toSections } from './section/section'

export type ItemListModel<T> = {
    pageCount: number
    items: T[]
}

export const toItemList = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    list: ItemListModel<T>,
    searches: SectionsModel,
): ItemList<U> => ({
    pageCount: list.pageCount,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: toSections(localize, searches),
})
