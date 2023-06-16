import { Database, InfoList, ItemList, LocalizationText } from 'sonolus-core'
import { SearchInfo, toSearch } from '.'
import { ToItem } from './item'

export const toList = <T, U>(
    db: Database,
    localize: (text: LocalizationText) => string,
    list: InfoList<T>,
    toItem: ToItem<T, U>,
    search: SearchInfo,
): ItemList<U> => ({
    pageCount: list.pageCount,
    items: list.infos.map((info) => toItem(db, localize, info)),
    search: toSearch(localize, search),
})
