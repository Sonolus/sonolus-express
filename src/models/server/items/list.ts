import { LocalizationText, ServerItemList } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base.js'
import { Localize } from '../../../utils/localization.js'
import { ToItem, toItems } from '../../items/item.js'
import { PickForms, ServerFormsModel, toServerForms } from '../../server/forms/form.js'
import { RawServerFormValue, serializeRawServerFormsValue } from '../forms/value.js'

export type ServerItemListModel<TItemModel, TSearches extends ServerFormsModel> = {
    title?: LocalizationText
    pageCount: number
    cursor?: string
    items: TItemModel[]
    searches?: PickForms<TSearches>
    quickSearchValue?: {
        [K in keyof TSearches]: RawServerFormValue<K & string, TSearches[K]>
    }[keyof TSearches]
}

export const toServerItemList = <TItemModel, TSearches extends ServerFormsModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    list: ServerItemListModel<TItemModel, TSearches>,
    searches: TSearches,
): ServerItemList<TItem> => ({
    title: list.title && localize(list.title),
    pageCount: list.pageCount,
    cursor: list.cursor,
    items: toItems(sonolus, localize, toItem, list.items),
    searches: list.searches && toServerForms(localize, list.searches, searches),
    quickSearchValues:
        list.quickSearchValue && serializeRawServerFormsValue(list.quickSearchValue, searches),
})
