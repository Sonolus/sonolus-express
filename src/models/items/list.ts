import { ServerItemList } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { ServerFormsModel, toServerForms } from '../forms/form'
import { ToItem, toItems } from './item'

export type ItemListModel<TItemModel, TSearches extends ServerFormsModel> = {
    pageCount: number
    items: TItemModel[]
    searches?: (keyof TSearches & string)[]
}

export const toItemList = <TItemModel, TSearches extends ServerFormsModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    list: ItemListModel<TItemModel, TSearches>,
    searches: TSearches,
): ServerItemList<TItem> => ({
    pageCount: list.pageCount,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: list.searches && toServerForms(localize, list.searches, searches),
})
