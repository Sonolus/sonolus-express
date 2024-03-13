import { DatabaseLevelItem } from 'sonolus-core'
import { toLevelItem } from '../../../api/level-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultLevelListHandler: DefaultItemListHandler<DatabaseLevelItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.levels, filterLevelItemsByKeywords, query, page)

export const filterLevelItemsByKeywords: FilterItemsByKeyword<DatabaseLevelItem> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'rating', 'title', 'artists', 'author', 'tags', 'description'],
        keywords,
    )

export const levelListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.levelConfig, toLevelItem, session, req, res)
