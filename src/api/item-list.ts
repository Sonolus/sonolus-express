import { ItemList } from 'sonolus-core'
import { SonolusBase } from '../core/sonolus'
import { ToItem, toItems } from './item'
import { Localize } from './localization'
import { SearchesModel, toSearches } from './search/search'

export type ItemListModel<T> = {
    pageCount: number
    items: T[]
}

export const toItemList = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    list: ItemListModel<T>,
    searches: SearchesModel,
): ItemList<U> => ({
    pageCount: list.pageCount,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: toSearches(localize, searches),
})
