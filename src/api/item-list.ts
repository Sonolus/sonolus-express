import { ItemList } from '@sonolus/core'
import { SonolusBase } from '../core/sonolus'
import { ServerFormsModel, toServerForms } from './form/form'
import { ToItem, toItems } from './item'
import { Localize } from './localization'

export type ItemListModel<T> = {
    pageCount: number
    items: T[]
}

export const toItemList = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    list: ItemListModel<T>,
    searches: ServerFormsModel,
): ItemList<U> => ({
    pageCount: list.pageCount,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: toServerForms(localize, searches),
})
