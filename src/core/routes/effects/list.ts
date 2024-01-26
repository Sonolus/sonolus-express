import { DatabaseEffectItem } from 'sonolus-core'
import { toEffectItem } from '../../../api/effect-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultEffectListHandler: DefaultItemListHandler<DatabaseEffectItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.effects, filterEffectItemsByKeywords, query, page)

export const filterEffectItemsByKeywords: FilterItemsByKeyword<DatabaseEffectItem> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const effectListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.effects, toEffectItem, session, req, res)
