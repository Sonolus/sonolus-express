import { ServerItemList } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base'
import { Localize } from '../../../utils/localization'
import { ToItem, toItems } from '../../items/item'
import { ServerFormsModel, toServerForms } from '../../server/forms/form'

export type ServerItemListModel<TItemModel, TSearches extends ServerFormsModel> = {
    pageCount: number
    items: TItemModel[]
    searches?: (keyof TSearches & string)[]
}

export const toServerItemList = <TItemModel, TSearches extends ServerFormsModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    list: ServerItemListModel<TItemModel, TSearches>,
    searches: TSearches,
): ServerItemList<TItem> => ({
    pageCount: list.pageCount,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: list.searches && toServerForms(localize, list.searches, searches),
})
