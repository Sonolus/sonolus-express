import { ServerItemInfo, Srl } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { ServerFormsModel, toServerForms } from '../forms/form'
import { ToItem } from './item'
import { ItemSectionModel, toItemSections } from './section'

export type ItemInfoModel<
    TItemModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = {
    creates?: (keyof NonNullable<TCreates> & string)[]
    searches?: (keyof TSearches & string)[]
    sections: ItemSectionModel<TItemModel>[]
    banner?: Srl
}

export const toItemInfo = <
    TItemModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
    TItem,
>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    info: ItemInfoModel<TItemModel, TCreates, TSearches>,
    creates: TCreates,
    searches: TSearches,
): ServerItemInfo => ({
    creates: creates && info.creates && toServerForms(localize, info.creates, creates),
    searches: info.searches && toServerForms(localize, info.searches, searches),
    sections: toItemSections(sonolus, localize, toItem, info.sections),
    banner: info.banner,
})
