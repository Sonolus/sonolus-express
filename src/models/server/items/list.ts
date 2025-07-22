import { ServerItemList } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base.js'
import { Localize } from '../../../utils/localization.js'
import { ToItem, toItems } from '../../items/item.js'
import { PickForms, ServerFormsModel, toServerForms } from '../../server/forms/form.js'

export type ServerItemListModel<TItemModel, TSearches extends ServerFormsModel> = {
    pageCount: number
    cursor?: string
    items: TItemModel[]
    searches?: PickForms<TSearches>
}

export const toServerItemList = <TItemModel, TSearches extends ServerFormsModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    list: ServerItemListModel<TItemModel, TSearches>,
    searches: TSearches,
): ServerItemList<TItem> => ({
    pageCount: list.pageCount,
    cursor: list.cursor,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: list.searches && toServerForms(localize, list.searches, searches),
})
