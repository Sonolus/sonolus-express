import { ItemInfo, SRL } from 'sonolus-core'
import { SonolusBase } from '../core/sonolus'
import { ToItem } from './item'
import { ItemSectionModel, toItemSections } from './item-section'
import { Localize } from './localization'
import { SearchesModel, toSearches } from './search/search'

export type ItemInfoModel<T> = {
    sections: ItemSectionModel<T>[]
    banner?: SRL<'ServerBanner'>
}

export const toItemInfo = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    info: ItemInfoModel<T>,
    searches: SearchesModel,
): ItemInfo<U> => ({
    searches: toSearches(localize, searches),
    sections: toItemSections(sonolus, localize, toItem, info.sections),
    banner: info.banner,
})
