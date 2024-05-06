import { EngineItemModel, toEngineItem } from '../../../api/engine-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultEngineListHandler: DefaultItemListHandler<EngineItemModel> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.engines, filterEngineItemsByKeywords, query, page)

export const filterEngineItemsByKeywords: FilterItemsByKeyword<EngineItemModel> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const engineListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.engineConfig, toEngineItem, session, req, res)
